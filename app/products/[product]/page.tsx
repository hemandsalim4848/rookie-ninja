import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { connectDB } from '@/src/lib/mongodb'
import { Product } from '@/src/lib/models/Products'
import ProductDetailClient from './ProductDetailClient'

const DESCRIPTION_LIMIT = 155

function stripLabel(line: string): string {
  return line.replace(/^[A-Z][A-Z0-9 /]*:\s*/, '').trim()
}

function factsFrom(product: any): string[] {
  if (product.specs?.length) {
    return product.specs.map((s: any) => s.value).filter(Boolean)
  }
  if (product.shortDescription) {
    return product.shortDescription
      .split('\n')
      .map((l: string) => stripLabel(l.trim()))
      .filter(Boolean)
  }
  return []
}

function buildFactsClause(facts: string[]): string {
  const picked: string[] = []
  let len = 0
  for (const f of facts) {
    const added = picked.length ? f.length + 2 : f.length
    if (len + added > DESCRIPTION_LIMIT - 1) break
    picked.push(f)
    len += added
  }
  return picked.length ? `${picked.join(', ')}.` : ''
}

function firstSentence(text: string): string {
  const clean = text.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
  const match = clean.match(/^.*?[.!?](?=\s|$)/)
  return match ? match[0] : clean
}

function buildMetaDescription(product: any): string {
  const factsClause = buildFactsClause(factsFrom(product))

  if (!product.description) return factsClause || product.name

  const lead = firstSentence(product.description)
  const combined = factsClause ? `${factsClause} ${lead}` : lead

  if (combined.length <= DESCRIPTION_LIMIT) return combined
  return factsClause || lead.slice(0, DESCRIPTION_LIMIT)
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ product: string }>
}): Promise<Metadata> {
  const { product: productSlug } = await params

  await connectDB()
  const product = await Product.findOne({ slug: productSlug }).lean() as any
  if (!product) return {}

  return {
    title: `${product.name} — Rookie Ninja`,
    description: buildMetaDescription(product),
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ product: string }>
}) {
  const { product: productSlug } = await params

  await connectDB()
  const results = await Product.aggregate([
    { $match: { slug: productSlug } },
    {
      $lookup: {
        from: 'brands',
        localField: 'brandSlug',
        foreignField: 'slug',
        as: 'brand',
      },
    },
    { $unwind: { path: '$brand', preserveNullAndEmptyArrays: true } },
  ])
  const product = results[0]

  if (!product) notFound()

  const { brand, ...productFields } = product

  return (
    <ProductDetailClient
      product={JSON.parse(JSON.stringify(productFields))}
      brand={brand ? JSON.parse(JSON.stringify(brand)) : null}
      brandSlug={product.brandSlug}
    />
  )
}

import { NextResponse } from 'next/server'
import { connectDB } from '@/src/lib/mongodb'
import { Product } from '@/src/lib/models/Products'
import specsData from '@/scripts/kodak-alaris-specs.json'

export async function GET() {
  await connectDB()

  const results: { slug: string; status: string }[] = []

  for (const item of specsData) {
    const product = await Product.findOne({ brandSlug: 'kodak-alaris', slug: item.slug })
    if (!product) {
      results.push({ slug: item.slug, status: 'not found' })
      continue
    }
    product.specs = item.specs
    await product.save()
    results.push({ slug: item.slug, status: 'updated' })
  }

  return NextResponse.json({ results })
}

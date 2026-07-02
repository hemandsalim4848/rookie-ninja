import { NextResponse } from 'next/server'
import { connectDB } from '@/src/lib/mongodb'
import { Brand } from '@/src/lib/models/Brands'
import { Product } from '@/src/lib/models/Products'
import scannerData from '@/scripts/scanner-products.json'

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()
}

function stripHtml(html: string) {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim()
}

function parseShortDescription(html: string) {
  if (!html) return ''
  const liMatches = html.match(/<li>(.*?)<\/li>/gi)
  if (liMatches) return liMatches.map(li => li.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').trim()).filter(Boolean).join('\n')
  return stripHtml(html)
}

export async function POST(req: Request) {
  const { secret } = await req.json()
  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await connectDB()

  const results: Record<string, { inserted: number; skipped: number }> = {}

  for (const entry of scannerData as any[]) {
    const { brand: brandName, slug: brandSlug, country, products } = entry

    let brand = await Brand.findOne({ slug: brandSlug })
    if (!brand) {
      brand = await Brand.create({
        name: brandName, slug: brandSlug, logo: '',
        description: `${brandName} products.`, country, featured: false,
      })
    }

    let inserted = 0, skipped = 0
    for (const p of products) {
      const slug = slugify(p.Name)
      const existing = await Product.findOne({ brandSlug, slug })
      const images = p.Images ? p.Images.split(',').map((s: string) => s.trim()).filter(Boolean) : []
      if (existing) {
        await Product.findByIdAndUpdate(existing._id, { images })
        skipped++
        continue
      }
      await Product.create({
        brand: brand._id, brandSlug, name: p.Name, slug,
        sku: p.SKU || '', images,
        description: stripHtml(p.Description || ''),
        shortDescription: parseShortDescription(p['Short description'] || ''),
        category: p.Category || 'Document Scanners',
        tags: [], featured: false, specs: [], downloads: [],
      })
      inserted++
    }
    results[brandName] = { inserted, skipped }
  }

  return NextResponse.json({ success: true, results })
}

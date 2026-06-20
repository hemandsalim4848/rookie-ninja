import { NextResponse } from 'next/server'
import { connectDB } from '@/src/lib/mongodb'
import { Product } from '@/src/lib/models/Products'
import mongoose from 'mongoose'
import products from '@/scripts/viewsonic-products.json'

const Brand = mongoose.models.Brand || mongoose.model('Brand', new mongoose.Schema({ name: String, slug: String }))

export async function GET() {
  await connectDB()

  const brand = await Brand.findOne({ slug: 'viewsonic' })
  if (!brand) return NextResponse.json({ error: 'Viewsonic brand not found' }, { status: 404 })

  const results = []

  for (const p of products) {
    const existing = await Product.findOne({ brandSlug: 'viewsonic', slug: p.slug })
    if (existing) {
      await Product.findByIdAndUpdate(existing._id, { images: p.images })
      results.push({ slug: p.slug, status: 'updated images' })
      continue
    }
    await Product.create({ ...p, brand: brand._id })
    results.push({ slug: p.slug, status: 'created' })
  }

  return NextResponse.json({ total: results.length, results })
}

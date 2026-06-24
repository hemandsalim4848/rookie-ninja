import { NextResponse } from 'next/server'
import { connectDB } from '@/src/lib/mongodb'
import { Product } from '@/src/lib/models/Products'
import mongoose from 'mongoose'
import products from '@/scripts/viewsonic-czur-batch.json'

const Brand = mongoose.models.Brand || mongoose.model('Brand', new mongoose.Schema({ name: String, slug: String }))

export async function GET() {
  await connectDB()
  const results = []

  for (const p of products) {
    const brand = await Brand.findOne({ slug: p.brandSlug })
    if (!brand) { results.push({ slug: p.slug, status: `brand not found: ${p.brandSlug}` }); continue }

    const existing = await Product.findOne({ brandSlug: p.brandSlug, slug: p.slug })
    if (existing) {
      results.push({ slug: p.slug, status: 'already exists' })
      continue
    }

    await Product.create({ ...p, brand: brand._id })
    results.push({ slug: p.slug, status: 'created' })
  }

  return NextResponse.json({ total: results.length, results })
}

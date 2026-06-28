import { NextResponse } from 'next/server'
import { connectDB } from '@/src/lib/mongodb'
import { Product } from '@/src/lib/models/Products'
import mongoose from 'mongoose'

const Brand = mongoose.models.Brand || mongoose.model('Brand', new mongoose.Schema({ name: String, slug: String }))

export async function GET() {
  await connectDB()
  const results: Record<string, unknown>[] = []

  // 1. Create Iris brand if it doesn't exist
  let irisBrand = await Brand.findOne({ slug: 'iris' })
  if (!irisBrand) {
    irisBrand = await Brand.create({ name: 'IRIS', slug: 'iris' })
    results.push({ step: 'brand', status: 'created' })
  } else {
    results.push({ step: 'brand', status: 'already exists' })
  }

  // 2. Reassign the two Readiris products from canon → iris
  const slugs = ['readiris-pdf-elite', 'readiris-pdf-essential']
  for (const slug of slugs) {
    const product = await Product.findOne({ slug, brandSlug: 'canon' })
    if (!product) {
      results.push({ step: slug, status: 'not found under canon' })
      continue
    }
    product.brandSlug = 'iris'
    product.brand = irisBrand._id
    await product.save()
    results.push({ step: slug, status: 'moved to iris' })
  }

  return NextResponse.json({ results })
}

import { NextResponse } from 'next/server'
import { connectDB } from '@/src/lib/mongodb'
import { Product } from '@/src/lib/models/Products'

// Lightweight, cacheable projection for client-side search (Navbar, catalogue
// page). Deliberately separate from /api/products, which the admin panel
// relies on for full read-after-write CRUD - caching that route risked
// showing stale data right after an edit. Nothing admin-facing touches this
// one, so it's safe to cache aggressively.
export async function GET() {
  await connectDB()
  const products = await Product.find({}, 'name slug brandSlug category images')
    .sort({ name: 1 })
    .lean()
  return NextResponse.json(products, {
    headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600' },
  })
}

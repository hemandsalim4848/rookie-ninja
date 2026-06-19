import { NextResponse } from 'next/server'
import { connectDB } from '@/src/lib/mongodb'
import { Product } from '@/src/lib/models/Products'

const slugsToDelete = [
  'kodak-scanmate-i940-scanner',
  'kodak-i5250-scanner',
  'kodak-i5650-scanner',
  'kodak-i5850s-scanner',
]

export async function GET() {
  await connectDB()
  const results = []
  for (const slug of slugsToDelete) {
    const res = await Product.deleteOne({ brandSlug: 'kodak-alaris', slug })
    results.push({ slug, deleted: res.deletedCount > 0 })
  }
  return NextResponse.json({ results })
}

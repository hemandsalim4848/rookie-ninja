import { NextResponse } from 'next/server'
import { connectDB } from '@/src/lib/mongodb'
import { Product } from '@/src/lib/models/Products'

export async function GET() {
  await connectDB()

  const res = await Product.updateMany(
    {
      brandSlug: 'aerocool',
      category: 'Gaming',
      $or: [
        { name: { $regex: /psu|power\s*supply/i } },
        { subcategory: { $regex: /psu|power\s*supply/i } },
      ],
    },
    { $set: { category: 'Power Supply Units' } }
  )

  return NextResponse.json({ success: true, modified: res.modifiedCount })
}

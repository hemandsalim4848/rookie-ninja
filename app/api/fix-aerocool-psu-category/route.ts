import { NextResponse } from 'next/server'
import { connectDB } from '@/src/lib/mongodb'
import { Product } from '@/src/lib/models/Products'

export async function GET() {
  await connectDB()

  const res = await Product.updateMany(
    {
      brand: { $regex: /aerocool/i },
      category: 'Gaming',
      $or: [
        { name: { $regex: /psu|power supply/i } },
        { subcategory: { $regex: /psu|power supply/i } },
      ],
    },
    { $set: { category: 'Power Supply Units' } }
  )

  return NextResponse.json({ success: true, modified: res.modifiedCount })
}

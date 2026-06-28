import { NextResponse } from 'next/server'
import { connectDB } from '@/src/lib/mongodb'
import { Product } from '@/src/lib/models/Products'

export async function GET() {
  await connectDB()

  const shortDescription = [
    '4K Ultra HD camera | 120° wide-angle view',
    '2400 ANSI lumens DLP projector',
    'AI speaker tracking',
    '6-mic 360° audio pickup array',
    'Wireless screen sharing',
    'Android-powered StarryOS',
    'All-in-one conference system',
  ].join('\n')

  const res = await Product.updateOne(
    { brandSlug: 'czur', slug: 'czur-starryhub-q1s-pro' },
    { $set: { shortDescription } }
  )

  return NextResponse.json({ updated: res.modifiedCount > 0 })
}

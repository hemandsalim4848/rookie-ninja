import { NextResponse } from 'next/server'
import { connectDB } from '@/src/lib/mongodb'
import { Product } from '@/src/lib/models/Products'

function cleanDescription(text: string) {
  if (!text) return ''
  return text
    .replace(/Overview/gi, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\\n/g, ' ')
    .replace(/\n+/g, ' ')
    .replace(/Quick charging on the road\./gi, '')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

export async function POST(req: Request) {
  const { secret, brandSlug = 'belkin' } = await req.json()
  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await connectDB()

  const products = await Product.find({ brandSlug })
  let updated = 0

  for (const product of products) {
    const cleaned = cleanDescription(product.description)
    if (cleaned !== product.description) {
      await Product.findByIdAndUpdate(product._id, { description: cleaned })
      updated++
    }
  }

  return NextResponse.json({ success: true, updated, total: products.length })
}

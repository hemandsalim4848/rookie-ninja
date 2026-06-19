import { NextResponse } from 'next/server'
import { connectDB } from '@/src/lib/mongodb'
import { Product } from '@/src/lib/models/Products'
import brotherSpecs from '@/scripts/brother-specs.json'

export async function POST(req: Request) {
  const { secret } = await req.json()
  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await connectDB()

  let updated = 0, notFound = 0

  for (const entry of brotherSpecs) {
    const product = await Product.findOne({ brandSlug: 'brother', slug: entry.slug })
    if (!product) {
      console.log('Not found:', entry.slug)
      notFound++
      continue
    }
    await Product.findByIdAndUpdate(product._id, { specs: entry.specs })
    updated++
  }

  return NextResponse.json({ success: true, updated, notFound })
}

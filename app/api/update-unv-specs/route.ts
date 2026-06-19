import { NextResponse } from 'next/server'
import { connectDB } from '@/src/lib/mongodb'
import { Product } from '@/src/lib/models/Products'
import unvSpecs from '@/scripts/unv-specs.json'

export async function POST(req: Request) {
  const { secret } = await req.json()
  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await connectDB()

  let updated = 0, notFound = 0

  for (const entry of unvSpecs) {
    const model = entry.model.toLowerCase().replace(/\s+/g, '')
    const product = await Product.findOne({
      brandSlug: 'unv',
      slug: { $regex: model.replace(/-/g, '[- ]?'), $options: 'i' },
    })

    if (!product) {
      console.log('Not found:', entry.model)
      notFound++
      continue
    }

    await Product.findByIdAndUpdate(product._id, { specs: entry.specs })
    updated++
  }

  return NextResponse.json({ success: true, updated, notFound })
}

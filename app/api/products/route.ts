import { NextResponse } from 'next/server'
import { connectDB } from '@/src/lib/mongodb'
import { Product } from '@/src/lib/models/Products'
import { requireAdmin } from '@/src/lib/requireAdmin'

export async function GET(req: Request) {
  try {
    await connectDB()
    const { searchParams } = new URL(req.url)
    const brandSlug = searchParams.get('brand')
    const query = brandSlug ? { brandSlug } : {}
    const products = await Product.find(query).sort({ name: 1 })
    return NextResponse.json(products)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await requireAdmin()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    await connectDB()
    const body = await req.json()
    const product = await Product.create(body)
    return NextResponse.json(product, { status: 201 })
  } catch (err: any) {
    console.error('CREATE PRODUCT ERROR:', err.message)
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}
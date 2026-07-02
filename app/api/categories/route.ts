import { NextResponse } from 'next/server'
import { connectDB } from '@/src/lib/mongodb'
import { Category } from '@/src/lib/models/Category'
import { Product } from '@/src/lib/models/Products'

export async function GET() {
  await connectDB()

  // Auto-seed from products if no categories exist yet
  const count = await Category.countDocuments()
  if (count === 0) {
    const distinct: string[] = await Product.distinct('category')
    const names = distinct.filter(Boolean).sort()
    if (names.length) {
      await Category.insertMany(names.map(name => ({ name })), { ordered: false }).catch(() => {})
    }
  }

  const categories = await Category.find().sort({ name: 1 }).lean()
  return NextResponse.json(categories)
}

export async function POST(req: Request) {
  await connectDB()
  const { name } = await req.json()
  if (!name?.trim()) return NextResponse.json({ error: 'Name required' }, { status: 400 })
  try {
    const category = await Category.create({ name: name.trim() })
    return NextResponse.json(category, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Category already exists' }, { status: 409 })
  }
}

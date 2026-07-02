import { NextResponse } from 'next/server'
import { connectDB } from '@/src/lib/mongodb'
import { Category } from '@/src/lib/models/Category'
import { Product } from '@/src/lib/models/Products'

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  await connectDB()
  const { name } = await req.json()
  if (!name?.trim()) return NextResponse.json({ error: 'Name required' }, { status: 400 })

  const existing = await Category.findById(params.id)
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const oldName = existing.name
  const newName = name.trim()

  try {
    existing.name = newName
    await existing.save()
    // Cascade rename to all products
    await Product.updateMany({ category: oldName }, { $set: { category: newName } })
    return NextResponse.json(existing)
  } catch {
    return NextResponse.json({ error: 'Name already taken' }, { status: 409 })
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  await connectDB()

  const category = await Category.findById(params.id)
  if (!category) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const productCount = await Product.countDocuments({ category: category.name })
  if (productCount > 0) {
    return NextResponse.json(
      { error: `Cannot delete — ${productCount} product${productCount !== 1 ? 's' : ''} use this category.` },
      { status: 409 }
    )
  }

  await category.deleteOne()
  return NextResponse.json({ success: true })
}

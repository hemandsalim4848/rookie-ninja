import { NextResponse } from 'next/server'
import { connectDB } from '@/src/lib/mongodb'
import { Category } from '@/src/lib/models/Category'
import { Product } from '@/src/lib/models/Products'
import { requireAdmin } from '@/src/lib/requireAdmin'

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await connectDB()
  const { id } = await params
  const { name, parent } = await req.json()
  if (!name?.trim()) return NextResponse.json({ error: 'Name required' }, { status: 400 })

  const existing = await Category.findById(id)
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const oldName = existing.name
  const newName = name.trim()
  const newParent = parent === undefined ? existing.parent : (parent?.trim() || null)

  try {
    existing.name = newName
    existing.parent = newParent
    await existing.save()
    if (oldName !== newName) {
      await Product.updateMany({ category: oldName }, { $set: { category: newName } })
      await Category.updateMany({ parent: oldName }, { $set: { parent: newName } })
    }
    return NextResponse.json(existing)
  } catch {
    return NextResponse.json({ error: 'Name already taken' }, { status: 409 })
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await connectDB()
  const { id } = await params

  const category = await Category.findById(id)
  if (!category) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const productCount = await Product.countDocuments({ category: category.name })
  if (productCount > 0) {
    return NextResponse.json(
      { error: `Cannot delete — ${productCount} product${productCount !== 1 ? 's' : ''} use this category.` },
      { status: 409 }
    )
  }

  const childCount = await Category.countDocuments({ parent: category.name })
  if (childCount > 0) {
    return NextResponse.json(
      { error: `Cannot delete — ${childCount} subcategor${childCount !== 1 ? 'ies' : 'y'} nested under this category.` },
      { status: 409 }
    )
  }

  await category.deleteOne()
  return NextResponse.json({ success: true })
}

import { NextResponse } from 'next/server'
import { connectDB } from '@/src/lib/mongodb'
import { Product } from '@/src/lib/models/Products'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

function extractPublicId(url: string): string | null {
  try {
    // Cloudinary URLs look like: https://res.cloudinary.com/<cloud>/image/upload/v123/folder/public_id.ext
    const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.[a-z]+$/i)
    return match ? match[1] : null
  } catch {
    return null
  }
}

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await connectDB()
    const product = await Product.findById(id)
    if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(product)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await connectDB()
    const body = await req.json()
    const product = await Product.findByIdAndUpdate(id, body, { new: true })
    return NextResponse.json(product)
  } catch {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await connectDB()

    const product = await Product.findById(id)
    if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    // Delete all Cloudinary images before removing the product
    const cloudinaryImages = (product.images as string[]).filter((url) =>
      url.includes('cloudinary.com')
    )
    for (const url of cloudinaryImages) {
      const publicId = extractPublicId(url)
      if (publicId) {
        await cloudinary.uploader.destroy(publicId).catch(() => {})
      }
    }

    await Product.findByIdAndDelete(id)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}
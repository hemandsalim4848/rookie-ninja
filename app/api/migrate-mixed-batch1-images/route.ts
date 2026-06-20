import { NextResponse } from 'next/server'
import { connectDB } from '@/src/lib/mongodb'
import { Product } from '@/src/lib/models/Products'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const slugs = [
  '55-inch-digital-signage-display',
  '55-inch-digital-signage-display-with-touch-capability',
  'viewsonic-ep5542',
  'viewsonic-ep5542t',
  'viewsonic-ep5540',
]

function makePublicId(url: string) {
  try {
    const parts = new URL(url).pathname.split('/')
    const filename = parts[parts.length - 1]
    return filename.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '_')
  } catch {
    return `image_${Date.now()}`
  }
}

export async function GET() {
  await connectDB()

  const products = await Product.find({ slug: { $in: slugs } })
  const results = []

  for (const product of products) {
    const newImages: string[] = []
    let changed = false

    for (const imageUrl of product.images) {
      if (imageUrl.includes('cloudinary.com')) {
        newImages.push(imageUrl)
        continue
      }
      try {
        const publicId = makePublicId(imageUrl)
        const result = await cloudinary.uploader.upload(imageUrl, {
          public_id: publicId,
          folder: 'rookie-ninja/products',
          overwrite: false,
          resource_type: 'image',
        })
        newImages.push(result.secure_url)
        changed = true
      } catch {
        newImages.push(imageUrl)
      }
    }

    if (changed) await Product.findByIdAndUpdate(product._id, { images: newImages })
    results.push({ slug: product.slug, images: newImages.length })
  }

  return NextResponse.json({ results })
}

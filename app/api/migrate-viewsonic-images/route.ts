import { NextResponse } from 'next/server'
import { connectDB } from '@/src/lib/mongodb'
import { Product } from '@/src/lib/models/Products'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

function makePublicId(url: string) {
  try {
    const parts = new URL(url).pathname.split('/')
    const filename = parts[parts.length - 1]
    return filename.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '_')
  } catch {
    return `image_${Date.now()}`
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const skip = parseInt(searchParams.get('skip') || '0')
  const batchSize = parseInt(searchParams.get('batch') || '5')

  await connectDB()

  const products = await Product.find({ brandSlug: 'viewsonic' }).skip(skip).limit(batchSize)
  const total = await Product.countDocuments({ brandSlug: 'viewsonic' })

  let migrated = 0, skipped = 0, failed = 0

  for (const product of products) {
    const newImages: string[] = []
    let changed = false

    for (const imageUrl of product.images) {
      if (imageUrl.includes('cloudinary.com')) {
        newImages.push(imageUrl)
        skipped++
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
        migrated++
        changed = true
      } catch {
        newImages.push(imageUrl)
        failed++
      }
    }

    if (changed) await Product.findByIdAndUpdate(product._id, { images: newImages })
  }

  return NextResponse.json({
    migrated,
    skipped,
    failed,
    processed: skip + products.length,
    total,
    done: skip + products.length >= total,
  })
}

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

export async function POST(req: Request) {
  const { secret, skip = 0, batchSize = 30 } = await req.json()
  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await connectDB()

  const products = await Product.find({ images: { $exists: true, $ne: [] } })
    .skip(skip)
    .limit(batchSize)

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
      } catch (err: any) {
        newImages.push(imageUrl)
        failed++
      }
    }

    if (changed) {
      await Product.findByIdAndUpdate(product._id, { images: newImages })
    }
  }

  const total = await Product.countDocuments({ images: { $exists: true, $ne: [] } })

  return NextResponse.json({
    success: true,
    migrated,
    skipped,
    failed,
    processed: skip + products.length,
    total,
    done: skip + products.length >= total,
  })
}

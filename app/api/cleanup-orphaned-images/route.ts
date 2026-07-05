import { NextResponse } from 'next/server'
import { connectDB } from '@/src/lib/mongodb'
import { Product } from '@/src/lib/models/Products'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const FOLDER = 'rookie-ninja/products'

// Mirrors extractPublicId() in app/api/products/[id]/route.ts
function extractPublicId(url: string): string | null {
  const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.[a-z]+$/i)
  return match ? match[1] : null
}

async function fetchAllCloudinaryPublicIds() {
  const ids: string[] = []
  let nextCursor: string | undefined
  do {
    const res = await cloudinary.api.resources({
      type: 'upload',
      prefix: FOLDER,
      max_results: 500,
      next_cursor: nextCursor,
    })
    ids.push(...res.resources.map((r: any) => r.public_id))
    nextCursor = res.next_cursor
  } while (nextCursor)
  return ids
}

export async function POST(req: Request) {
  const { secret, delete: shouldDelete = false } = await req.json()
  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await connectDB()

  const products = await Product.find({ images: { $exists: true, $ne: [] } })
  const referencedIds = new Set<string>()
  for (const product of products) {
    for (const url of product.images as string[]) {
      if (!url.includes('cloudinary.com')) continue
      const publicId = extractPublicId(url)
      if (publicId) referencedIds.add(publicId)
    }
  }

  const cloudinaryIds = await fetchAllCloudinaryPublicIds()
  const orphans = cloudinaryIds.filter((id) => !referencedIds.has(id))

  if (!shouldDelete || orphans.length === 0) {
    return NextResponse.json({
      referencedInDb: referencedIds.size,
      inCloudinary: cloudinaryIds.length,
      orphanCount: orphans.length,
      orphans,
      deleted: false,
    })
  }

  let deletedCount = 0
  for (let i = 0; i < orphans.length; i += 100) {
    const batch = orphans.slice(i, i + 100)
    const result = await cloudinary.api.delete_resources(batch)
    deletedCount += Object.values(result.deleted).filter((v) => v === 'deleted').length
  }

  return NextResponse.json({
    referencedInDb: referencedIds.size,
    inCloudinary: cloudinaryIds.length,
    orphanCount: orphans.length,
    orphans,
    deleted: true,
    deletedCount,
  })
}

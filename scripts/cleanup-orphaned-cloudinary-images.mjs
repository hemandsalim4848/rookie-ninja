import { createRequire } from 'module'
const require = createRequire(import.meta.url)

const mongoose = require('mongoose')
const { v2: cloudinary } = require('cloudinary')

// ── Config ──────────────────────────────────────────────
const MONGODB_URI = process.env.MONGODB_URI
const FOLDER = 'rookie-ninja/products'
const DELETE = process.argv.includes('--delete')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// ── Schema ───────────────────────────────────────────────
const ProductSchema = new mongoose.Schema({
  images: [String],
}, { timestamps: true })

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema)

// Mirrors extractPublicId() in app/api/products/[id]/route.ts
function extractPublicId(url) {
  const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.[a-z]+$/i)
  return match ? match[1] : null
}

async function fetchAllCloudinaryPublicIds() {
  const ids = []
  let nextCursor
  do {
    const res = await cloudinary.api.resources({
      type: 'upload',
      prefix: FOLDER,
      max_results: 500,
      next_cursor: nextCursor,
    })
    ids.push(...res.resources.map(r => r.public_id))
    nextCursor = res.next_cursor
  } while (nextCursor)
  return ids
}

async function run() {
  if (!MONGODB_URI) throw new Error('MONGODB_URI is not set (run with: node --env-file=.env.local scripts/cleanup-orphaned-cloudinary-images.mjs)')

  await mongoose.connect(MONGODB_URI)
  console.log('✅ Connected to MongoDB\n')

  const products = await Product.find({ images: { $exists: true, $ne: [] } })
  const referencedIds = new Set()
  for (const product of products) {
    for (const url of product.images) {
      if (!url.includes('cloudinary.com')) continue
      const publicId = extractPublicId(url)
      if (publicId) referencedIds.add(publicId)
    }
  }
  console.log(`📦 Referenced Cloudinary images in DB: ${referencedIds.size}`)

  const cloudinaryIds = await fetchAllCloudinaryPublicIds()
  console.log(`☁️  Images in Cloudinary folder "${FOLDER}": ${cloudinaryIds.length}\n`)

  const orphans = cloudinaryIds.filter(id => !referencedIds.has(id))

  if (orphans.length === 0) {
    console.log('✅ No orphaned images found. Nothing to clean up.')
    await mongoose.disconnect()
    return
  }

  console.log(`🗑️  Found ${orphans.length} orphaned image(s):`)
  orphans.forEach(id => console.log(`   - ${id}`))

  if (!DELETE) {
    console.log('\nDry run only — no files deleted. Re-run with --delete to remove them.')
    await mongoose.disconnect()
    return
  }

  console.log('\n🔥 Deleting orphaned images...')
  let deleted = 0
  // Cloudinary's delete_resources accepts up to 100 public_ids per call
  for (let i = 0; i < orphans.length; i += 100) {
    const batch = orphans.slice(i, i + 100)
    const result = await cloudinary.api.delete_resources(batch)
    deleted += Object.values(result.deleted).filter(v => v === 'deleted').length
  }
  console.log(`✅ Deleted ${deleted}/${orphans.length} orphaned image(s).`)

  await mongoose.disconnect()
}

run().catch(err => {
  console.error('❌ Fatal error:', err.message)
  process.exit(1)
})

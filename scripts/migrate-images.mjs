import { createRequire } from 'module'
const require = createRequire(import.meta.url)

const mongoose = require('mongoose')
const https = require('https')
const http = require('http')
const { v2: cloudinary } = require('cloudinary')

// ── Config ──────────────────────────────────────────────
const MONGODB_URI = 'mongodb://localhost:27017/rookie-ninja'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// ── Schema ───────────────────────────────────────────────
const ProductSchema = new mongoose.Schema({
  brand: mongoose.Schema.Types.ObjectId,
  brandSlug: String, name: String, slug: String,
  sku: String, images: [String], description: String,
  specs: [{ key: String, value: String }],
  category: String, tags: [String], featured: Boolean,
}, { timestamps: true })

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema)

// ── Helpers ──────────────────────────────────────────────
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http
    client.get(url, res => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download: ${url} (${res.statusCode})`))
        return
      }
      const chunks = []
      res.on('data', chunk => chunks.push(chunk))
      res.on('end', () => resolve(Buffer.concat(chunks)))
      res.on('error', reject)
    }).on('error', reject)
  })
}

function uploadToCloudinary(buffer, publicId) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        public_id: publicId,
        folder: 'rookie-ninja/products',
        overwrite: false,
        resource_type: 'image',
      },
      (error, result) => {
        if (error) reject(error)
        else resolve(result)
      }
    )
    stream.end(buffer)
  })
}

function makePublicId(url) {
  try {
    const parts = new URL(url).pathname.split('/')
    const filename = parts[parts.length - 1]
    return filename.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '_')
  } catch {
    return `image_${Date.now()}`
  }
}

// ── Main ─────────────────────────────────────────────────
async function run() {
  await mongoose.connect(MONGODB_URI)
  console.log('✅ Connected to MongoDB\n')

  const products = await Product.find({ images: { $exists: true, $ne: [] } })
  console.log(`📦 Found ${products.length} products with images\n`)

  let totalImages = 0
  let migrated = 0
  let skipped = 0
  let failed = 0

  for (const product of products) {
    const newImages = []
    let changed = false

    for (const imageUrl of product.images) {
      totalImages++

      // Skip if already on Cloudinary
      if (imageUrl.includes('cloudinary.com')) {
        newImages.push(imageUrl)
        skipped++
        continue
      }

      try {
        console.log(`  ⬇️  Downloading: ${imageUrl.slice(0, 80)}...`)
        const buffer = await downloadImage(imageUrl)

        const publicId = makePublicId(imageUrl)
        console.log(`  ☁️  Uploading to Cloudinary as: ${publicId}`)
        const result = await uploadToCloudinary(buffer, publicId)

        newImages.push(result.secure_url)
        migrated++
        changed = true
        console.log(`  ✅ Done: ${result.secure_url}\n`)
      } catch (err) {
        console.error(`  ❌ Failed: ${imageUrl}`)
        console.error(`     ${err.message}\n`)
        newImages.push(imageUrl) // keep original on failure
        failed++
      }
    }

    if (changed) {
      await Product.findByIdAndUpdate(product._id, { images: newImages })
      console.log(`💾 Updated: ${product.name}\n`)
    }
  }

  console.log('─────────────────────────────────────')
  console.log(`✅ Migration complete!`)
  console.log(`   Total images:  ${totalImages}`)
  console.log(`   Migrated:      ${migrated}`)
  console.log(`   Already done:  ${skipped}`)
  console.log(`   Failed:        ${failed}`)
  console.log('─────────────────────────────────────')

  await mongoose.disconnect()
}

run().catch(err => {
  console.error('❌ Fatal error:', err.message)
  process.exit(1)
})
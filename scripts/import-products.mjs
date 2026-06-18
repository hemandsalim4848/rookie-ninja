import { createRequire } from 'module'
const require = createRequire(import.meta.url)

const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')

// ── Config ──────────────────────────────────────────────
const MONGODB_URI = 'mongodb://localhost:27017/rookie-ninja'
const CSV_PATH = './scripts/belkin-products.json'
const BRAND_NAME = 'Belkin'
const BRAND_SLUG = 'belkin'
const CATEGORY = 'IT Accessories'

// ── Schemas ─────────────────────────────────────────────
const BrandSchema = new mongoose.Schema({
  name: String, slug: String, logo: String,
  description: String, country: String, featured: Boolean,
}, { timestamps: true })

const ProductSchema = new mongoose.Schema({
  brand: mongoose.Schema.Types.ObjectId,
  brandSlug: String, name: String, slug: String,
  sku: String, images: [String], description: String,
  shortDescription: String,
  specs: [{ key: String, value: String }],
  category: String, tags: [String], featured: Boolean,
}, { timestamps: true })

const Brand = mongoose.models.Brand || mongoose.model('Brand', BrandSchema)
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema)

function slugify(str) {
  return str.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

function stripHtml(html) {
  if (!html) return ''
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/\\r\\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function parseShortDescription(html) {
  if (!html) return ''
  // Extract li items as separate lines
  const liMatches = html.match(/<li>(.*?)<\/li>/gi)
  if (liMatches && liMatches.length > 0) {
    return liMatches
      .map(li => li.replace(/<[^>]*>/g, '').trim())
      .filter(Boolean)
      .join('\n')
  }
  // Fallback — strip html normally
  return stripHtml(html)
}

async function run() {
  await mongoose.connect(MONGODB_URI)
  console.log('✅ Connected to MongoDB')

  // Find or create Belkin brand
  let brand = await Brand.findOne({ slug: BRAND_SLUG })
  if (!brand) {
    brand = await Brand.create({
      name: BRAND_NAME,
      slug: BRAND_SLUG,
      logo: '',
      description: 'Belkin — connectivity and protection solutions.',
      country: 'USA',
      featured: false,
    })
    console.log('✅ Created Belkin brand')
  } else {
    console.log('✅ Found existing Belkin brand')
  }

  // Read JSON data
  const products = JSON.parse(fs.readFileSync(CSV_PATH, 'utf-8'))
  console.log(`📦 Importing ${products.length} products...`)

  let inserted = 0
  let skipped = 0

  for (const p of products) {
    const slug = slugify(p.Name)
    const existing = await Product.findOne({ brandSlug: BRAND_SLUG, slug })
    if (existing) { skipped++; continue }

    const images = p.Images
      ? p.Images.split(',').map(s => s.trim()).filter(Boolean)
      : []

    const description = stripHtml(p['Description'] || '')
const shortDescription = parseShortDescription(p['Short description'] || '')

await Product.create({
  brand: brand._id,
  brandSlug: BRAND_SLUG,
  name: p.Name,
  slug,
  sku: p.SKU || '',
  images,
  description,
  shortDescription,
  category: CATEGORY,
  tags: [],
  featured: false,
  specs: [],
})
    inserted++
    console.log(`  ✓ ${p.Name}`)
  }

  console.log(`\n✅ Done! Inserted: ${inserted}, Skipped: ${skipped}`)
  await mongoose.disconnect()
}

run().catch(err => {
  console.error('❌ Error:', err.message)
  process.exit(1)
})
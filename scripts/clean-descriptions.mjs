import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const mongoose = require('mongoose')

const MONGODB_URI = 'mongodb://localhost:27017/rookie-ninja'

const ProductSchema = new mongoose.Schema({
  brand: mongoose.Schema.Types.ObjectId,
  brandSlug: String, name: String, slug: String,
  sku: String, images: [String], description: String,
  shortDescription: String,
  specs: [{ key: String, value: String }],
  category: String, tags: [String], featured: Boolean,
}, { timestamps: true })

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema)

function cleanDescription(text) {
  if (!text) return ''
  return text
    .replace(/Overview/gi, '')           // remove "Overview"
    .replace(/&nbsp;/g, ' ')             // remove &nbsp;
    .replace(/\\n/g, ' ')               // remove \n literals
    .replace(/\n+/g, ' ')               // remove actual newlines
    .replace(/Quick charging on the road\./gi, '') // remove repeated headings
    .replace(/\s{2,}/g, ' ')            // collapse multiple spaces
    .trim()
}

async function run() {
  await mongoose.connect(MONGODB_URI)
  console.log('✅ Connected to MongoDB')

const products = await Product.find({})
console.log(`📦 Found ${products.length} products`)

  let updated = 0

  for (const product of products) {
    const cleanedDescription = cleanDescription(product.description)

if (cleanedDescription !== product.description) {
  await Product.findByIdAndUpdate(product._id, {
    description: cleanedDescription,
  })
      updated++
      console.log(`  ✓ Cleaned: ${product.name}`)
    }
  }

  console.log(`\n✅ Done! Updated: ${updated} products`)
  await mongoose.disconnect()
}

run().catch(err => {
  console.error('❌ Error:', err.message)
  process.exit(1)
})
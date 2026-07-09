import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const mongoose = require('mongoose')

const MONGODB_URI = 'mongodb://localhost:27017/rookie-ninja'

const BrandSchema = new mongoose.Schema({ name: String, slug: String }, { timestamps: true })
const ProductSchema = new mongoose.Schema({
  brand: mongoose.Schema.Types.ObjectId,
  brandSlug: String, name: String, slug: String,
  sku: String, images: [String], description: String,
  shortDescription: String,
  specs: [{ key: String, value: String }],
  category: String, tags: [String], featured: Boolean,
}, { timestamps: true })

const Brand   = mongoose.models.Brand   || mongoose.model('Brand',   BrandSchema)
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema)

const products = [
  {
    name:             'Kodak S5160 Scanner',
    slug:             'kodak-s5160-scanner',
    sku:              'S5160',
    category:         'Document Scanners',
    tags:             ['production scanner', 'high speed', 'high capacity', 'FADGI', 'document scanner'],
    featured:         false,
    images:           ['https://res.cloudinary.com/df52xzi3y/image/upload/v1783611589/27_S5160_FT-ET_50-50.png_jttbhe.webp', 'https://res.cloudinary.com/df52xzi3y/image/upload/v1783611747/15_S5160_Side-View_Open-600x400_pd8ubt.webp'],
    description:      'The KODAK S5160 is a high-speed production document scanner engineered for mission-critical, high-volume scanning environments. Built on 30 years of manufacturing innovation, it combines durability with advanced imaging — featuring Dual White LED CCD technology, Tri-Stream output capabilities, ultrasonic multifeed detection, and intelligent document protection with metal detection.',
    shortDescription: 'SPEED: 160 ppm / 320 ipm\nADF CAPACITY: 750 sheets (80 g/m²)\nRESOLUTION: 600 dpi optical\nCONNECTIVITY: USB 3.2 Gen 1 + Gigabit Ethernet\nFADGI 2023: General Collections 3-Star & MTR compliant\nTri-Stream output — multiple simultaneous scan profiles',
    specs: [
      { key: 'Speed',               value: '160 ppm / 320 ipm' },
      { key: 'ADF Capacity',        value: '750 sheets (80 g/m²)' },
      { key: 'Optical Resolution',  value: '600 dpi' },
      { key: 'Max Document Size',   value: '305 mm × 10.16 m (continuous cropping)' },
      { key: 'Min Document Size',   value: '63.5 mm × 63.5 mm' },
      { key: 'Paper Weight',        value: '25–433 g/m²' },
      { key: 'Image Sensor',        value: 'Dual White LED CCD' },
      { key: 'Color Depth',         value: '24-bit (8×3); 48-bit capture' },
      { key: 'Grayscale',           value: '256 levels (8-bit)' },
      { key: 'Connectivity',        value: 'USB 3.2 Gen 1x1 + 10/100/1000 Ethernet' },
      { key: 'Control Panel',       value: '9.3" with 7.5" color touchscreen' },
      { key: 'Power (Running)',      value: '<240W' },
      { key: 'Power (Low)',          value: '<23.7W' },
      { key: 'Noise (Scanning)',     value: '<62 dB(A)' },
      { key: 'Certifications',       value: 'FADGI 2023 3-Star & MTR, ENERGY STAR, CE, FCC' },
      { key: 'OS Support',           value: 'Windows 10/11, Server 2019/2022' },
      { key: 'Drivers',              value: 'ISIS, TWAIN, WIA' },
      { key: 'Dimensions',           value: '43.4 cm H × 69.3 cm W × 55.4 cm D' },
      { key: 'Weight',               value: '60 kg (132 lbs)' },
    ],
  },
  {
    name:             'Kodak S5180 Scanner',
    slug:             'kodak-s5180-scanner',
    sku:              'S5180',
    category:         'Document Scanners',
    tags:             ['production scanner', 'high speed', 'high capacity', 'FADGI', 'document scanner'],
    featured:         false,
    images:           ['https://res.cloudinary.com/df52xzi3y/image/upload/v1783611377/S5180-angled_sq_yupnco.webp'],
    description:      'The KODAK S5180 is an ultra-fast, ultra-rugged production document scanner built for high-volume, mission-critical environments requiring sustained throughput. Featuring Dynamic Flow Technology, Tri-Stream output capabilities, metal detection, and FADGI 2023 compliance — it delivers 180 ppm with a 750-sheet ADF for uninterrupted enterprise-scale digitisation.',
    shortDescription: 'SPEED: 180 ppm / 360 ipm\nADF CAPACITY: 750 sheets (80 g/m²)\nRESOLUTION: 600 dpi optical\nCONNECTIVITY: USB 3.2 Gen 1 + Gigabit Ethernet\nFADGI 2023: General Collections 3-Star & MTR compliant\nDynamic Flow Technology — sustained high-volume throughput',
    specs: [
      { key: 'Speed',               value: '180 ppm / 360 ipm' },
      { key: 'ADF Capacity',        value: '750 sheets (80 g/m²)' },
      { key: 'Optical Resolution',  value: '600 dpi' },
      { key: 'Max Document Size',   value: '305 mm × 10.16 m (continuous cropping)' },
      { key: 'Min Document Size',   value: '63.5 mm × 63.5 mm' },
      { key: 'Paper Weight',        value: '25–433 g/m²' },
      { key: 'Image Sensor',        value: 'Dual White LED CCD' },
      { key: 'Color Depth',         value: '24-bit (8×3); 48-bit capture' },
      { key: 'Grayscale',           value: '256 levels (8-bit)' },
      { key: 'Connectivity',        value: 'USB 3.2 Gen 1x1 + 10/100/1000 Ethernet' },
      { key: 'Control Panel',       value: '9.3" with 7.5" color touchscreen' },
      { key: 'Power (Running)',      value: '<240W' },
      { key: 'Power (Low)',          value: '<23.7W' },
      { key: 'Certifications',       value: 'FADGI 2023 3-Star & MTR, ENERGY STAR, CE, FCC' },
      { key: 'OS Support',           value: 'Windows 10/11, Server 2019/2022' },
      { key: 'Drivers',              value: 'ISIS, TWAIN, WIA' },
      { key: 'Dimensions',           value: '43.4 cm H × 69.3 cm W × 55.4 cm D' },
      { key: 'Weight',               value: '60 kg (132 lbs)' },
    ],
  },
  {
    name:             'Kodak S5210 Scanner',
    slug:             'kodak-s5210-scanner',
    sku:              'S5210',
    category:         'Document Scanners',
    tags:             ['production scanner', 'high speed', 'high capacity', 'FADGI', 'document scanner'],
    featured:         false,
    images:           ['https://res.cloudinary.com/df52xzi3y/image/upload/v1783611377/s5210-front_stnd_sq_aizw2o.webp'],
    description:      'The KODAK S5210 is the fastest and most powerful production scanner in the Kodak Alaris lineup — delivering 210 ppm / 420 ipm throughput with Tri-Stream capabilities exceeding 1,200 images per minute. Built for 24/7 continuous operation, it features a motorised height-adjustable floor stand, 9.3" touchscreen control panel, metal detection, and full FADGI 2023 compliance.',
    shortDescription: 'SPEED: 210 ppm / 420 ipm\nADF CAPACITY: 750 sheets (80 g/m²)\nRESOLUTION: 600 dpi optical\nCONNECTIVITY: USB 3.2 Gen 1 + Gigabit Ethernet\nFADGI 2023: General Collections 3-Star & MTR compliant\nTri-Stream: 1,200+ images per minute simultaneously',
    specs: [
      { key: 'Speed',               value: '210 ppm / 420 ipm (1,200+ ipm with Tri-Stream)' },
      { key: 'ADF Capacity',        value: '750 sheets (80 g/m²)' },
      { key: 'Optical Resolution',  value: '600 dpi' },
      { key: 'Max Document Size',   value: '305 mm × 10.16 m (continuous cropping)' },
      { key: 'Min Document Size',   value: '63.5 mm × 63.5 mm' },
      { key: 'Paper Weight',        value: '25–433 g/m²' },
      { key: 'Image Sensor',        value: 'Dual White LED CCD' },
      { key: 'Color Depth',         value: '24-bit (8×3); 48-bit capture' },
      { key: 'Grayscale',           value: '256 levels (8-bit)' },
      { key: 'Connectivity',        value: 'USB 3.2 Gen 1x1 + 10/100/1000 Ethernet' },
      { key: 'Control Panel',       value: '9.3" with 7.5" color touchscreen' },
      { key: 'Floor Stand',         value: 'Motorised height-adjustable (240mm range)' },
      { key: 'Power (Running)',      value: '<240W' },
      { key: 'Power (Standby)',      value: '<0.5W' },
      { key: 'Certifications',       value: 'FADGI 2023 3-Star & MTR, ENERGY STAR, CE, FCC' },
      { key: 'OS Support',           value: 'Windows 10/11, Server 2019/2022' },
      { key: 'Drivers',              value: 'ISIS, TWAIN, WIA' },
      { key: 'Dimensions',           value: '43.4 cm H × 69.3 cm W × 55.4 cm D' },
      { key: 'Weight',               value: '60 kg (132 lbs)' },
    ],
  },
]

async function run() {
  await mongoose.connect(MONGODB_URI)
  console.log('Connected to MongoDB')

  const brand = await Brand.findOne({ slug: 'kodak-alaris' })
  if (!brand) { console.error('kodak-alaris brand not found'); process.exit(1) }
  console.log(`Found brand: ${brand.name} (${brand._id})`)

  for (const p of products) {
    const doc = { ...p, brand: brand._id, brandSlug: 'kodak-alaris' }
    const result = await Product.findOneAndUpdate(
      { slug: p.slug },
      { $set: doc },
      { upsert: true, returnDocument: 'after' }
    )
    console.log(`Upserted: ${result.name} (${result._id})`)
  }

  console.log('Done.')
  await mongoose.disconnect()
}

run().catch(err => { console.error(err); process.exit(1) })

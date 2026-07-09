import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const mongoose = require('mongoose')

const MONGODB_URI = 'mongodb://localhost:27017/rookie-ninja'

const BrandSchema   = new mongoose.Schema({ name: String, slug: String }, { timestamps: true })
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
  /* ── DR-S130 ── */
  {
    name:             'Canon imageFORMULA DR-S130 Document Scanner',
    slug:             'canon-imageformula-dr-s130-document-scanner',
    sku:              'DR-S130',
    category:         'Document Scanners',
    tags:             ['document scanner', 'desktop scanner', 'departmental', 'canon'],
    featured:         false,
    images:           [
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1783613524/JBAkJtk47CLnAGsxDdprgK_d4z1o3.webp',
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1783613524/canon-imageformula-dr-s130-left-with-paper-large_bq9fni.webp',
    ],
    description:      'The Canon imageFORMULA DR-S130 is a compact, high-speed departmental scanner designed for front-office and workgroup environments. Delivering 30 ppm / 60 ipm duplex scanning with a 50-sheet ADF, it features ultrasonic double-feed detection and USB 3.1 connectivity — all in a slim, space-saving footprint ideal for shared office use.',
    shortDescription: 'SPEED: 30 ppm / 60 ipm\nADF CAPACITY: 50 sheets\nRESOLUTION: 600 dpi optical\nCONNECTIVITY: USB 3.1 Gen 1\nUltrasonic double-feed detection\nCompatible with CaptureOnTouch Pro',
    specs: [
      { key: 'Speed',               value: '30 ppm / 60 ipm (200 dpi, Color/Grayscale/B&W)' },
      { key: 'ADF Capacity',        value: '50 sheets' },
      { key: 'Optical Resolution',  value: '600 dpi' },
      { key: 'Output Resolution',   value: '100–600 dpi' },
      { key: 'Scanning Element',    value: 'CIS (Contact Image Sensor)' },
      { key: 'Color Depth',         value: '24-bit color; 8-bit grayscale' },
      { key: 'Document Size',       value: 'A8 to A4 (max width 216 mm)' },
      { key: 'Paper Weight',        value: '40–128 g/m²' },
      { key: 'Connectivity',        value: 'USB 3.1 Gen 1' },
      { key: 'Drivers',             value: 'ISIS, TWAIN, WIA' },
      { key: 'Bundled Software',    value: 'CaptureOnTouch Pro' },
      { key: 'Dimensions',          value: '308 mm D × 98 mm W × 165 mm H' },
      { key: 'Weight',              value: 'Approx. 2.7 kg' },
    ],
  },

  /* ── CR-190i II UV ── */
  {
    name:             'Canon CR-190i II UV Cheque Scanner',
    slug:             'canon-cr-190i-ii-uv-cheque-scanner',
    sku:              'CR-190i II UV',
    category:         'Cheque Scanners',
    tags:             ['cheque scanner', 'banking', 'MICR', 'UV detection', 'canon'],
    featured:         false,
    images:           ['https://res.cloudinary.com/df52xzi3y/image/upload/v1782244839/cr-190i190iuv-b1_tevpee.webp'],
    description:      'The Canon CR-190i II UV is a high-speed cheque scanner delivering 190 cheques per minute with precise MICR reading (E13B & CMC-7) and built-in UV counterfeit detection. Engineered for high-volume banking and financial processing environments, it features a 4-line imprinter, 250-sheet feed capacity, and simultaneous OCR processing — all with reliable jam-free operation.',
    shortDescription: 'SPEED: 190 cheques/min | 160 cheques/min (UV mode)\nFEED CAPACITY: 250 sheets\nMICR: E13B & CMC-7\nUV counterfeit detection\n4-line imprinter (48 characters per line)\nDaily capacity: 24,000 scans',
    specs: [
      { key: 'Scanning Speed',      value: '190 cheques/min; 160 cheques/min (UV mode)' },
      { key: 'Daily Volume',        value: '24,000 scans/day' },
      { key: 'Feed Capacity',       value: '250 sheets' },
      { key: 'Scanning Element',    value: 'CMOS CIS' },
      { key: 'Light Source',        value: 'LED / UV LED' },
      { key: 'Output Resolution',   value: '100–300 dpi (up to 200 dpi in UV mode)' },
      { key: 'Scanning Modes',      value: 'UV Scan, B&W, Error Diffusion, Fine Text, Grayscale' },
      { key: 'MICR Recognition',    value: 'E13B & CMC-7' },
      { key: 'Imprinter',           value: '4-line, 48 characters per line' },
      { key: 'Document Width',      value: '68–108 mm' },
      { key: 'Document Length',     value: '120–245 mm' },
      { key: 'Double-feed Detection', value: 'Yes (ultrasonic)' },
      { key: 'Connectivity',        value: 'USB 2.0' },
      { key: 'Drivers',             value: 'ISIS, TWAIN' },
      { key: 'Power (Scanning)',     value: '49W' },
      { key: 'Power (Sleep)',        value: '2.7W' },
      { key: 'Dimensions',          value: '476 mm W × 272 mm D × 214 mm H' },
      { key: 'Weight',              value: 'Approx. 8.4 kg' },
    ],
  },

  /* ── CR-120 / CR-120UV ── */
  {
    name:             'Canon CR-120 / CR-120UV Cheque Scanner',
    slug:             'canon-cr-120-cr-120uv-cheque-scanner',
    sku:              'CR-120 / CR-120UV',
    category:         'Cheque Scanners',
    tags:             ['cheque scanner', 'banking', 'MICR', 'UV detection', 'card authentication', 'canon'],
    featured:         false,
    images:           ['https://res.cloudinary.com/df52xzi3y/image/upload/v1782244839/CR-120-Gallery-3-removebg-preview_gxui0l.webp'],
    description:      'The Canon CR-120 / CR-120UV is a high-performance cheque scanner combining 120 cheques-per-minute processing with integrated ID card authentication. Featuring accurate MICR reading (E13B & CMC-7), a 5-line imprinter, and UV anti-fraud detection (CR-120UV), it is designed for banking teller windows and branch-level environments requiring both cheque capture and identity verification in a compact form.',
    shortDescription: 'SPEED: 120 cheques/min\nFEED CAPACITY: 150 sheets | 200-sheet output pocket\nMICR: E13B & CMC-7\nUV counterfeit detection (CR-120UV)\n5-line imprinter (60 characters)\nDedicated ID card feeder',
    specs: [
      { key: 'Scanning Speed',      value: '120 cheques/min' },
      { key: 'Feed Capacity',       value: '150 sheets' },
      { key: 'Output Pocket',       value: '200 sheets' },
      { key: 'Scanning Element',    value: 'CMOS CIS' },
      { key: 'Output Resolution',   value: '100–300 dpi (cheques); 600 dpi (cards)' },
      { key: 'MICR Recognition',    value: 'E13B & CMC-7' },
      { key: 'UV Detection',        value: 'Yes (CR-120UV variant)' },
      { key: 'Imprinter',           value: '5-line, 60 characters' },
      { key: 'ID Card Feeder',      value: 'Dedicated card feeder with color imaging sensor' },
      { key: 'Document Width',      value: '60–108 mm' },
      { key: 'Document Length',     value: '90–245 mm' },
      { key: 'Connectivity',        value: 'USB 2.0 Hi-Speed' },
      { key: 'Power (Scanning)',     value: '23W' },
      { key: 'Power (Sleep)',        value: '2.1W' },
      { key: 'Operating Temp',      value: '10–32.5°C' },
      { key: 'Dimensions',          value: '170 mm W × 238.2 mm D × 203.6 mm H' },
      { key: 'Weight',              value: 'Approx. 3.2 kg' },
    ],
  },
]

async function run() {
  await mongoose.connect(MONGODB_URI)
  console.log('Connected to MongoDB')

  const brand = await Brand.findOne({ slug: 'canon' })
  if (!brand) { console.error('canon brand not found'); process.exit(1) }
  console.log(`Found brand: ${brand.name} (${brand._id})`)

  // Upsert 3 missing products
  for (const p of products) {
    const doc = { ...p, brand: brand._id, brandSlug: 'canon' }
    const result = await Product.findOneAndUpdate(
      { slug: p.slug },
      { $set: doc },
      { upsert: true, returnDocument: 'after' }
    )
    console.log(`Upserted: ${result.name}`)
  }

  // Remove duplicate canon-sf400
  const deleted = await Product.findOneAndDelete({ slug: 'canon-sf400' })
  if (deleted) console.log(`Deleted duplicate: ${deleted.name} (${deleted.slug})`)
  else console.log('canon-sf400 not found — already removed or never existed')

  console.log('Done.')
  await mongoose.disconnect()
}

run().catch(err => { console.error(err); process.exit(1) })

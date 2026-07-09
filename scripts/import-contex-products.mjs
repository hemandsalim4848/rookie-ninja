import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const mongoose = require('mongoose')

const MONGODB_URI = 'mongodb://localhost:27017/rookie-ninja'

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

const Brand   = mongoose.models.Brand   || mongoose.model('Brand',   BrandSchema)
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema)

const products = [
  {
    name:             'Contex HD Apeiron/42',
    slug:             'contex-hd-apeiron-42',
    sku:              'HD-APEIRON-42',
    category:         'Wide Format Scanners',
    tags:             ['art scanner', 'contact-free', 'large format', 'FADGI', 'museum'],
    featured:         true,
    images: [
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1783591957/HD-Apeiron42-contex-art-scanner-high-position_cups_shadow-sec-800x600-1_sqsyby.webp',
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1783591957/HD-Apeiron42-contex-art-scanner-low-position_blue-vase-shadow-800x600-1_uy0hur.webp',
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1783591957/HD-Apeiron42-contex-art-scanner-high-position_monitor-out_shadow-800x600-fourth_n98nuu.webp',
    ],
    description:      'The Contex HD Apeiron/42 is a contact-free large format art scanner designed for digitising priceless originals without media ever touching the scanner surface. Featuring TRI-R™ LED technology with a CRI exceeding 98, it is FADGI ★★★★ and ISO 19264-1 compliant — the fastest contact-free large format scanner on the market.',
    shortDescription: 'Contact-free large format art scanner\n42" scan width, 1200 dpi optical\nFADGI ★★★★ & ISO 19264-1 compliant\nCRI > 98 — museum-safe TRI-R™ LED lighting\n10" media clearance height\nCCD technology with Fujifilm lenses',
    specs: [
      { key: 'Optical Resolution',    value: '1200 dpi' },
      { key: 'Max Resolution',        value: '9600 dpi (interpolated)' },
      { key: 'Max Scan Width',        value: '42 in (1067 mm)' },
      { key: 'Max Scan Length',       value: '60 in (1524 mm)' },
      { key: 'Media Clearance',       value: '10 in (254 mm)' },
      { key: 'Focal Plane',           value: 'Up to 5.1 in (130 mm)' },
      { key: 'Technology',            value: 'CCD — 6 cameras, Fujifilm lenses, Toshiba CCDs' },
      { key: 'Total Pixels',          value: '256,320 pixels' },
      { key: 'Scan Speed (300 dpi)',  value: '6 ips color' },
      { key: 'Color Rendering Index', value: '> 98 (TRI-R™ LED)' },
      { key: 'Lamp Spectrums',        value: '2700K, 5000K, 6500K — no UV/IR' },
      { key: 'Color Spaces',          value: 'sRGB, Adobe RGB, Device RGB' },
      { key: 'File Formats',          value: 'TIFF, JPG, PDF, PDF/A, DWF, CALS, BMP, JPEG-2000' },
      { key: 'Connectivity',          value: 'USB 3.0 SuperSpeed or Gigabit Ethernet' },
      { key: 'Operating System',      value: 'Windows 11 64-bit' },
      { key: 'Power (Scanning)',      value: '76W' },
      { key: 'Certifications',        value: 'FADGI ★★★★, ISO 19264-1:2021, Energy Star 3.0' },
      { key: 'Included Software',     value: 'Nextimage Apeiron (12 languages)' },
      { key: 'Weight',                value: '~412 lbs (187 kg)' },
      { key: 'Dimensions',            value: '3450 × 1558 × 1575 mm (highest position)' },
    ],
  },
  {
    name:             'Contex SD One X',
    slug:             'contex-sd-one-x',
    sku:              'SD-ONE-X',
    category:         'Wide Format Scanners',
    tags:             ['wide format', 'large format', 'CIS scanner', 'portable', 'engineering'],
    featured:         false,
    images: [
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1783591957/1200x800_SD-One-X_44-1024x683_f1wi27.webp',
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1783591957/1200x800_SD-One-X_36-1024x683_xhehak.webp',
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1783591958/1200x800_SD-One-X_24-1024x683_jpypb4.webp',
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1783591957/1200x800_SD-One-X_blue_ncafuc.webp',
    ],
    description:      'The Contex SD One X is a compact, lightweight entry-level CIS large format scanner — portable enough for one person to carry, yet fully featured for scanning oversized maps, engineering drawings, and construction plans. Available in 24", 36", and 44" widths.',
    shortDescription: 'Compact entry-level large format scanner\nAvailable in 24", 36" and 44" widths\n600 dpi optical, 9600 dpi interpolated\nFADGI 3-star compliant\nLightweight — portable single-person carry\nContex CleanScan CIS technology',
    specs: [
      { key: 'Technology',           value: 'Contex CleanScan CIS, dual-sided LED' },
      { key: 'Optical Resolution',   value: '600 dpi' },
      { key: 'Max Resolution',       value: '9600 dpi (interpolated)' },
      { key: 'Available Widths',     value: '24 in (610 mm), 36 in (914 mm), 44 in (1118 mm)' },
      { key: 'Color Speed (200dpi)', value: '4 inches/second' },
      { key: 'Data Capture',         value: '48-bit color / 16-bit monochrome' },
      { key: 'Color Spaces',         value: 'Adobe RGB, Device RGB, sRGB' },
      { key: 'Accuracy',             value: '0.1% ± 1 pixel' },
      { key: 'Connectivity',         value: 'USB 3.0 with xDTR3' },
      { key: 'Operating System',     value: 'Windows 11 64-bit, Windows Server 2025' },
      { key: 'File Formats',         value: 'TIF, JPG, PDF, PDF/A, DWF, CALS, BMP, JPEG-2000' },
      { key: 'Power (Scanning)',     value: '14W' },
      { key: 'Weight',               value: '20.9 lbs / 24" | 28.4 lbs / 36" | 32.2 lbs / 44"' },
      { key: 'Certifications',       value: 'FADGI 3-star, Energy Star 3.0' },
      { key: 'Included Software',    value: 'Nextimage 7 (trial)' },
    ],
  },
]

async function run() {
  await mongoose.connect(MONGODB_URI)
  console.log('Connected to MongoDB')

  const brand = await Brand.findOne({ slug: 'contex' })
  if (!brand) {
    console.error('Contex brand not found in DB. Please ensure the brand exists first.')
    process.exit(1)
  }
  console.log(`Found brand: ${brand.name} (${brand._id})`)

  for (const p of products) {
    const doc = {
      ...p,
      brand:     brand._id,
      brandSlug: 'contex',
    }
    const result = await Product.findOneAndUpdate(
      { slug: p.slug },
      { $set: doc },
      { upsert: true, new: true }
    )
    console.log(`Upserted: ${result.name} (${result._id})`)
  }

  console.log('Done.')
  await mongoose.disconnect()
}

run().catch(err => { console.error(err); process.exit(1) })

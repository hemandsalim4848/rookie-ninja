import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

const BrandSchema   = new mongoose.Schema({ name: String, slug: String }, { timestamps: true });
const ProductSchema = new mongoose.Schema({
  brand: mongoose.Schema.Types.ObjectId,
  brandSlug: String, name: String, slug: String,
  sku: String, images: [String], description: String,
  shortDescription: String,
  specs: [{ key: String, value: String }],
  category: String, tags: [String], featured: Boolean,
}, { timestamps: true, strict: false });

const Brand   = mongoose.models.Brand   || mongoose.model('Brand',   BrandSchema);
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(MONGODB_URI);
}

const product = {
  name:             'SmartLF ivo 6000',
  slug:             'smartlf-ivo-6000',
  category:         'Document Scanners',
  tags:             ['large format scanner', 'contact-free', 'fine art', 'overhead scanner', 'colortrac', 'fadgi', 'archival'],
  featured:         false,
  images: [
    'https://res.cloudinary.com/df52xzi3y/image/upload/v1783615710/SmartLF-ivo-6000_Contact-free-large-format-art-scanner_Sideview_Artwork_Stock_Teal-image-1_xxo23g.webp',
  ],
  description: 'The SmartLF ivo 6000 is a contact-free large format scanner designed for the digitization of fine art, thick media, framed artwork, PCBs, textiles, and delicate originals. With 1200 dpi optical resolution, FADGI 4-star certification, and dual TRI-R LED lamps with adjustable angle lighting, it delivers museum-grade accuracy and ICC color management powered by X-Rite®. Scanning areas up to 42 × 60 inches with a 5.1" focus plane clearance make it suitable for the most demanding cultural heritage and fine art reprographics workflows.',
  shortDescription: 'SCANNING AREA: Up to 42 × 60" (1067 × 1524 mm)\nOPTICAL RESOLUTION: 1200 dpi (up to 9600 dpi interpolated)\nCOLOR DEPTH: 48-bit color capture\nCLEARANCE: 5.1" focus plane | 10" max height\nFADGI ★★★★ 4-star | ISO 19264-1:2021\nICC Color Management via X-Rite® | CRI >98 lighting',
  specs: [
    { key: 'Maximum Scan Area',       value: '42 × 60 inches (1067 × 1524 mm)' },
    { key: 'Minimum Scan Area',       value: '1 × 1 inch (24.5 × 24.5 mm)' },
    { key: 'Maximum Media Size',      value: '43.8 × 64 inches (1113 × 1625 mm)' },
    { key: 'Optical Resolution',      value: '1200 dpi (up to 9600 dpi interpolated)' },
    { key: 'Total Pixels',            value: '256,320 pixels' },
    { key: 'Scan Speed (300 dpi)',     value: '5.5 inches per second' },
    { key: 'Scan Speed (600 dpi)',     value: '1.38 inches per second' },
    { key: 'Scan Speed (1200 dpi)',    value: '0.28 inches per second' },
    { key: 'Camera / CCD',            value: '6 premium lenses with quad-linear Toshiba color CCDs (RGB + grey)' },
    { key: 'Lighting',                value: '2 TRI-R LED lamps — 2700K, 5000K, 6500K | 4 adjustable angles | CRI >98 | No UV/IR' },
    { key: 'Max Clearance Height',    value: '10 inches (254 mm)' },
    { key: 'Max Focus Plane',         value: '5.1 inches (130 mm) above table' },
    { key: 'Color Depth',             value: '48-bit color capture (16-bit grayscale); output 24-bit or 48-bit' },
    { key: 'Color Spaces',            value: 'Adobe RGB, ProPhoto RGB, Device RGB, sRGB' },
    { key: 'Color Management',        value: 'X-Rite® ICC profiles + IT8; custom ICC profile support' },
    { key: 'FADGI Rating',            value: '★★★★ 4-star' },
    { key: 'ISO Standard',            value: 'ISO 19264-1:2021 compliant' },
    { key: 'Focus System',            value: 'Auto + manual via 5 laser sensors; auto-focus tolerance ±10 mm at 300 dpi' },
    { key: 'Surface Effect',          value: '3D surface effect (0–100 adjustment); 4 lamp angle positions' },
    { key: 'Repeatability',           value: '0.1% ±1 pixel' },
    { key: 'Connectivity',            value: 'USB 3.0 SuperSpeed or Gigabit Ethernet' },
    { key: 'Software',                value: 'SmartWorks ivo (11 languages); 22" touchscreen monitor included' },
    { key: 'File Formats',            value: 'Big TIFF, TIF, JPG, PDF, PDF/A, DWF, BMP, JPEG2000 Extended, PNG' },
    { key: 'Operating System',        value: 'Windows 11 64-bit' },
    { key: 'Power (Scanning)',        value: '76W' },
    { key: 'Power (Standby)',         value: '36W' },
    { key: 'Power (Sleep)',           value: '1.3W' },
    { key: 'Energy Certification',    value: 'Energy Star 3.0' },
    { key: 'Noise Level',             value: '44.8–47 dBA (scanning); 0 dBA (standby)' },
    { key: 'Operating Temp',          value: '15–30°C (59–86°F)' },
    { key: 'Humidity',                value: '35–60% non-condensing' },
    { key: 'Table Load Capacity',     value: '44 lbs (20 kg) evenly distributed' },
    { key: 'Scanner Dimensions',      value: '135.8 × 61.3 × 62 inches (W × H × D)' },
    { key: 'Table Height',            value: '35.4 inches (900 mm)' },
    { key: 'Scanner Weight',          value: 'Approx. 412 lbs (187 kg)' },
    { key: 'Certifications',          value: 'UL/Cb, FCC, CCC, UKCA, CE, VCCI, RoHS, Energy Star 3.0, FADGI 4-star' },
  ],
};

export async function GET() {
  try {
    await connectDB();

    const brand = await Brand.findOne({ slug: 'colortrac' });
    if (!brand) return NextResponse.json({ error: 'colortrac brand not found' }, { status: 404 });

    const doc = { ...product, brand: brand._id, brandSlug: 'colortrac' };
    const result = await Product.findOneAndUpdate(
      { slug: product.slug },
      { $set: doc, $unset: { sku: '' } },
      { upsert: true, returnDocument: 'after' }
    );

    return NextResponse.json({ ok: true, slug: result.slug, name: result.name });
  } catch (err: unknown) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

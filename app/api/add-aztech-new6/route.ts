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

const products = [
  {
    name: 'Aztech Ideaflow Bright 55" 4K Interactive Display',
    slug: 'aztech-ideaflow-bright-55-4k-interactive-display',
    category: 'IFP',
    tags: ['interactive display', 'ifpd', '4k', 'aztech', 'ideaflow bright', '55 inch'],
    featured: false,
    images: [
      'https://aztechmea.com/wp-content/uploads/2025/12/AZTECH-Smart-Interactive-Display-Final-Catalogue-A4-Size-01Asset-2-100.jpg',
      'https://aztechmea.com/wp-content/uploads/2025/12/4-scaled.png',
      'https://aztechmea.com/wp-content/uploads/2025/12/5-scaled-1.png',
    ],
    description: 'The Aztech Ideaflow Bright 55" is a 4K UHD interactive flat panel display powered by Android 14, featuring a built-in 48MP AI camera with auto-framing and speaker tracking, DLED backlight, and 8GB RAM with 128GB storage.',
    shortDescription: '4K UHD DLED | Android 14 | 8GB+128GB | 48MP AI Camera | WiFi | BT 5.0 | 400 nits',
    specs: [
      { key: 'Screen Size',          value: '55 inches' },
      { key: 'Backlight',            value: 'DLED' },
      { key: 'Resolution',           value: '3840×2160 (4K UHD)' },
      { key: 'Brightness',           value: '400 cd/m²' },
      { key: 'Contrast',             value: '5000:1' },
      { key: 'Refresh Rate',         value: '60Hz' },
      { key: 'Response Time',        value: '8ms' },
      { key: 'Color Gamut',          value: '72% NTSC' },
      { key: 'Viewing Angle',        value: '178°/178°' },
      { key: 'Surface Hardness',     value: '4mm tempered glass, 7H, anti-glare' },
      { key: 'Lifespan',             value: '50,000 hours' },
      { key: 'RAM / Storage',        value: '8GB + 128GB' },
      { key: 'Operating System',     value: 'Android 14' },
      { key: 'Camera',               value: '48MP AI Camera (Auto Framing & Speaker Tracking)' },
      { key: 'Bluetooth',            value: '5.0' },
    ],
  },
  {
    name: 'Aztech Ideaflow Bright 65" 4K Interactive Display',
    slug: 'aztech-ideaflow-bright-65-4k-interactive-display',
    category: 'IFP',
    tags: ['interactive display', 'ifpd', '4k', 'aztech', 'ideaflow bright', '65 inch'],
    featured: false,
    images: [
      'https://aztechmea.com/wp-content/uploads/2025/12/AZTECH-Smart-Interactive-Display-Final-Catalogue-A4-Size-01Asset-2-100.jpg',
      'https://aztechmea.com/wp-content/uploads/2025/12/4-scaled.png',
      'https://aztechmea.com/wp-content/uploads/2025/12/5-scaled-1.png',
    ],
    description: 'The Aztech Ideaflow Bright 65" is a 4K UHD interactive flat panel display powered by Android 14, featuring a built-in 48MP AI camera with auto-framing and speaker tracking, DLED backlight, and 8GB RAM with 128GB storage.',
    shortDescription: '4K UHD DLED | Android 14 | 8GB+128GB | 48MP AI Camera | WiFi | BT 5.0 | 400 nits',
    specs: [
      { key: 'Screen Size',          value: '65 inches' },
      { key: 'Backlight',            value: 'DLED' },
      { key: 'Resolution',           value: '3840×2160 (4K UHD)' },
      { key: 'Brightness',           value: '400 cd/m²' },
      { key: 'Contrast',             value: '5000:1' },
      { key: 'Refresh Rate',         value: '60Hz' },
      { key: 'Response Time',        value: '8ms' },
      { key: 'Color Gamut',          value: '72% NTSC' },
      { key: 'Viewing Angle',        value: '178°/178°' },
      { key: 'Surface Hardness',     value: '4mm tempered glass, 7H, anti-glare' },
      { key: 'Lifespan',             value: '50,000 hours' },
      { key: 'RAM / Storage',        value: '8GB + 128GB' },
      { key: 'Operating System',     value: 'Android 14' },
      { key: 'Camera',               value: '48MP AI Camera (Auto Framing & Speaker Tracking)' },
      { key: 'Bluetooth',            value: '5.0' },
    ],
  },
  {
    name: 'Aztech Ideaflow Bright 75" 4K Interactive Display',
    slug: 'aztech-ideaflow-bright-75-4k-interactive-display',
    category: 'IFP',
    tags: ['interactive display', 'ifpd', '4k', 'aztech', 'ideaflow bright', '75 inch'],
    featured: false,
    images: [
      'https://aztechmea.com/wp-content/uploads/2025/12/AZTECH-Smart-Interactive-Display-Final-Catalogue-A4-Size-01Asset-2-100.jpg',
      'https://aztechmea.com/wp-content/uploads/2025/12/4-scaled.png',
      'https://aztechmea.com/wp-content/uploads/2025/12/5-scaled-1.png',
    ],
    description: 'The Aztech Ideaflow Bright 75" is a 4K UHD interactive flat panel display powered by Android 14, featuring a built-in 48MP AI camera with auto-framing and speaker tracking, DLED backlight, and 8GB RAM with 128GB storage.',
    shortDescription: '4K UHD DLED | Android 14 | 8GB+128GB | 48MP AI Camera | WiFi | BT 5.0 | 400 nits',
    specs: [
      { key: 'Screen Size',          value: '75 inches' },
      { key: 'Backlight',            value: 'DLED' },
      { key: 'Resolution',           value: '3840×2160 (4K UHD)' },
      { key: 'Brightness',           value: '400 cd/m²' },
      { key: 'Contrast',             value: '5000:1' },
      { key: 'Refresh Rate',         value: '60Hz' },
      { key: 'Response Time',        value: '8ms' },
      { key: 'Color Gamut',          value: '72% NTSC' },
      { key: 'Viewing Angle',        value: '178°/178°' },
      { key: 'Surface Hardness',     value: '4mm tempered glass, 7H, anti-glare' },
      { key: 'Lifespan',             value: '50,000 hours' },
      { key: 'RAM / Storage',        value: '8GB + 128GB' },
      { key: 'Operating System',     value: 'Android 14' },
      { key: 'Camera',               value: '48MP AI Camera (Auto Framing & Speaker Tracking)' },
      { key: 'Bluetooth',            value: '5.0' },
    ],
  },
  {
    name: 'Aztech Ideaflow Bright 86" 4K Interactive Display',
    slug: 'aztech-ideaflow-bright-86-4k-interactive-display',
    category: 'IFP',
    tags: ['interactive display', 'ifpd', '4k', 'aztech', 'ideaflow bright', '86 inch'],
    featured: false,
    images: [
      'https://aztechmea.com/wp-content/uploads/2025/12/AZTECH-Smart-Interactive-Display-Final-Catalogue-A4-Size-01Asset-2-100.jpg',
      'https://aztechmea.com/wp-content/uploads/2025/12/4-scaled.png',
      'https://aztechmea.com/wp-content/uploads/2025/12/5-scaled-1.png',
    ],
    description: 'The Aztech Ideaflow Bright 86" is a 4K UHD interactive flat panel display powered by Android 14, featuring a built-in 48MP AI camera with auto-framing and speaker tracking, DLED backlight, and 8GB RAM with 128GB storage.',
    shortDescription: '4K UHD DLED | Android 14 | 8GB+128GB | 48MP AI Camera | WiFi | BT 5.0 | 400 nits',
    specs: [
      { key: 'Screen Size',          value: '86 inches' },
      { key: 'Backlight',            value: 'DLED' },
      { key: 'Resolution',           value: '3840×2160 (4K UHD)' },
      { key: 'Brightness',           value: '400 cd/m²' },
      { key: 'Contrast',             value: '5000:1' },
      { key: 'Refresh Rate',         value: '60Hz' },
      { key: 'Response Time',        value: '8ms' },
      { key: 'Color Gamut',          value: '72% NTSC' },
      { key: 'Viewing Angle',        value: '178°/178°' },
      { key: 'Surface Hardness',     value: '4mm tempered glass, 7H, anti-glare' },
      { key: 'Lifespan',             value: '50,000 hours' },
      { key: 'RAM / Storage',        value: '8GB + 128GB' },
      { key: 'Operating System',     value: 'Android 14' },
      { key: 'Camera',               value: '48MP AI Camera (Auto Framing & Speaker Tracking)' },
      { key: 'Bluetooth',            value: '5.0' },
    ],
  },
  {
    name: 'Aztech Ideaflow 98" 4K Interactive Display',
    slug: 'aztech-ideaflow-98-4k-interactive-display',
    category: 'IFP',
    tags: ['interactive display', 'ifpd', '4k', 'aztech', 'ideaflow', '98 inch'],
    featured: false,
    images: [
      'https://aztechmea.com/wp-content/uploads/2025/12/Ideaflow.png',
      'https://aztechmea.com/wp-content/uploads/2025/12/1-1-scaled.png',
      'https://aztechmea.com/wp-content/uploads/2025/12/2-1-scaled-1.png',
      'https://aztechmea.com/wp-content/uploads/2025/12/4-scaled.png',
      'https://aztechmea.com/wp-content/uploads/2025/12/5-scaled-1.png',
    ],
    description: 'The Aztech Ideaflow 98" is a large-format 4K UHD interactive flat panel display powered by Android 14, featuring a built-in 48MP AI camera, DLED backlight, 8GB RAM, and 128GB storage — designed for immersive collaboration in large classrooms and conference rooms.',
    shortDescription: '4K UHD DLED | Android 14 | 8GB+128GB | 48MP AI Camera | BT 5.2 | 400 nits | 98"',
    specs: [
      { key: 'Screen Size',          value: '98 inches' },
      { key: 'Backlight',            value: 'DLED' },
      { key: 'Resolution',           value: '3840×2160 (4K UHD)' },
      { key: 'Brightness',           value: '400 cd/m²' },
      { key: 'Contrast',             value: '1200:1' },
      { key: 'Refresh Rate',         value: '60Hz' },
      { key: 'Response Time',        value: '8ms' },
      { key: 'Color Gamut',          value: '72% NTSC' },
      { key: 'Viewing Angle',        value: '178°/178°' },
      { key: 'Pixel Pitch',          value: '0.56×0.56 mm' },
      { key: 'Surface Hardness',     value: '9H (7 on the Mohs scale)' },
      { key: 'Lifespan',             value: '50,000 hours' },
      { key: 'RAM / Storage',        value: '8GB + 128GB' },
      { key: 'Operating System',     value: 'Android 14' },
      { key: 'Bluetooth',            value: '5.2' },
    ],
  },
  {
    name: 'Aztech Ideaflow Elite 110" 4K Interactive Display',
    slug: 'aztech-ideaflow-elite-110-4k-interactive-display',
    category: 'IFP',
    tags: ['interactive display', 'ifpd', '4k', 'aztech', 'ideaflow elite', '110 inch'],
    featured: false,
    images: [
      'https://aztechmea.com/wp-content/uploads/2025/12/Ideaflow.png',
      'https://aztechmea.com/wp-content/uploads/2025/12/1-1-scaled.png',
      'https://aztechmea.com/wp-content/uploads/2025/12/2-1-scaled-1.png',
      'https://aztechmea.com/wp-content/uploads/2025/12/4-scaled.png',
      'https://aztechmea.com/wp-content/uploads/2025/12/5-scaled-1.png',
    ],
    description: 'The Aztech Ideaflow Elite 110" is a flagship large-format interactive display featuring a BOE IPS panel, RK3588 octa-core processor, Android 15, 16GB RAM, 256GB storage, 50MP AI camera with 100.6° FOV, 8-mic array, Wi-Fi 6, and 40-point IR touch — built for large boardrooms and auditoriums.',
    shortDescription: '110" IPS 4K | Android 15 | 16GB+256GB | 50MP AI Camera | WiFi 6 | BT 5.0 | 400 nits | RK3588',
    specs: [
      { key: 'Screen Size',          value: '110 inches' },
      { key: 'Panel Type',           value: 'IPS (BOE)' },
      { key: 'Backlight',            value: 'DLED' },
      { key: 'Resolution',           value: '3840×2160 (4K UHD)' },
      { key: 'Brightness',           value: '400 nits' },
      { key: 'Contrast Ratio',       value: '1200:1 (IPS) / 4000:1 (VA)' },
      { key: 'Refresh Rate',         value: '60Hz' },
      { key: 'Response Time',        value: '≤8ms' },
      { key: 'Color Gamut',          value: '72% NTSC' },
      { key: 'Viewing Angle',        value: '178°/178°' },
      { key: 'Pixel Pitch',          value: '0.4935×0.4935 mm' },
      { key: 'Panel Surface',        value: 'Anti-Glare (AG)' },
      { key: 'Cover Glass',          value: '4mm' },
      { key: 'Touch Points',         value: '40 points (IR)' },
      { key: 'Touch Response',       value: '≤8ms' },
      { key: 'SOC',                  value: 'RK3588' },
      { key: 'CPU',                  value: 'A76×4 (2.4GHz) + A55×4 (1.8GHz)' },
      { key: 'GPU',                  value: 'Mali G610' },
      { key: 'Operating System',     value: 'Android 15' },
      { key: 'RAM / Storage',        value: '16GB + 256GB' },
      { key: 'Camera',               value: '50MP, FOV 100.6°, with video AI' },
      { key: 'Microphone',           value: '8-mic array with audio AI' },
      { key: 'Speaker',              value: '2.1 channels, 2×20W' },
      { key: 'Wi-Fi',                value: 'Wi-Fi 6' },
      { key: 'Bluetooth',            value: '5.0' },
      { key: 'Ports (Back)',         value: 'HDMI 2.0 in, USB 3.0, USB 2.0, Type-C, VGA, RJ45, RS232, HDMI out, MIC in, AUDIO out, SPDIF, TF card, OPS' },
      { key: 'Ports (Front)',        value: '2× USB 3.0, Type-C (15W charging), Touch USB, HDMI in' },
      { key: 'Power',                value: 'AC 100–240V, standby <0.5W' },
      { key: 'Operating Temp',       value: '0°C – 40°C' },
      { key: 'Gross Weight',         value: '~110 kg' },
    ],
  },
];

export async function GET() {
  try {
    await connectDB();

    const brand = await Brand.findOne({ slug: 'aztech' });
    if (!brand) return NextResponse.json({ error: 'aztech brand not found' }, { status: 404 });

    const results = [];
    for (const p of products) {
      const doc = { ...p, brand: brand._id, brandSlug: 'aztech' };
      const result = await Product.findOneAndUpdate(
        { slug: p.slug },
        { $set: doc, $unset: { sku: '' } },
        { upsert: true, returnDocument: 'after' }
      );
      results.push({ slug: result.slug, name: result.name });
    }

    return NextResponse.json({ ok: true, inserted: results.length, products: results });
  } catch (err: unknown) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

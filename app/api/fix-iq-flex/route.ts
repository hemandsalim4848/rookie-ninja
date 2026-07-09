import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

const ProductSchema = new mongoose.Schema({
  slug: String, name: String, category: String,
  description: String, shortDescription: String,
  specs: [{ key: String, value: String }],
}, { strict: false });

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(MONGODB_URI);
}

export async function GET() {
  try {
    await connectDB();
    const result = await Product.findOneAndUpdate(
      { slug: 'contex-iq-flex' },
      {
        $set: {
          category:         'Wide Format Scanners',
          description:      'The Contex IQ FLEX is a large-format flatbed scanner designed for scanning fragile, irregular, or oversized originals safely and accurately. Ideal for books, artworks, textiles, maps, and delicate archival materials — it transforms challenging originals into high-quality digital content with flexibility and precision.',
          shortDescription: 'Large-format flatbed scanner\n1200 dpi optical resolution\nScan in 6 seconds at 200 dpi RGB\nCIS technology\nIdeal for books, art, textiles & maps\nWi-Fi, Ethernet & USB connectivity\nNeximage software compatible',
          specs: [
            { key: 'Technology',         value: 'CIS' },
            { key: 'Optical Resolution', value: '1200 dpi' },
            { key: 'Scan Speed',         value: '6 seconds full area (200 dpi RGB)' },
            { key: 'Scan Area',          value: 'A2/C — extendable to A1/D via stitching' },
            { key: 'Connectivity',       value: 'Wi-Fi, Ethernet, USB' },
            { key: 'Output Formats',     value: 'PDF, TIFF, JPG' },
            { key: 'Power',              value: 'Energy Star compliant, low standby' },
            { key: 'Controller',         value: '7-inch multi-touch embedded display' },
            { key: 'Included Software',  value: 'Nextimage compatible' },
            { key: 'Use Cases',          value: 'Books, art, textiles, maps, archival' },
          ],
        },
      },
      { returnDocument: 'after' }
    );
    if (!result) return NextResponse.json({ error: 'contex-iq-flex not found' }, { status: 404 });
    return NextResponse.json({ success: true, name: result.name, category: result.category });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

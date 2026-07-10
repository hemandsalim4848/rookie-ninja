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
    name: 'AZTECH 201 Soundbar with Wired Subwoofer',
    slug: 'aztech-201-soundbar-with-wired-subwoofer',
    category: 'Soundbars',
    tags: ['soundbar', 'subwoofer', '2.1 channel', 'bluetooth', 'hdmi arc', 'aztech'],
    featured: false,
    images: [
      'https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Soundbar-2.1-01.jpg',
      'https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Soundbar-2.1-02.jpg',
      'https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Soundbar-2.1-03.jpg',
      'https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Soundbar-2.1-04.jpg',
    ],
    description: 'The AZTECH 201 Soundbar with Wired Subwoofer delivers an exceptional audio experience with powerful 120W output and 2.1 channel sound. Designed to enhance your movies, music, and news listening, it features deep bass and three adjustable EQ modes for tailored sound. With Bluetooth 5.3, you can easily connect your devices wirelessly, while the HDMI (ARC) support ensures seamless integration with your TV. The included master control provides easy management of audio settings, making the AZTECH 201 Soundbar the perfect choice for immersive home entertainment.',
    shortDescription: [
      '120W Power Output',
      '2.1 Channel Sound',
      'Deep Bass',
      '3 EQ Modes (Movie, Music, News)',
      'Bluetooth 5.3',
      'HDMI (ARC) Support',
      'Remote Controller Included',
    ].join('\n'),
    specs: [
      { key: 'Channels',      value: '2.1' },
      { key: 'Speakers',      value: '3' },
      { key: 'Power',         value: '120W' },
      { key: 'Subwoofer',     value: 'Wired Subwoofer' },
      { key: 'Connectivity',  value: 'HDMI (ARC), Optical, Bluetooth 5.3, AUX, USB' },
      { key: 'EQ Modes',      value: 'Movie, Music, News' },
      { key: 'Accessory',     value: 'Remote Controller' },
    ],
  },
  {
    name: 'AZTECH 501 Soundbar with Wired Subwoofer',
    slug: 'aztech-501-soundbar-with-wired-subwoofer',
    category: 'Soundbars',
    tags: ['soundbar', 'subwoofer', '5.1 channel', 'bluetooth', 'hdmi arc', 'dolby audio', 'aztech'],
    featured: false,
    images: [
      'https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Soundbar-5.1-01.jpg',
      'https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Soundbar-5.1-02.jpg',
      'https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Soundbar-5.1-03.jpg',
    ],
    description: 'The AZTECH 501 is a 5.1 channel soundbar featuring a wired subwoofer and delivering an impressive 230 Watts of sound power. Designed for audiophiles and movie enthusiasts alike, this soundbar enhances your TV\'s audio with rich surround sound, deep bass, and crystal-clear sound. Whether you\'re watching movies, playing music, or tuning into the news, this versatile sound system offers preset audio modes for optimized listening experiences.',
    shortDescription: [
      '230W Power Output',
      '5.1 Channel Surround Sound',
      'Dolby Audio with Wired Subwoofer',
      '3 EQ Modes (Movie, Music, News)',
      'Bluetooth 5.3',
      'HDMI (ARC) Support',
      'LED Display & Remote Controller',
    ].join('\n'),
    specs: [
      { key: 'Channels',      value: '5.1' },
      { key: 'Speakers',      value: '4' },
      { key: 'Power',         value: '230W' },
      { key: 'Audio Output',  value: 'Dolby Audio, Wired Subwoofer' },
      { key: 'Connectivity',  value: 'HDMI (ARC), Optical, Bluetooth 5.3, AUX, USB' },
      { key: 'EQ Modes',      value: 'Movie, Music, News' },
      { key: 'Display',       value: 'LED Display' },
      { key: 'Accessory',     value: 'Remote Controller' },
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

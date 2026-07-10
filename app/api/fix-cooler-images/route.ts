import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI!);
}

const updates = [
  {
    slug: 'aztech-360mm-white-liquid-cooler',
    images: [
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1783682143/aztech-aztech-360mm-white-liquid-cooler-0-360white-2.webp',
    ],
  },
  {
    slug: 'aztech-240mm-white-liquid-cooler',
    images: [
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1783682144/aztech-aztech-240mm-white-liquid-cooler-0-240white-3.webp',
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1783682146/aztech-aztech-240mm-white-liquid-cooler-1-240white-2.webp',
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1783682148/aztech-aztech-240mm-white-liquid-cooler-2-240white1-scaled.webp',
    ],
  },
  {
    slug: 'aztech-240mm-black-liquid-cooler',
    images: [
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1783682151/aztech-aztech-240mm-black-liquid-cooler-0-240black-3.webp',
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1783682154/aztech-aztech-240mm-black-liquid-cooler-1-240-black1--scaled.webp',
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1783682155/aztech-aztech-240mm-black-liquid-cooler-2-240black-2.webp',
    ],
  },
  // Also fix 360mm black to include all images (production only has 1)
  {
    slug: 'aztech-360mm-black-liquid-cooler',
    images: [
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1783682137/aztech-aztech-360mm-black-liquid-cooler-0-360black2.webp',
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1783682138/aztech-aztech-360mm-black-liquid-cooler-1-360black1-scaled.webp',
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1783682140/aztech-aztech-360mm-black-liquid-cooler-2-360black-3.webp',
    ],
  },
];

export async function GET() {
  try {
    await connectDB();
    const db = mongoose.connection.db!;
    const results = [];

    for (const { slug, images } of updates) {
      const r = await db.collection('products').updateOne({ slug }, { $set: { images } });
      results.push({ slug, matched: r.matchedCount, modified: r.modifiedCount });
    }

    return NextResponse.json({ ok: true, results });
  } catch (err: unknown) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

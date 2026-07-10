import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(MONGODB_URI);
}

const brightDesc = [
  '8 Core (A55×8, 1.2GHz)',
  'High-Quality DLED Display',
  '4K UHD Resolution (3840 × 2160 pixels)',
  'Built-in 48MP AI Camera & Microphone',
  'Seamless Screen Mirroring',
  'Fluent Writing Experience',
  'Scan To Transfer',
  'Android 14 Operating System',
  'BYOM (Bring Your Own Meeting)',
].join('\n');

const ideaflow98Desc = [
  '8 Core (A55×8, 1.2GHz)',
  'High-Quality DLED Display',
  '4K UHD Resolution (3840 × 2160 pixels)',
  'Built-in 48MP AI Camera & Microphone',
  'Seamless Screen Mirroring',
  'Fluent Writing Experience',
  'Scan To Transfer',
  'Android 14 Operating System',
  'BYOD (Bring Your Own Device)',
].join('\n');

const elite110Desc = [
  'Fluent Writing Experience',
  'Built-in 50MP AI Camera & Microphone',
  'BYOM (Bring Your Own Meeting)',
  'Infinite Detail — 4K UHD IPS Panel',
  'Seamless Screen Mirroring',
  'Scan To Transfer',
  'Android 15 | 16GB RAM | 256GB Storage',
].join('\n');

const updates = [
  { slug: 'aztech-ideaflow-bright-55-4k-interactive-display', shortDescription: brightDesc },
  { slug: 'aztech-ideaflow-bright-65-4k-interactive-display', shortDescription: brightDesc },
  { slug: 'aztech-ideaflow-bright-75-4k-interactive-display', shortDescription: brightDesc },
  { slug: 'aztech-ideaflow-bright-86-4k-interactive-display', shortDescription: brightDesc },
  { slug: 'aztech-ideaflow-98-4k-interactive-display',        shortDescription: ideaflow98Desc },
  { slug: 'aztech-ideaflow-elite-110-4k-interactive-display', shortDescription: elite110Desc },
];

export async function GET() {
  try {
    await connectDB();
    const db = mongoose.connection.db!;
    const results = [];

    for (const u of updates) {
      const r = await db.collection('products').updateOne(
        { slug: u.slug },
        { $set: { shortDescription: u.shortDescription } }
      );
      results.push({ slug: u.slug, matched: r.matchedCount, modified: r.modifiedCount });
    }

    return NextResponse.json({ ok: true, results });
  } catch (err: unknown) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

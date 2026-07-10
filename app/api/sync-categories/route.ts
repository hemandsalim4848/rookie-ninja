import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI!);
}

const categoriesToEnsure = [
  'Air Coolers',
  'Audio',
  'Cables & Chargers',
  'Cases',
  'Gaming Peripherals',
  'Power Extensions',
];

export async function GET() {
  try {
    await connectDB();
    const db = mongoose.connection.db!;
    const results = [];

    for (const name of categoriesToEnsure) {
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const existing = await db.collection('categories').findOne({ name });
      if (existing) {
        results.push({ name, status: 'already exists' });
      } else {
        await db.collection('categories').insertOne({
          name,
          slug,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        results.push({ name, status: 'created' });
      }
    }

    return NextResponse.json({ ok: true, results });
  } catch (err: unknown) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

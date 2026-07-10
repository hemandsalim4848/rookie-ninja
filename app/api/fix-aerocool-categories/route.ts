import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI!);
}

const airCoolerNames = [
  'Aerocool Air Cooler Cylon 4F ARGB PWM 4P - Black',
  'Aerocool Air Cooler Cylon 4F ARGB PWM 4P - White',
];

const caseNames = [
  'AeroCool B508A Flow-G-BK-v1',
  'AeroCool B508A Flow-G-WT-v1',
  'AeroCool B509A Flow-G-BK-v1',
  'AeroCool B509A Flow-G-WT-v1',
  'Aerocool Case  B507F-G ARGB 4 / ATX / Micro / Mini ATX - TYPE C',
  'Aerocool Case Beam-G-BK-v2 - ATX',
  'Aerocool Case Designer-G-BK-V2 -ARGB 4 / ATX / Micro / Mini ATX',
  'Aerocool Case Dryft-G-BK-v2 - ATX / Micro / Mini ITX',
  'Aerocool Case P500C-G-BK-v1',
  'Aerocool Case P500C-G-WT-v1',
];

export async function GET() {
  try {
    await connectDB();
    const db = mongoose.connection.db!;

    // Ensure categories exist
    for (const name of ['Air Coolers', 'Cases']) {
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const existing = await db.collection('categories').findOne({ name });
      if (!existing) {
        await db.collection('categories').insertOne({ name, slug, createdAt: new Date(), updatedAt: new Date() });
      }
    }

    // Move air coolers
    const airResult = await db.collection('products').updateMany(
      { name: { $in: airCoolerNames } },
      { $set: { category: 'Air Coolers' } }
    );

    // Move cases
    const caseResult = await db.collection('products').updateMany(
      { name: { $in: caseNames } },
      { $set: { category: 'Cases' } }
    );

    return NextResponse.json({
      ok: true,
      airCoolers: { matched: airResult.matchedCount, modified: airResult.modifiedCount },
      cases: { matched: caseResult.matchedCount, modified: caseResult.modifiedCount },
    });
  } catch (err: unknown) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

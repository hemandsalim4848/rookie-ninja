import { NextResponse } from 'next/server'
import { connectDB } from '@/src/lib/mongodb'
import { Product } from '@/src/lib/models/Products'

const RENAMES: Record<string, string> = {
  'Softwares':          'Software',
  'Printer':            'Printers',
  'Motherboard':        'Motherboards',
  'Interactive Display':'Interactive Displays',
  'Projector':          'Projectors',
  'Power Supply Unit':  'Power Supply Units',
  'Document Scanner':   'Document Scanners',
}

export async function GET() {
  await connectDB()
  const results: Record<string, number> = {}

  for (const [from, to] of Object.entries(RENAMES)) {
    const res = await Product.updateMany({ category: from }, { $set: { category: to } })
    results[`${from} → ${to}`] = res.modifiedCount
  }

  return NextResponse.json({ success: true, results })
}

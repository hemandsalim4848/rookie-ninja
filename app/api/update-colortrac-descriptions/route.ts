import { NextResponse } from 'next/server'
import { connectDB } from '@/src/lib/mongodb'
import { Product } from '@/src/lib/models/Products'

const updates: Record<string, string> = {
  'smartlf-sci-25': [
    '25" wide format | SingleSensor™ technology',
    'Vibrant colour with excellent size accuracy',
    'Perfect for engineering, construction, maps & plans',
    'SUREDRIVE soft-roller for even media pressure',
    'FADGI ★★★ 3-star rating with SmartWorks Imaging',
    'Designed for high volume, low maintenance',
    'ENERGY STAR® compliant',
  ].join('\n'),

  'smartlf-sci-25-professional-mfp-solution': [
    '25" wide format MFP | Copy, scan & print',
    'Handles CAD drawings & colour office documents',
    'SingleSensor™ technology for large format quality',
    'SUREDRIVE soft-roller for even media pressure',
    'FADGI ★★★ 3-star rating with SmartWorks Imaging',
    'Designed for high volume, low maintenance',
    'ENERGY STAR® compliant',
  ].join('\n'),

  'smartlf-sci-36': [
    '36" wide format | SingleSensor™ technology',
    'Vibrant colour with excellent size accuracy',
    'Perfect for engineering, construction, maps & plans',
    'SUREDRIVE soft-roller for even media pressure',
    'FADGI ★★★ 3-star rating with SmartWorks Imaging',
    'Designed for high volume, low maintenance',
    'ENERGY STAR® compliant',
  ].join('\n'),

  'smartlf-sci-36-professional-mfp-solution': [
    '36" wide format MFP | Copy, scan & print',
    'Handles CAD drawings & colour office documents',
    'SingleSensor™ technology for large format quality',
    'SUREDRIVE soft-roller for even media pressure',
    'FADGI ★★★ 3-star rating with SmartWorks Imaging',
    'Designed for high volume, low maintenance',
    'ENERGY STAR® compliant',
  ].join('\n'),

  'smartlf-sci-42': [
    '42" wide format | SingleSensor™ technology',
    'Vibrant colour with excellent size accuracy',
    'Perfect for engineering, construction, maps & plans',
    'SUREDRIVE soft-roller for even media pressure',
    'FADGI ★★★ 3-star rating with SmartWorks Imaging',
    'Designed for high volume, low maintenance',
    'ENERGY STAR® compliant',
  ].join('\n'),

  'smartlf-sci-42-professional-mfp-solution': [
    '42" wide format MFP | Copy, scan & print',
    'Handles CAD drawings & colour office documents',
    'SingleSensor™ technology for large format quality',
    'SUREDRIVE soft-roller for even media pressure',
    'FADGI ★★★ 3-star rating with SmartWorks Imaging',
    'Designed for high volume, low maintenance',
    'ENERGY STAR® compliant',
  ].join('\n'),

  'smartlf-sgi': [
    'Available in 36" & 44" widths',
    'Accepts thick media up to 15mm',
    'Realistic colour with excellent size accuracy',
    'Suitable for any document type',
    'FADGI ★★★ 3-star rating with SmartWorks Imaging',
    'Designed for high volume, low maintenance',
    'ENERGY STAR® compliant',
  ].join('\n'),

  'smartlf-scan': [
    'Portable wide format scanner | No PC required',
    'Available in 24" & 36" — up to A0/E size',
    'Scan to USB, internal memory or PC',
    'Designed for technical drawings in live projects',
    'Supports collaboration and easy file sharing',
    'Requires no software or peripherals to operate',
    'ENERGY STAR® compliant',
  ].join('\n'),
}

export async function GET() {
  await connectDB()
  const results = []

  for (const [slug, shortDescription] of Object.entries(updates)) {
    const res = await Product.updateOne(
      { brandSlug: 'colortrac', slug },
      { $set: { shortDescription } }
    )
    results.push({ slug, updated: res.modifiedCount > 0 })
  }

  return NextResponse.json({ total: results.length, results })
}

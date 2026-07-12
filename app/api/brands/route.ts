import { NextResponse } from 'next/server'
import { connectDB } from '@/src/lib/mongodb'
import { Brand } from '@/src/lib/models/Brands'

export async function GET() {
  try {
    await connectDB()
    const brands = await Brand.find().sort({ name: 1 })
    return NextResponse.json(brands)
  } catch (err: any) {
    console.error('BRANDS ERROR:', err.message)
    return NextResponse.json({ error: 'Failed to fetch brands' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    await connectDB()
    const body = await req.json()
    const brand = await Brand.create(body)
    return NextResponse.json(brand, { status: 201 })
  } catch (err: any) {
    console.error('POST ERROR:', err.message)
    return NextResponse.json({ error: 'Failed to create brand' }, { status: 500 })
  }
}
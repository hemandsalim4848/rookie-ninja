import { NextResponse } from 'next/server'
import { connectDB } from '@/src/lib/mongodb'
import { User } from '@/src/lib/models/User'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  try {
    const { name, email, password, role, secret } = await req.json()

    // Protect this route with a secret
    if (secret !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    const existing = await User.findOne({ email })
    if (existing) return NextResponse.json({ error: 'User already exists' }, { status: 400 })

    const hashed = await bcrypt.hash(password, 12)
    const user = await User.create({ name, email, password: hashed, role })
    return NextResponse.json({ success: true, user: { name: user.name, email: user.email, role: user.role } })
  } catch (err: any) {
    console.error('REGISTER ERROR:', err.message)
    return NextResponse.json({ error: 'Failed to register user' }, { status: 500 })
  }
}
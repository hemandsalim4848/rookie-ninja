import CredentialsProvider from 'next-auth/providers/credentials'
import { connectDB } from '@/src/lib/mongodb'
import { User } from '@/src/lib/models/User'
import bcrypt from 'bcryptjs'
import type { NextAuthOptions } from 'next-auth'

// In-memory per-instance limiter — resets on cold start / across serverless
// instances, so it's a speed bump against brute-forcing the one admin
// password, not a hard guarantee. This is the only login in the whole app.
const loginAttempts = new Map<string, number[]>()
const RATE_LIMIT = 5
const RATE_WINDOW_MS = 10 * 60 * 1000

function isRateLimited(ip: string) {
  const now = Date.now()
  const timestamps = (loginAttempts.get(ip) || []).filter(t => now - t < RATE_WINDOW_MS)
  timestamps.push(now)
  loginAttempts.set(ip, timestamps)
  return timestamps.length > RATE_LIMIT
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email:    { label: 'Email',    type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null

        const forwardedFor = req?.headers?.['x-forwarded-for']
        const ip = (Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor)?.split(',')[0]?.trim() || 'unknown'
        if (isRateLimited(ip)) {
          throw new Error('Too many login attempts. Please try again later.')
        }

        await connectDB()
        const user = await User.findOne({ email: credentials.email })
        if (!user) return null
        const isValid = await bcrypt.compare(credentials.password, user.password)
        if (!isValid) return null
        return {
          id:    user._id.toString(),
          name:  user.name,
          email: user.email,
        }
      },
    }),
  ],
  pages: {
  signIn: '/login',
},
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
}
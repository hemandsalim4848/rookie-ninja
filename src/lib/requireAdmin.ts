import { getServerSession } from 'next-auth'
import { authOptions } from '@/src/lib/auth'

// There's no account-creation route or role field anymore - the only User
// document that can ever exist is the one admin account, created directly in
// MongoDB. So "a session exists" and "this is the admin" are equivalent here.
export async function requireAdmin() {
  const session = await getServerSession(authOptions)
  return session ?? null
}

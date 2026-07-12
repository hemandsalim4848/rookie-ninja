import { getServerSession } from 'next-auth'
import { authOptions } from '@/src/lib/auth'

export async function requireAdmin() {
  const session = await getServerSession(authOptions)
  return session ?? null
}

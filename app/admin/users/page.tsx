import { getServerSession } from 'next-auth'
import { authOptions } from '@/src/lib/auth'
import { redirect } from 'next/navigation'

export default async function UsersPage() {
  const session = await getServerSession(authOptions)
  if ((session?.user as any)?.role !== 'admin') redirect('/admin')

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Users</h1>
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <p className="text-gray-500 text-sm mb-6">
          To create a new user, send a POST request to <code className="bg-gray-100 px-2 py-1 rounded">/api/auth/register</code> with your admin secret.
        </p>
        <pre className="bg-gray-50 rounded-lg p-4 text-xs overflow-x-auto">
{`fetch('/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Staff Name',
    email: 'staff@rookie-ninja.com',
    password: 'password123',
    role: 'user',
    secret: 'YOUR_ADMIN_SECRET'
  })
})`}
        </pre>
      </div>
    </div>
  )
}
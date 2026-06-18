import { getServerSession } from 'next-auth'
import { authOptions } from '@/src/lib/auth'
import { redirect } from 'next/navigation'
import AdminSidebar from '@/src/components/admin/AdminSidebar'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const role = (session.user as any).role

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar role={role} user={session.user} />
      <div className="flex-1 min-w-0">
        <div className="max-w-6xl mx-auto px-8 py-10">
          {children}
        </div>
      </div>
    </div>
  )
}
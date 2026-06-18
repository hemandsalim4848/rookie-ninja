import Link from 'next/link'
import { connectDB } from '@/src/lib/mongodb'
import { Brand } from '@/src/lib/models/Brands'
import { Product } from '@/src/lib/models/Products'

export default async function AdminDashboard() {
  await connectDB()
  const [brandCount, productCount] = await Promise.all([
    Brand.countDocuments(),
    Product.countDocuments(),
  ])

  const stats = [
    { label: 'Total Brands', value: brandCount, href: '/admin/brands', color: 'bg-[#15A7DC]/10 text-[#15A7DC]' },
    { label: 'Total Products', value: productCount, href: '/admin/products', color: 'bg-emerald-50 text-emerald-600' },
  ]

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-[#0A1628]">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Welcome back. Here's what's going on.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
        {stats.map(stat => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white rounded-2xl border border-gray-100 p-6 hover:border-[#15A7DC]/30 hover:shadow-[0_4px_20px_rgba(21,167,220,0.08)] transition-all group"
          >
            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl text-lg mb-4 ${stat.color}`}>
              {stat.label.includes('Brand') ? '🏷️' : '📦'}
            </div>
            <p className="text-3xl font-bold text-[#0A1628] mb-1">{stat.value}</p>
            <p className="text-sm text-gray-400">{stat.label}</p>
            <p className="text-xs text-[#15A7DC] mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
              View all →
            </p>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="text-sm font-semibold text-[#0A1628] mb-4">Quick Actions</h2>
        <div className="flex gap-3 flex-wrap">
          <Link href="/admin/brands"
            className="text-sm bg-[#0A1628] text-white px-4 py-2 rounded-lg hover:bg-[#0F2040] transition-colors">
            + Add Brand
          </Link>
          <Link href="/admin/products"
            className="text-sm bg-[#0A1628] text-white px-4 py-2 rounded-lg hover:bg-[#0F2040] transition-colors">
            + Add Product
          </Link>
          <Link href="/catalogue" target="_blank"
            className="text-sm border border-gray-200 text-gray-600 px-4 py-2 rounded-lg hover:border-[#15A7DC] hover:text-[#15A7DC] transition-colors">
            View Catalogue ↗
          </Link>
        </div>
      </div>
    </div>
  )
}
import Link from 'next/link'
import { connectDB } from '@/src/lib/mongodb'
import { Brand } from '@/src/lib/models/Brands'
import { Product } from '@/src/lib/models/Products'
import { cld } from '@/src/lib/cloudinaryUrl'


export default async function AdminDashboard() {
  await connectDB()
  const [brandCount, productCount, featuredCount, withDownloads] = await Promise.all([
    Brand.countDocuments(),
    Product.countDocuments(),
    Product.countDocuments({ featured: true }),
    Product.countDocuments({ 'downloads.0': { $exists: true } }),
  ])

  const recentProducts = await Product.find().sort({ createdAt: -1 }).limit(5).select('name brandSlug slug images createdAt')

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0A1628]">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Welcome back. Here's an overview of your catalogue.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Brands', value: brandCount, href: '/admin/brands', icon: '🏷️', color: 'bg-[#15A7DC]/10 text-[#15A7DC]' },
          { label: 'Total Products', value: productCount, href: '/admin/products/browse', icon: '📦', color: 'bg-violet-50 text-violet-500' },
          { label: 'Featured', value: featuredCount, href: '/admin/products/browse', icon: '⭐', color: 'bg-amber-50 text-amber-500' },
          { label: 'With Datasheets', value: withDownloads, href: '/admin/products/browse', icon: '📄', color: 'bg-emerald-50 text-emerald-500' },
        ].map(stat => (
          <Link key={stat.label} href={stat.href}
            className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-[#15A7DC]/30 hover:shadow-[0_4px_20px_rgba(21,167,220,0.08)] transition-all group">
            <div className={`inline-flex items-center justify-center w-9 h-9 rounded-xl text-base mb-3 ${stat.color}`}>
              {stat.icon}
            </div>
            <p className="text-2xl font-bold text-[#0A1628] mb-0.5">{stat.value}</p>
            <p className="text-xs text-gray-400">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Recent products */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 h-fit">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-semibold text-[#0A1628]">Recently Added</h2>
            <Link href="/admin/products/browse" className="text-xs text-[#15A7DC] hover:underline">View all →</Link>
          </div>
          <div className="space-y-3">
            {recentProducts.map((p: any) => (
              <div key={p._id} className="flex items-center gap-3">
                {p.images?.[0] ? (
                  <img src={cld(p.images[0])} alt="" className="w-9 h-9 rounded-lg object-cover border border-gray-100 shrink-0" />
                ) : (
                  <div className="w-9 h-9 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-sm shrink-0">📦</div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-[#0A1628] truncate">{p.name}</p>
                  <p className="text-[10px] text-gray-400 capitalize">{p.brandSlug}</p>
                </div>
                <Link href={`/${p.brandSlug}/${p.slug}`} target="_blank"
                  className="text-[10px] text-gray-300 hover:text-[#15A7DC] transition-colors shrink-0">View ↗</Link>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 h-fit">
          <h2 className="text-sm font-semibold text-[#0A1628] mb-4">Quick Actions</h2>
          <div className="flex flex-col gap-2">
            <Link href="/admin/products"
              className="flex items-center gap-2.5 w-full bg-[#0A1628] hover:bg-[#0F2040] text-white px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors">
              <span>+</span> Add Product
            </Link>
            <Link href="/admin/brands"
              className="flex items-center gap-2.5 w-full border border-gray-200 hover:border-[#15A7DC] hover:text-[#15A7DC] text-gray-600 px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors">
              <span>+</span> Add Brand
            </Link>
            <Link href="/admin/products/browse"
              className="flex items-center gap-2.5 w-full border border-gray-200 hover:border-[#15A7DC] hover:text-[#15A7DC] text-gray-600 px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors">
              Browse Products
            </Link>
            <Link href="/catalogue" target="_blank"
              className="flex items-center gap-2.5 w-full border border-gray-200 hover:border-[#15A7DC] hover:text-[#15A7DC] text-gray-600 px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors">
              View Catalogue ↗
            </Link>
          </div>
        </div>


      </div>
    </div>
  )
}

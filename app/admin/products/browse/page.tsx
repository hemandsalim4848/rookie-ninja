'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { cld } from '@/src/lib/cloudinaryUrl'

export default function ProductsBrowsePage() {
  const [brands, setBrands] = useState<any[]>([])
  const [counts, setCounts] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [bRes, pRes] = await Promise.all([fetch('/api/brands'), fetch('/api/products')])
      const brandsData = await bRes.json()
      const productsData = await pRes.json()
      const brandList = Array.isArray(brandsData) ? brandsData : []
      const productList = Array.isArray(productsData) ? productsData : []
      const countMap: Record<string, number> = {}
      for (const p of productList) {
        countMap[p.brandSlug] = (countMap[p.brandSlug] || 0) + 1
      }
      setBrands(brandList)
      setCounts(countMap)
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <p className="text-gray-400 text-sm">Loading...</p>

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0A1628]">Products</h1>
        <p className="text-gray-400 text-sm mt-1">Select a brand to view and manage its products.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {brands.map(brand => (
          <Link
            key={brand._id}
            href={`/admin/products/browse/${brand.slug}`}
            className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-[#15A7DC] hover:shadow-sm transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              {brand.logo ? (
                <img src={cld(brand.logo)} alt={brand.name} className="h-8 object-contain" />
              ) : (
                <div className="w-10 h-10 rounded-xl bg-[#0A1628]/5 flex items-center justify-center text-[#0A1628] font-bold text-sm">
                  {brand.name[0]}
                </div>
              )}
              <span className="text-xs text-gray-400 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-full">
                {counts[brand.slug] || 0} products
              </span>
            </div>
            <p className="font-semibold text-[#0A1628] group-hover:text-[#15A7DC] transition-colors">
              {brand.name}
            </p>
            {brand.country && (
              <p className="text-xs text-gray-400 mt-1">{brand.country}</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}

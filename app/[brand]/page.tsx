'use client'

import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import { useParams } from 'next/navigation'

const PAGE_SIZE = 16

export default function BrandPage() {
  const params = useParams()
  const brandSlug = params.brand as string

  const [brand, setBrand] = useState<any>(null)
  const [products, setProducts] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function load() {
      try {
        const [brandsRes, productsRes] = await Promise.all([
          fetch('/api/brands'),
          fetch(`/api/products?brand=${brandSlug}`),
        ])
        const brandsData = await brandsRes.json()
        const productsData = await productsRes.json()
        const brands = Array.isArray(brandsData) ? brandsData : []
        const prods = Array.isArray(productsData) ? productsData : []
        setBrand(brands.find((b: any) => b.slug === brandSlug) || null)
        setProducts(prods)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [brandSlug])

const totalPages = Math.ceil(products.length / PAGE_SIZE)
const visibleProducts = products.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center text-[#0A1628]/40">
      Loading...
    </div>
  )

  if (!brand) return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-4">
      <p className="text-8xl font-bold text-[#0A1628]/10 mb-4">404</p>
      <h1 className="text-2xl font-bold text-[#0A1628] mb-2">Page Not Found</h1>
      <p className="text-gray-400 text-sm mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/"
        className="bg-[#0A1628] hover:bg-[#15A7DC] text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors"
      >
        Back to Home
      </Link>
    </main>
  )

  return (
    <main className="min-h-screen bg-white">

      {/* Hero Banner */}
      <div className="bg-[#0A1628] px-4 py-40 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(21,167,220,0.15) 0%, transparent 65%)' }}
        />
        <div className="relative z-10 max-w-2xl mx-auto">
          <Link
            href="/catalogue"
            className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-widest uppercase text-[#15A7DC] border border-[#15A7DC]/30 px-3 py-1 rounded-full mb-6 hover:bg-[#15A7DC]/10 transition-colors"
          >
            ← All Brands
          </Link>

          {brand?.logo && (
            <div className="flex justify-center mb-6">
              <div className="bg-white/10 rounded-2xl px-8 py-5">
                <img src={brand.logo} alt={brand.name} className="h-10 object-contain" />
              </div>
            </div>
          )}

          <p className="text-white/30 text-xs tracking-widest uppercase mb-3">
            Authorised Distributor · UAE & MEA
          </p>
          <h1 className="text-5xl font-bold text-white leading-tight mb-4">
            {brand?.name}
          </h1>
          {brand?.description && (
            <p className="text-white/40 text-base max-w-lg mx-auto leading-relaxed">
              {brand.description}
            </p>
          )}
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-[#0F2040] border-b border-white/6 px-4 py-3 flex items-center justify-center gap-8">
        <div className="text-sm text-white/40">
          <strong className="text-[#15A7DC] font-semibold mr-1">{products.length}</strong>Products
        </div>
        {brand?.country && (
          <div className="text-sm text-white/40">
            <strong className="text-[#15A7DC] font-semibold mr-1">{brand.country}</strong>Origin
          </div>
        )}
        <div className="text-sm text-white/40">
          <strong className="text-[#15A7DC] font-semibold mr-1">UAE</strong>Distribution
        </div>
      </div>

      {/* Products Grid */}
      <div ref={gridRef} className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-lg font-semibold text-[#0A1628]">All Products</h2>
           <p className="text-sm text-gray-400 mt-0.5">
  Page {currentPage} of {totalPages} · {products.length} products total
</p>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-5xl mb-4">📦</div>
            <p className="text-gray-400">No products listed for this brand yet.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {visibleProducts.map((product: any) => (
                <Link
                  key={product._id}
                  href={`/${brandSlug}/${product.slug}`}
                  className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-[#15A7DC]/50 hover:shadow-[0_4px_20px_rgba(21,167,220,0.1)] transition-all duration-200 group"
                >
                  {product.images?.[0] ? (
                    <div className="h-48 bg-white flex items-center justify-center p-2">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-48 bg-gray-50 flex items-center justify-center text-4xl">
                      📦
                    </div>
                  )}
                  <div className="p-4">
  <h3 className="font-semibold text-[#0A1628] text-sm leading-snug mb-2">
    {product.name}
  </h3>
  {product.category && (
    <span className="inline-block text-xs bg-[#15A7DC]/10 text-[#15A7DC] px-2 py-0.5 rounded-full mb-3">
      {product.category}
    </span>
  )}
  {product.shortDescription && (
    <ul className="space-y-1.5 mt-2">
      {product.shortDescription
        .split('\n')
        .map((l: string) => l.trim())
        .filter((l: string) => l.length > 2)
        .slice(0, 2)
        .map((line: string, i: number) => (
          <li key={i} className="flex items-start gap-2 text-xs text-[#0A1628]/50 leading-relaxed">
            <span className="w-1 h-1 rounded-full bg-[#15A7DC] mt-1.5 shrink-0" />
            {line}
          </li>
        ))
      }
    </ul>
  )}
</div>
                </Link>
              ))}
            </div>

           {/* Pagination */}
{totalPages > 1 && (
  <div className="flex items-center justify-center gap-2 mt-12">
    {/* Prev */}
    <button
      onClick={() => { setCurrentPage(p => p - 1); gridRef.current?.scrollIntoView({ behavior: 'smooth' }) }}
      disabled={currentPage === 1}
      className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-[#0A1628] hover:border-[#15A7DC] hover:text-[#15A7DC] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
    >
      ← Prev
    </button>

    {/* Page numbers */}
    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
      const showPage = page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1
      const showEllipsisBefore = page === currentPage - 2 && currentPage > 3
      const showEllipsisAfter = page === currentPage + 2 && currentPage < totalPages - 2

      if (showEllipsisBefore || showEllipsisAfter) {
        return <span key={page} className="px-1 text-gray-300">···</span>
      }
      if (!showPage) return null

      return (
        <button
          key={page}
          onClick={() => { setCurrentPage(page); gridRef.current?.scrollIntoView({ behavior: 'smooth' }) }}
          className={`w-10 h-10 rounded-xl text-sm font-medium transition-colors ${
            currentPage === page
              ? 'bg-[#15A7DC] text-white border border-[#15A7DC]'
              : 'border border-gray-200 text-[#0A1628] hover:border-[#15A7DC] hover:text-[#15A7DC]'
          }`}
        >
          {page}
        </button>
      )
    })}

    {/* Next */}
    <button
      onClick={() => { setCurrentPage(p => p + 1); gridRef.current?.scrollIntoView({ behavior: 'smooth' }) }}
      disabled={currentPage === totalPages}
      className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-[#0A1628] hover:border-[#15A7DC] hover:text-[#15A7DC] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
    >
      Next →
    </button>
  </div>
)}
          </>
        )}
      </div>
    </main>
  )
}

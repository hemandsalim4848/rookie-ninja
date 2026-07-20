'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { cld } from '@/src/lib/cloudinaryUrl'

const PAGE_SIZE = 16

function readParams() {
  const params = new URLSearchParams(window.location.search)
  return {
    category: params.get('category') || '',
    brand: params.get('brand') || '',
    page: Math.max(1, parseInt(params.get('page') || '1', 10)),
  }
}

export default function ProductsPageClient({
  products,
  brandNames,
}: {
  products: any[]
  brandNames: Record<string, string>
}) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const gridRef = useRef<HTMLDivElement>(null)
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || '')
  const [activeBrand, setActiveBrand] = useState(searchParams.get('brand') || '')
  const [currentPage, setCurrentPage] = useState(Math.max(1, parseInt(searchParams.get('page') || '1', 10)))

  // The browser's back/forward buttons can restore a URL whose search params
  // Next's useSearchParams() hook doesn't reflect (router cache staleness).
  // Listen to the native popstate event directly as a reliable fallback.
  useEffect(() => {
    function syncFromLocation() {
      const { category, brand, page } = readParams()
      setActiveCategory(category)
      setActiveBrand(brand)
      setCurrentPage(page)
    }
    window.addEventListener('popstate', syncFromLocation)
    return () => window.removeEventListener('popstate', syncFromLocation)
  }, [])

  function goToPage(page: number) {
    setCurrentPage(page)
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', String(page))
    router.push(`?${params.toString()}`, { scroll: false })
    gridRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const brandFilteredProducts = activeBrand
    ? products.filter((p: any) => p.brandSlug === activeBrand)
    : products

  const categories = Array.from(
    new Set(brandFilteredProducts.map((p: any) => p.category).filter(Boolean))
  ).sort() as string[]

  const brandSlugs = Array.from(
    new Set(products.map((p: any) => p.brandSlug).filter(Boolean))
  ).sort((a, b) => (brandNames[a] || a).localeCompare(brandNames[b] || b)) as string[]

  const brandCount = brandSlugs.length

  function selectCategory(cat: string) {
    setActiveCategory(cat)
    setCurrentPage(1)
    const params = new URLSearchParams(searchParams.toString())
    if (cat) {
      params.set('category', cat)
    } else {
      params.delete('category')
    }
    params.set('page', '1')
    router.push(`?${params.toString()}`, { scroll: false })
  }

  function selectBrand(brand: string) {
    setActiveBrand(brand)
    setActiveCategory('')
    setCurrentPage(1)
    const params = new URLSearchParams(searchParams.toString())
    if (brand) {
      params.set('brand', brand)
    } else {
      params.delete('brand')
    }
    params.delete('category')
    params.set('page', '1')
    router.push(`?${params.toString()}`, { scroll: false })
  }

  const filteredProducts = activeCategory
    ? brandFilteredProducts.filter((p: any) => p.category === activeCategory)
    : brandFilteredProducts

  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE)
  const visibleProducts = filteredProducts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  const headingParts = [activeBrand ? (brandNames[activeBrand] || activeBrand) : null, activeCategory || null].filter(Boolean)
  const heading = headingParts.length > 0 ? headingParts.join(' · ') : 'All Products'

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
            ← Browse by Brand
          </Link>

          <p className="text-white/30 text-xs tracking-widest uppercase mb-3">
            Authorised Distributor · UAE & MEA
          </p>
          <h1 className="text-5xl font-bold text-white leading-tight mb-4">
            All Products
          </h1>
          <p className="text-white/40 text-base max-w-lg mx-auto leading-relaxed">
            Browse our complete product range across every brand we distribute.
          </p>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-[#0F2040] border-b border-white/6 px-4 py-3 flex items-center justify-center gap-8">
        <div className="text-sm text-white/40">
          <strong className="text-[#15A7DC] font-semibold mr-1">{products.length}</strong>Products
        </div>
        <div className="text-sm text-white/40">
          <strong className="text-[#15A7DC] font-semibold mr-1">{brandCount}</strong>Brands
        </div>
        <div className="text-sm text-white/40">
          <strong className="text-[#15A7DC] font-semibold mr-1">UAE</strong>Distribution
        </div>
      </div>

      {/* Main content: sidebar + grid */}
      <div ref={gridRef} className="max-w-7xl mx-auto px-4 py-12 flex gap-8 items-start">

        {/* Sidebar */}
        <aside className="hidden md:block w-52 shrink-0 sticky top-6 space-y-6">
          {brandSlugs.length > 1 && (
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-[#0A1628]/30 mb-3 px-1">Brands</p>
              <ul className="space-y-0.5">
                <li>
                  <button
                    onClick={() => selectBrand('')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left ${
                      activeBrand === ''
                        ? 'bg-[#0A1628] text-white'
                        : 'text-[#0A1628]/60 hover:bg-gray-50 hover:text-[#0A1628]'
                    }`}
                  >
                    <span>All</span>
                    <span className={`text-xs font-semibold tabular-nums ${activeBrand === '' ? 'text-white/60' : 'text-[#0A1628]/30'}`}>
                      {products.length}
                    </span>
                  </button>
                </li>
                {brandSlugs.map(slug => {
                  const count = products.filter((p: any) => p.brandSlug === slug).length
                  return (
                    <li key={slug}>
                      <button
                        onClick={() => selectBrand(slug)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left ${
                          activeBrand === slug
                            ? 'bg-[#15A7DC]/10 text-[#15A7DC]'
                            : 'text-[#0A1628]/60 hover:bg-gray-50 hover:text-[#0A1628]'
                        }`}
                      >
                        <span>{brandNames[slug] || slug}</span>
                        <span className={`text-xs font-semibold tabular-nums ${activeBrand === slug ? 'text-[#15A7DC]/70' : 'text-[#0A1628]/30'}`}>
                          {count}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}

          {categories.length > 1 && (
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-[#0A1628]/30 mb-3 px-1">Categories</p>
              <ul className="space-y-0.5">
                <li>
                  <button
                    onClick={() => selectCategory('')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left ${
                      activeCategory === ''
                        ? 'bg-[#0A1628] text-white'
                        : 'text-[#0A1628]/60 hover:bg-gray-50 hover:text-[#0A1628]'
                    }`}
                  >
                    <span>All</span>
                    <span className={`text-xs font-semibold tabular-nums ${activeCategory === '' ? 'text-white/60' : 'text-[#0A1628]/30'}`}>
                      {brandFilteredProducts.length}
                    </span>
                  </button>
                </li>
                {categories.map(cat => {
                  const count = brandFilteredProducts.filter((p: any) => p.category === cat).length
                  return (
                    <li key={cat}>
                      <button
                        onClick={() => selectCategory(cat)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left ${
                          activeCategory === cat
                            ? 'bg-[#15A7DC]/10 text-[#15A7DC]'
                            : 'text-[#0A1628]/60 hover:bg-gray-50 hover:text-[#0A1628]'
                        }`}
                      >
                        <span>{cat}</span>
                        <span className={`text-xs font-semibold tabular-nums ${activeCategory === cat ? 'text-[#15A7DC]/70' : 'text-[#0A1628]/30'}`}>
                          {count}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
        </aside>

        {/* Products area */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-8 gap-3 flex-wrap">
            <div>
              <h2 className="text-lg font-semibold text-[#0A1628]">
                {heading}
              </h2>
              <p className="text-sm text-gray-400 mt-0.5">
                Page {currentPage} of {totalPages} · {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
              </p>
            </div>
            {/* Mobile dropdowns */}
            <div className="flex md:hidden gap-2">
              {brandSlugs.length > 1 && (
                <select
                  value={activeBrand}
                  onChange={e => selectBrand(e.target.value)}
                  className="text-xs border border-gray-200 rounded-lg px-3 py-2 text-[#0A1628] bg-white"
                >
                  <option value="">All Brands ({products.length})</option>
                  {brandSlugs.map(slug => (
                    <option key={slug} value={slug}>
                      {brandNames[slug] || slug} ({products.filter((p: any) => p.brandSlug === slug).length})
                    </option>
                  ))}
                </select>
              )}
              {categories.length > 1 && (
                <select
                  value={activeCategory}
                  onChange={e => selectCategory(e.target.value)}
                  className="text-xs border border-gray-200 rounded-lg px-3 py-2 text-[#0A1628] bg-white"
                >
                  <option value="">All Categories ({brandFilteredProducts.length})</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat} ({brandFilteredProducts.filter((p: any) => p.category === cat).length})
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-5xl mb-4">📦</div>
            <p className="text-gray-400">
              {heading !== 'All Products' ? `No products in "${heading}".` : 'No products listed yet.'}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {visibleProducts.map((product: any) => {
                const productParams = new URLSearchParams()
                if (activeCategory) productParams.set('category', activeCategory)
                if (activeBrand) productParams.set('brand', activeBrand)
                const productHref = productParams.toString()
                  ? `/products/${product.slug}?${productParams.toString()}`
                  : `/products/${product.slug}`
                return (
                <Link
                  key={product._id}
                  href={productHref}
                  className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-[#15A7DC]/50 hover:shadow-[0_4px_20px_rgba(21,167,220,0.1)] transition-all duration-200 group"
                >
                  {product.images?.[0] ? (
                    <div className="relative h-48 bg-white flex items-center justify-center p-2">
                      <img
                        src={cld(product.images[0])}
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
                    <span className="inline-block text-[10px] font-semibold uppercase tracking-wide text-[#0A1628]/40 mb-1.5">
                      {brandNames[product.brandSlug] || product.brandSlug}
                    </span>
                    <h3 className="font-semibold text-[#0A1628] text-sm leading-snug mb-2">
                      {product.name}
                    </h3>
                    {product.category && (
                      <span className="inline-block text-xs bg-[#15A7DC]/10 text-[#15A7DC] px-2 py-0.5 rounded-full mb-3">
                        {product.category}
                      </span>
                    )}
                    {product.shortDescription && (() => {
                      const lines = product.shortDescription.split('\n').map((l: string) => l.trim()).filter((l: string) => l.length > 2)
                      const offset = product.slug ? product.slug.split('').reduce((a: number, c: string) => a + c.charCodeAt(0), 0) % Math.max(lines.length - 1, 1) : 0
                      const visible = [...lines.slice(offset), ...lines.slice(0, offset)].slice(0, 2)
                      return (
                        <ul className="space-y-1.5 mt-2">
                          {visible.map((line: string, i: number) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-[#0A1628]/50 leading-relaxed">
                              <span className="w-1 h-1 rounded-full bg-[#15A7DC] mt-1.5 shrink-0" />
                              {line}
                            </li>
                          ))}
                        </ul>
                      )
                    })()}
                  </div>
                </Link>
                )
              })}
            </div>

           {/* Pagination */}
{totalPages > 1 && (
  <div className="flex items-center justify-center gap-2 mt-12">
    {/* Prev */}
    <button
      onClick={() => goToPage(currentPage - 1)}
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
          onClick={() => goToPage(page)}
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
      onClick={() => goToPage(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-[#0A1628] hover:border-[#15A7DC] hover:text-[#15A7DC] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
    >
      Next →
    </button>
  </div>
)}
          </>
        )}
        </div>{/* end products area */}
      </div>{/* end sidebar+grid flex */}
    </main>
  )
}

'use client'

import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'

const categories = [
  { label: 'All Products', icon: '🗂️', value: '' },
  { label: 'Print Solutions', icon: '🖨️', value: 'print-solutions' },
  { label: 'IT Accessories', icon: '💻', value: 'it-accessories' },
  { label: 'Scan Solutions', icon: '🔍', value: 'scan-solutions' },
  { label: 'Audio Visual', icon: '🖥️', value: 'audio-visual' },
  { label: 'Components', icon: '🔧', value: 'components' },
  { label: 'Gaming', icon: '🎮', value: 'gaming' },
  { label: 'Consumer Electronics', icon: '🔌', value: 'consumer-electronics' },
]

const brands = [
  { name: 'Kodak Alaris', slug: 'kodak-alaris', logo: '/logos/Kodak-alaris-logo.png' },
  { name: 'Canon', slug: 'canon', logo: '/logos/canon-logo.png'},
    { name: 'Brother', slug: 'brother', logo: '/logos/brother-logo.png'},
  { name: 'Czur', slug: 'czur', logo: '/logos/czur-logo.webp' },
  { name: 'Colortrac', slug: 'colortrac', logo: '/logos/colortrac-logo.png' },
    { name: 'Viewsonic', slug: 'viewsonic', logo: '/logos/viewsonic-logo.webp' },
    
  { name: 'Dicota', slug: 'dicota', logo: '/logos/dicota-logo.webp'},
  { name: 'UNV', slug: 'unv', logo: '/logos/unv-logo.svg'},
    { name: 'Aerocool', slug: 'aerocool', logo: '/logos/aerocool-logo.svg'},
      { name: 'MSI', slug: 'msi', logo: '/logos/msi-logo.png' },
  { name: 'Silex', slug: 'silex', logo: '/logos/silex-logo.png'},
{ name: 'Ezofis', slug: 'ezofis', logo: '/logos/ezofis-logo.png'},

  { name: 'Aztech', slug: 'aztech', logo: '/logos/aztech-logo.png'},
  { name: 'Deli', slug: 'deli', logo: '/logos/deli-logo.png'},
  { name: 'Contex', slug: 'contex', logo: '/logos/contex-logo.png' },
  { name: 'Dahua', slug: 'dahua', logo: '/logos/dahua-logo.png' },
      { name: 'Ricoh', slug: 'ricoh', logo: '/logos/ricoh-logo.svg' },
  { name: 'Fujitsu', slug: 'fujitsu', logo: '/logos/fujitsu-logo.svg'},


  { name: 'IRIS', slug: 'iris', logo: '/logos/iris-logo.svg'},
  
]
export default function CataloguePage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [activeCategory, setActiveCategory] = useState('')
  const [allProducts, setAllProducts] = useState<any[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetch('/api/products')
      .then(r => r.json())
      .then(data => setAllProducts(Array.isArray(data) ? data : []))
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (query.length < 2) { setResults([]); setShowDropdown(false); return }
    const q = query.toLowerCase()
    const matched = allProducts
      .filter(p => p.name.toLowerCase().includes(q) || p.category?.toLowerCase().includes(q))
      .slice(0, 6)
    setResults(matched)
    setShowDropdown(true)
  }, [query, allProducts])

  return (
    <main className="min-h-screen bg-white">

      {/* Hero */}
      <div className="bg-[#0A1628] px-4 py-40 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(21,167,220,0.15) 0%, transparent 65%)' }} />
        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="inline-block text-[11px] font-semibold tracking-widest uppercase text-[#15A7DC] border border-[#15A7DC]/30 px-3 py-1 rounded-full mb-5">
            Product Catalogue
          </span>
          <h1 className="text-4xl font-bold text-white mb-3 leading-tight">
            Explore Our <span className="text-[#15A7DC]">Product Range</span>
          </h1>
          <p className="text-white/40 text-base mb-8">
            Official distributor of 20+ leading brands across UAE & Middle East
          </p>

          {/* Search */}
          <div className="relative max-w-xl mx-auto" style={{ zIndex: 100 }}>
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-lg">🔍</span>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
              onFocus={() => results.length > 0 && setShowDropdown(true)}
              placeholder="Search products, brands, categories..."
              className="w-full h-12 bg-white/7 border border-white/12 rounded-xl pl-11 pr-4 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#15A7DC] transition-colors"
              style={{ background: 'rgba(255,255,255,0.07)', borderColor: 'rgba(255,255,255,0.12)' }}
            />

            {/* Dropdown */}
            {showDropdown && results.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#0F2040] border border-[#15A7DC]/20 rounded-xl overflow-hidden" style={{ zIndex: 200 }}>
                {results.map((p: any) => (
                  <Link
                    key={p._id}
                    href={`/${p.brandSlug}/${p.slug}`}
                    className="flex items-center justify-between px-4 py-3 text-sm text-white/70 hover:bg-[#15A7DC]/10 hover:text-white border-b border-white/5 last:border-0 transition-colors"
                    onClick={() => setShowDropdown(false)}
                  >
                    <span>{p.name}</span>
                    <span className="text-[11px] text-[#15A7DC] bg-[#15A7DC]/10 px-2 py-0.5 rounded-md capitalize">
                      {p.brandSlug}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-[#0F2040] border-b border-white/6 px-4 py-3 flex items-center justify-center gap-8">
        {[['20+', 'Brands'], ['500+', 'Products'], ['UAE', 'Distribution'], ['MEA', 'Coverage']].map(([val, label]) => (
          <div key={label} className="text-sm text-white/40">
            <strong className="text-[#15A7DC] font-semibold mr-1">{val}</strong>{label}
          </div>
        ))}
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 py-24">
        

        {/* Brands grid */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-3 mb-4 justify-center">
            <span className="block w-8 h-px bg-[#15A7DC] shrink-0" />
            <span className="font-body text-[11px] font-medium tracking-[0.22em] uppercase text-[#15A7DC]">
              Browse by Brand
            </span>
            <span className="block w-8 h-px bg-[#15A7DC] shrink-0" />
          </div>
          <h2 className="font-display font-bold text-[#0A1628] text-[clamp(28px,4vw,42px)] leading-[1.15] tracking-[-0.02em]">
            Shop Our Brand Catalogue
          </h2>
          <p className="font-body text-[16px] font-light text-gray-500 leading-[1.7] mt-4 max-w-2xl mx-auto">
            Select a brand to explore its full product lineup — from scanners and displays to accessories and components.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {brands.map(brand => (
            <Link
              key={brand.slug}
              href={`/${brand.slug}`}
              className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col items-center gap-3 hover:border-[#15A7DC]/50 hover:shadow-[0_4px_20px_rgba(21,167,220,0.1)] transition-all duration-200 group"
            >
              {brand.logo ? (
  <div className="h-12 w-full flex items-center justify-center">
    <img
      src={brand.logo}
      alt={brand.name}
      className="max-h-12 max-w-[80px] object-contain group-hover:scale-105 transition-transform duration-200"
    />
  </div>
) : (
  <div className="h-8 w-8 bg-gray-50 rounded-lg flex items-center justify-center text-sm font-bold text-[#15A7DC]">
    {brand.name.slice(0, 2).toUpperCase()}
  </div>
)}
              
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import ProductDescription from '@/src/components/catalogue/ProductDescription'

export default function ProductPage() {
  const params = useParams()
  const [product, setProduct] = useState<any>(null)
  const [brand, setBrand] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'downloads'>('description')
  const [showEnquiry, setShowEnquiry] = useState(false)

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      try {
        const [brandsRes, productsRes] = await Promise.all([
          fetch('/api/brands'),
          fetch(`/api/products?brand=${params.brand}`),
        ])
        const brandsData = await brandsRes.json()
        const productsData = await productsRes.json()
        const brands = Array.isArray(brandsData) ? brandsData : []
        const products = Array.isArray(productsData) ? productsData : []
        setBrand(brands.find((b: any) => b.slug === params.brand))
        setProduct(products.find((p: any) => p.slug === params.product))
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [params])

  async function handleEnquiry(e: React.FormEvent) {
    e.preventDefault()
    setSending(true)
    setError('')
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, product: product?.name, brand: brand?.name }),
      })
      if (!res.ok) throw new Error('Failed')
      setSent(true)
      setForm({ name: '', email: '', phone: '', message: '' })
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSending(false)
    }
  }

  function closeModal() {
    setShowEnquiry(false)
    setSent(false)
    setError('')
    setForm({ name: '', email: '', phone: '', message: '' })
  }

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center text-[#0A1628]/40">
      Loading...
    </div>
  )

  if (!product) return (
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

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'specifications', label: 'Specifications' },
    { id: 'downloads', label: 'Downloads' },
  ] as const

  const shortDescLines = product.shortDescription
    ? product.shortDescription.split('\n').map((l: string) => l.trim()).filter((l: string) => l.length > 2)
    : []

  return (
    <main className="min-h-screen bg-white">

      {/* Breadcrumb */}
      <div className="bg-white px-6 py-3 mt-20">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs">
          <Link href="/catalogue" className="text-gray-400 hover:text-[#15A7DC] transition-colors">
            Brands
          </Link>
          <span className="text-gray-300">/</span>
          <Link href={`/${params.brand}`} className="text-gray-400 hover:text-[#15A7DC] transition-colors capitalize">
            {brand?.name}
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-600 truncate max-w-xs">{product.name}</span>
        </div>
      </div>

      {/* Product layout */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[560px]">

          {/* Left — Images */}
          <div className="bg-white border-r border-gray-100 p-8 flex flex-col gap-4">
            {product.images?.length > 0 ? (
              <>
                <div className="rounded-2xl overflow-hidden aspect-square bg-white border border-gray-100 flex items-center justify-center">
                  <img
                    src={product.images[activeImage]}
                    alt={product.name}
                    className="w-full h-full object-contain p-6"
                  />
                </div>
                {product.images.length > 1 && (
                  <div className="flex gap-2 flex-wrap">
                    {product.images.map((img: string, i: number) => (
                      <button
                        key={i}
                        onClick={() => setActiveImage(i)}
                        className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                          activeImage === i
                            ? 'border-[#15A7DC]'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="aspect-square bg-white rounded-2xl border border-gray-100 flex items-center justify-center text-6xl">
                📦
              </div>
            )}
          </div>

          {/* Right — Product info */}
          <div className="p-8 flex flex-col">

            {/* Brand row */}
            <div className="flex items-center gap-2 mb-4">
              {brand?.logo ? (
                <img src={brand.logo} alt={brand.name} className="h-5 object-contain opacity-70" />
              ) : (
                <span className="text-xs text-gray-400 font-medium">{brand?.name}</span>
              )}
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span className="text-xs text-gray-400">Authorised Distributor · UAE</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-[#0A1628] leading-tight mb-4">
              {product.name}
            </h1>

            {/* Meta badges */}
            <div className="flex items-center gap-2 flex-wrap mb-6">
              {product.category && (
                <span className="text-xs font-medium bg-[#15A7DC]/10 text-[#0d8fb8] px-3 py-1 rounded-full">
                  {product.category}
                </span>
              )}
              {product.sku && (
                <span className="text-xs text-gray-400 bg-gray-50 border border-gray-200 px-3 py-1 rounded-full">
                  SKU: {product.sku}
                </span>
              )}
            </div>

            <div className="h-px bg-gray-100 mb-6" />

            {/* Short description bullets */}
            {shortDescLines.length > 0 && (
              <>
                <p className="text-[10px] font-semibold text-[#15A7DC] uppercase tracking-widest mb-3">
                  Key Features
                </p>
                <ul className="space-y-2.5 mb-6">
                  {shortDescLines.map((line: string, i: number) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-[#0A1628]/60 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#15A7DC] mt-1.5 shrink-0" />
                      {line}
                    </li>
                  ))}
                </ul>
              </>
            )}

            <div className="mt-auto">
              <div className="h-px bg-gray-100 mb-6" />

              {/* Enquiry button */}
              <button
                onClick={() => setShowEnquiry(true)}
                className="flex items-center gap-2 bg-[#0A1628] hover:bg-[#15A7DC] text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm w-fit"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
                Sales Enquiry
              </button>

              {/* Assurance row */}
              <div className="flex gap-5 mt-5">
                {[
                  { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', label: 'Genuine product' },
                  { icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4', label: 'UAE delivery' },
                  { icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z', label: 'Expert support' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs text-gray-400">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#15A7DC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={item.icon} />
                    </svg>
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-t border-gray-100">
          <div className="flex border-b border-gray-100">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 text-sm font-semibold border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-[#15A7DC] text-[#15A7DC]'
                    : 'border-transparent text-gray-400 hover:text-[#0A1628]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="px-6 py-10 max-w-4xl">
            {activeTab === 'description' && (
              <ProductDescription
                description={product.description}
                shortDescription={product.shortDescription}
              />
            )}

            {activeTab === 'specifications' && (
              <div>
                {product.specs?.length > 0 ? (
                  <table className="w-full text-sm">
                    <tbody>
                      {product.specs.map((spec: any, i: number) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="py-3 px-4 text-[#0A1628]/50 font-medium w-1/3 border border-gray-100">{spec.key}</td>
                          <td className="py-3 px-4 text-[#0A1628] border border-gray-100">{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-[#0A1628]/40 text-sm">No specifications available.</p>
                )}
              </div>
            )}

            {activeTab === 'downloads' && (
              <div>
                {product.downloads?.length > 0 ? (
                  <div className="space-y-3 max-w-lg">
                    {product.downloads.map((d: any, i: number) => (
                      <a
                        key={i}
                        href={d.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-[#15A7DC]/40 hover:bg-gray-50/50 transition-all group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-[#15A7DC]/10 flex items-center justify-center shrink-0">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#15A7DC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[#0A1628] truncate">{d.label}</p>
                          <p className="text-xs text-gray-400">PDF Document</p>
                        </div>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#15A7DC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                        </svg>
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-4">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#15A7DC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/>
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-[#0A1628] mb-1">No downloads yet</p>
                    <p className="text-xs text-gray-400">Datasheets and manuals will appear here.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enquiry Modal */}
      {showEnquiry && (
        <div
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-300 hover:text-gray-500 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>

            {sent ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full bg-[#15A7DC]/10 flex items-center justify-center mx-auto mb-4">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#15A7DC" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h3 className="text-lg font-bold text-[#0A1628] mb-2">Enquiry Sent!</h3>
                <p className="text-gray-400 text-sm mb-6">We'll get back to you shortly.</p>
                <button
                  onClick={closeModal}
                  className="bg-[#15A7DC] text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#0d8fb8] transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-bold text-[#0A1628] mb-1">Sales Enquiry</h3>
                <p className="text-gray-400 text-xs mb-6 truncate">{product.name}</p>

                <form onSubmit={handleEnquiry} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Your Name *"
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[#0A1628] placeholder-gray-300 focus:outline-none focus:border-[#15A7DC]"
                  />
                  <input
                    type="email"
                    placeholder="Email Address *"
                    required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[#0A1628] placeholder-gray-300 focus:outline-none focus:border-[#15A7DC]"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[#0A1628] placeholder-gray-300 focus:outline-none focus:border-[#15A7DC]"
                  />
                  <textarea
                    placeholder="Your Message *"
                    required
                    rows={4}
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[#0A1628] placeholder-gray-300 focus:outline-none focus:border-[#15A7DC] resize-none"
                  />
                  {error && <p className="text-red-500 text-xs">{error}</p>}
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full bg-[#0A1628] hover:bg-[#15A7DC] text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50 text-sm"
                  >
                    {sending ? 'Sending...' : 'Send Enquiry'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  )
}

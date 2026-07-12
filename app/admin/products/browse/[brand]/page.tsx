'use client'

import { useEffect, useRef, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Toast, { ToastType } from '@/src/components/admin/Toast'
import ImageUploader from '@/src/components/admin/ImageUploader'
import PdfUploader, { PdfUploaderHandle } from '@/src/components/admin/PdfUploader'
import { cld } from '@/src/lib/cloudinaryUrl'

const PAGE_SIZE = 15

const emptyForm = {
  name: '', slug: '', sku: '', category: '',
  brand: '', brandSlug: '',
  shortDescription: '', description: '',
  images: [] as string[], specs: '', featured: false,
  downloads: [] as { label: string; url: string }[],
}

export default function BrandProductsPage() {
  const params = useParams()
  const router = useRouter()
  const brandSlug = params.brand as string

  const [products, setProducts] = useState<any[]>([])
  const [brand, setBrand] = useState<any>(null)
  const [allBrands, setAllBrands] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [editProduct, setEditProduct] = useState<any>(null)
  const [editForm, setEditForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null)
  const pdfUploaderRef = useRef<PdfUploaderHandle>(null)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [bulkDeleting, setBulkDeleting] = useState(false)

  async function load() {
    const [bRes, pRes, cRes] = await Promise.all([
      fetch('/api/brands'),
      fetch(`/api/products?brand=${brandSlug}`),
      fetch('/api/categories'),
    ])
    const brands = await bRes.json()
    const prods = await pRes.json()
    const cats = await cRes.json()
    const brandList = Array.isArray(brands) ? brands : []
    setAllBrands(brandList)
    setBrand(brandList.find((b: any) => b.slug === brandSlug))
    setProducts(Array.isArray(prods) ? prods : [])
    setCategories(Array.isArray(cats) ? cats : [])
    setLoading(false)
  }

  useEffect(() => { load() }, [brandSlug])

  async function handleDelete(id: string) {
    if (!confirm('Delete this product?')) return
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error()
      setToast({ message: 'Product deleted.', type: 'info' })
      load()
    } catch {
      setToast({ message: 'Failed to delete product.', type: 'error' })
    }
  }

  async function handleBulkDelete() {
    if (!confirm(`Delete ${selected.size} selected product(s)? This will also remove their images from Cloudinary.`)) return
    setBulkDeleting(true)
    let failed = 0
    for (const id of selected) {
      try {
        const res = await fetch(`/api/products/${id}`, { method: 'DELETE' })
        if (!res.ok) failed++
      } catch {
        failed++
      }
    }
    setBulkDeleting(false)
    setSelected(new Set())
    if (failed > 0) {
      setToast({ message: `Deleted with ${failed} error(s).`, type: 'error' })
    } else {
      setToast({ message: `${selected.size} product(s) deleted.`, type: 'info' })
    }
    load()
  }

  function toggleSelect(id: string) {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function toggleSelectAll() {
    if (paginated.every(p => selected.has(p._id))) {
      setSelected(prev => {
        const next = new Set(prev)
        paginated.forEach(p => next.delete(p._id))
        return next
      })
    } else {
      setSelected(prev => {
        const next = new Set(prev)
        paginated.forEach(p => next.add(p._id))
        return next
      })
    }
  }

  function startEdit(p: any) {
    setEditProduct(p)
    setEditForm({
      name: p.name || '',
      slug: p.slug || '',
      sku: p.sku || '',
      category: p.category || '',
      brand: typeof p.brand === 'object' ? p.brand?._id : p.brand || '',
      brandSlug: p.brandSlug || '',
      shortDescription: p.shortDescription || '',
      description: p.description || '',
      images: Array.isArray(p.images) ? p.images : [],
      specs: Array.isArray(p.specs) ? p.specs.map((s: any) => `${s.key}: ${s.value}`).join('\n') : '',
      featured: p.featured || false,
      downloads: Array.isArray(p.downloads) ? p.downloads : [],
    })
  }

  function closeEdit() {
    setEditProduct(null)
  }

  async function saveEdit() {
    if (!editProduct) return
    setSaving(true)
    try {
      const downloads = await pdfUploaderRef.current?.uploadPending() ?? editForm.downloads
      const payload = {
        ...editForm,
        downloads,
        specs: editForm.specs.split('\n').map(line => {
          const [key, ...rest] = line.split(':')
          return { key: key?.trim(), value: rest.join(':').trim() }
        }).filter(s => s.key),
      }
      const res = await fetch(`/api/products/${editProduct._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error()
      setEditProduct(null)
      setToast({ message: 'Product updated successfully.', type: 'success' })

      // If brand changed, redirect to the new brand's listing
      if (editForm.brandSlug && editForm.brandSlug !== brandSlug) {
        router.push(`/admin/products/browse/${editForm.brandSlug}`)
      } else {
        load()
      }
    } catch {
      setToast({ message: 'Failed to update product.', type: 'error' })
    }
    setSaving(false)
  }

  const [search, setSearch] = useState('')

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    (p.sku || '').toLowerCase().includes(search.toLowerCase())
  )
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  if (loading) return <p className="text-gray-400 text-sm">Loading...</p>

  return (
    <div>
      <div className="mb-8 flex items-center gap-3 flex-wrap">
        <Link href="/admin/products/browse" className="text-gray-400 hover:text-[#15A7DC] text-sm transition-colors">
          ← Products
        </Link>
        <span className="text-gray-200">/</span>
        <h1 className="text-2xl font-bold text-[#0A1628] capitalize">{brand?.name || brandSlug}</h1>
        <span className="text-xs text-gray-400 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-full">
          {products.length} products
        </span>
        <div className="ml-auto relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            placeholder="Search by name or SKU..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1) }}
            className="pl-8 pr-4 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-[#15A7DC] transition-colors w-64"
          />
          {search && (
            <button onClick={() => { setSearch(''); setPage(1) }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500">
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Bulk action bar */}
      {selected.size > 0 && (
        <div className="mb-3 flex items-center gap-3 px-4 py-3 bg-red-50 border border-red-100 rounded-xl">
          <span className="text-xs font-medium text-red-600">{selected.size} product(s) selected</span>
          <button
            onClick={handleBulkDelete}
            disabled={bulkDeleting}
            className="ml-auto flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            {bulkDeleting ? 'Deleting...' : (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
                </svg>
                Delete Selected
              </>
            )}
          </button>
          <button
            onClick={() => setSelected(new Set())}
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            Clear
          </button>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50/80 text-gray-400 text-xs uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3 w-8">
                <input
                  type="checkbox"
                  checked={paginated.length > 0 && paginated.every(p => selected.has(p._id))}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 accent-[#15A7DC] cursor-pointer"
                />
              </th>
              <th className="px-6 py-3 text-left">Product</th>
              <th className="px-6 py-3 text-left">SKU</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {paginated.map(p => (
              <tr key={p._id} className={`hover:bg-gray-50/50 transition-colors ${selected.has(p._id) ? 'bg-red-50/40' : ''}`}>
                <td className="px-4 py-4">
                  <input
                    type="checkbox"
                    checked={selected.has(p._id)}
                    onChange={() => toggleSelect(p._id)}
                    className="w-4 h-4 accent-[#15A7DC] cursor-pointer"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {p.images?.[0] ? (
                      <img src={cld(p.images[0])} alt="" className="h-9 w-9 rounded-lg object-cover border border-gray-100" />
                    ) : (
                      <div className="h-9 w-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-xs">📦</div>
                    )}
                    <span className="font-medium text-[#0A1628] text-xs leading-snug max-w-[220px] truncate">{p.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-400 font-mono text-xs">{p.sku || '—'}</td>
                <td className="px-6 py-4 text-gray-400 text-xs">{p.category || '—'}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <a href={`/${brandSlug}/${p.slug}`} target="_blank" rel="noreferrer"
                      className="text-gray-300 hover:text-[#15A7DC] transition-colors" title="View product page">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                      </svg>
                    </a>
                    <button onClick={() => startEdit(p)}
                      className="text-[#15A7DC] hover:underline text-xs font-medium">Edit</button>
                    <button onClick={() => handleDelete(p._id)}
                      className="text-red-400 hover:underline text-xs font-medium">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-50 flex items-center justify-between">
            <p className="text-xs text-gray-400">
              Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, products.length)} of {products.length}
            </p>
            <div className="flex items-center gap-1.5">
              <button onClick={() => setPage(p => p - 1)} disabled={page === 1}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:border-[#15A7DC] hover:text-[#15A7DC] disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                ← Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                <button key={n} onClick={() => setPage(n)}
                  className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${
                    page === n ? 'bg-[#15A7DC] text-white' : 'border border-gray-200 text-gray-600 hover:border-[#15A7DC] hover:text-[#15A7DC]'
                  }`}>
                  {n}
                </button>
              ))}
              <button onClick={() => setPage(p => p + 1)} disabled={page === totalPages}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:border-[#15A7DC] hover:text-[#15A7DC] disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                Next →
              </button>
            </div>
          </div>
        )}
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Edit slide-in panel */}
      {editProduct && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/30" onClick={closeEdit} />
          <div className="w-full max-w-lg bg-white h-full overflow-y-auto shadow-xl flex flex-col">

            {/* Header */}
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <div>
                <p className="font-semibold text-[#0A1628] text-sm">Edit Product</p>
                <p className="text-xs text-gray-400 truncate max-w-xs mt-0.5">{editProduct.name}</p>
              </div>
              <button onClick={closeEdit} className="text-gray-300 hover:text-gray-500 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            {/* Form */}
            <div className="px-6 py-6 flex-1 space-y-4">

              <div>
                <label className="text-xs font-medium text-gray-400 mb-1.5 block">Product Name</label>
                <input value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#15A7DC] transition-colors" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-400 mb-1.5 block">Slug</label>
                  <input value={editForm.slug} onChange={e => setEditForm({ ...editForm, slug: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#15A7DC] transition-colors" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-400 mb-1.5 block">SKU</label>
                  <input value={editForm.sku} onChange={e => setEditForm({ ...editForm, sku: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#15A7DC] transition-colors" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-400 mb-1.5 block">Brand</label>
                  <select
                    value={editForm.brand}
                    onChange={e => {
                      const selected = allBrands.find(b => b._id === e.target.value)
                      setEditForm({ ...editForm, brand: e.target.value, brandSlug: selected?.slug || '' })
                    }}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#15A7DC] transition-colors"
                  >
                    <option value="">Select Brand</option>
                    {allBrands.map(b => <option key={b._id} value={b._id}>{b.name}</option>)}
                  </select>
                  {editForm.brandSlug && editForm.brandSlug !== brandSlug && (
                    <p className="text-[11px] text-amber-500 mt-1">⚠ Will move to {editForm.brandSlug}</p>
                  )}
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-400 mb-1.5 block">Category</label>
                  <select
                    value={editForm.category}
                    onChange={e => setEditForm({ ...editForm, category: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#15A7DC] transition-colors"
                  >
                    <option value="">Select Category</option>
                    {categories.map(c => <option key={c._id} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="h-px bg-gray-100" />

              <div>
                <label className="text-xs font-medium text-gray-400 mb-1.5 block">Short Description <span className="text-gray-300">(one feature per line)</span></label>
                <textarea value={editForm.shortDescription} onChange={e => setEditForm({ ...editForm, shortDescription: e.target.value })}
                  rows={4} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#15A7DC] transition-colors resize-none" />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-400 mb-1.5 block">Description</label>
                <textarea value={editForm.description} onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                  rows={5} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#15A7DC] transition-colors resize-none" />
              </div>

              <div className="h-px bg-gray-100" />

              <div>
                <label className="text-xs font-medium text-gray-400 mb-1.5 block">Images</label>
                <ImageUploader
                  images={editForm.images}
                  onChange={imgs => setEditForm({ ...editForm, images: imgs })}
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-400 mb-1.5 block">Specs <span className="text-gray-300">(Key: Value, one per line)</span></label>
                <textarea value={editForm.specs} onChange={e => setEditForm({ ...editForm, specs: e.target.value })}
                  rows={4} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#15A7DC] transition-colors resize-none font-mono" />
              </div>

              <div className="h-px bg-gray-100" />

              <div>
                <label className="text-xs font-medium text-gray-400 mb-1.5 block">Downloads <span className="text-gray-300">(PDF datasheets)</span></label>
                <PdfUploader
                  ref={pdfUploaderRef}
                  downloads={editForm.downloads}
                  onChange={downloads => setEditForm({ ...editForm, downloads })}
                  productName={editForm.name}
                />
              </div>

              <div className="flex items-center gap-3">
                <input type="checkbox" id="featured" checked={editForm.featured}
                  onChange={e => setEditForm({ ...editForm, featured: e.target.checked })}
                  className="w-4 h-4 accent-[#15A7DC]" />
                <label htmlFor="featured" className="text-sm text-[#0A1628]">Featured product</label>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-5 border-t border-gray-100 flex gap-3 sticky bottom-0 bg-white">
              <button onClick={saveEdit} disabled={saving}
                className="bg-[#0A1628] hover:bg-[#0F2040] text-white px-6 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-50 transition-colors">
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <button onClick={closeEdit}
                className="px-6 py-2.5 rounded-xl text-sm border border-gray-200 hover:bg-gray-50 transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

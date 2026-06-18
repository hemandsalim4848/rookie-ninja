'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Toast, { ToastType } from '@/src/components/admin/Toast'
import ImageUploader from '@/src/components/admin/ImageUploader'

const PAGE_SIZE = 15

const emptyForm = {
  name: '', slug: '', sku: '', category: '',
  shortDescription: '', description: '',
  images: [] as string[], specs: '', featured: false,
}

export default function BrandProductsPage() {
  const params = useParams()
  const brandSlug = params.brand as string

  const [products, setProducts] = useState<any[]>([])
  const [brand, setBrand] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [editProduct, setEditProduct] = useState<any>(null)
  const [editForm, setEditForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null)

  async function load() {
    const [bRes, pRes] = await Promise.all([
      fetch('/api/brands'),
      fetch(`/api/products?brand=${brandSlug}`),
    ])
    const brands = await bRes.json()
    const prods = await pRes.json()
    setBrand((Array.isArray(brands) ? brands : []).find((b: any) => b.slug === brandSlug))
    setProducts(Array.isArray(prods) ? prods : [])
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

  function startEdit(p: any) {
    setEditProduct(p)
    setEditForm({
      name: p.name || '',
      slug: p.slug || '',
      sku: p.sku || '',
      category: p.category || '',
      shortDescription: p.shortDescription || '',
      description: p.description || '',
      images: Array.isArray(p.images) ? p.images : [],
      specs: Array.isArray(p.specs) ? p.specs.map((s: any) => `${s.key}: ${s.value}`).join('\n') : '',
      featured: p.featured || false,
    })
  }

  async function saveEdit() {
    if (!editProduct) return
    setSaving(true)
    const payload = {
      ...editForm,
      images: editForm.images,
      specs: editForm.specs.split('\n').map(line => {
        const [key, ...rest] = line.split(':')
        return { key: key?.trim(), value: rest.join(':').trim() }
      }).filter(s => s.key),
    }
    try {
      const res = await fetch(`/api/products/${editProduct._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error()
      setEditProduct(null)
      setToast({ message: 'Product updated successfully.', type: 'success' })
      load()
    } catch {
      setToast({ message: 'Failed to update product.', type: 'error' })
    }
    setSaving(false)
  }

  const totalPages = Math.ceil(products.length / PAGE_SIZE)
  const paginated = products.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  if (loading) return <p className="text-gray-400 text-sm">Loading...</p>

  return (
    <div>
      <div className="mb-8 flex items-center gap-3">
        <Link href="/admin/products/browse" className="text-gray-400 hover:text-[#15A7DC] text-sm transition-colors">
          ← Products
        </Link>
        <span className="text-gray-200">/</span>
        <h1 className="text-2xl font-bold text-[#0A1628] capitalize">{brand?.name || brandSlug}</h1>
        <span className="text-xs text-gray-400 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-full">
          {products.length} products
        </span>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50/80 text-gray-400 text-xs uppercase tracking-wide">
            <tr>
              <th className="px-6 py-3 text-left">Product</th>
              <th className="px-6 py-3 text-left">SKU</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {paginated.map(p => (
              <tr key={p._id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {p.images?.[0] ? (
                      <img src={p.images[0]} alt="" className="h-9 w-9 rounded-lg object-cover border border-gray-100" />
                    ) : (
                      <div className="h-9 w-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-xs">📦</div>
                    )}
                    <span className="font-medium text-[#0A1628] text-xs leading-snug max-w-[220px] truncate">{p.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-400 font-mono text-xs">{p.sku || '—'}</td>
                <td className="px-6 py-4 text-gray-400 text-xs">{p.category || '—'}</td>
                <td className="px-6 py-4 text-right space-x-3">
                  <button onClick={() => startEdit(p)}
                    className="text-[#15A7DC] hover:underline text-xs font-medium">Edit</button>
                  <button onClick={() => handleDelete(p._id)}
                    className="text-red-400 hover:underline text-xs font-medium">Delete</button>
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
          <div className="flex-1 bg-black/30" onClick={() => setEditProduct(null)} />
          <div className="w-full max-w-lg bg-white h-full overflow-y-auto shadow-xl flex flex-col">

            {/* Header */}
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <div>
                <p className="font-semibold text-[#0A1628] text-sm">Edit Product</p>
                <p className="text-xs text-gray-400 truncate max-w-xs mt-0.5">{editProduct.name}</p>
              </div>
              <button onClick={() => setEditProduct(null)} className="text-gray-300 hover:text-gray-500 transition-colors">
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

              <div>
                <label className="text-xs font-medium text-gray-400 mb-1.5 block">Category</label>
                <input value={editForm.category} onChange={e => setEditForm({ ...editForm, category: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#15A7DC] transition-colors" />
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
              <button onClick={() => setEditProduct(null)}
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

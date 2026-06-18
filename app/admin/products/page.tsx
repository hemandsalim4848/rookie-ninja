'use client'

import { useEffect, useState } from 'react'

const PAGE_SIZE = 10

function slugify(str: string) {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [brands, setBrands] = useState<any[]>([])
  const [saving, setSaving] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [form, setForm] = useState({
    brand: '', brandSlug: '', name: '', slug: '', sku: '',
    description: '', category: '', images: '', specs: '',
  })

  async function load() {
    try {
      const [p, b] = await Promise.all([fetch('/api/products'), fetch('/api/brands')])
      if (!p.ok || !b.ok) return
      const pData = await p.json()
      const bData = await b.json()
      setProducts(Array.isArray(pData) ? pData : [])
      setBrands(Array.isArray(bData) ? bData : [])
    } catch {
      setProducts([])
      setBrands([])
    }
  }

  useEffect(() => { load() }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const payload = {
      ...form,
      images: form.images.split('\n').map(s => s.trim()).filter(Boolean),
      specs: form.specs.split('\n').map(line => {
        const [key, ...rest] = line.split(':')
        return { key: key?.trim(), value: rest.join(':').trim() }
      }).filter(s => s.key),
    }
    const method = editId ? 'PUT' : 'POST'
    const url = editId ? `/api/products/${editId}` : '/api/products'
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    resetForm()
    setSaving(false)
    load()
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this product?')) return
    await fetch(`/api/products/${id}`, { method: 'DELETE' })
    load()
  }

  function startEdit(product: any) {
    setEditId(product._id)
    setForm({
      brand: product.brand,
      brandSlug: product.brandSlug,
      name: product.name,
      slug: product.slug,
      sku: product.sku || '',
      description: product.description || '',
      category: product.category || '',
      images: Array.isArray(product.images) ? product.images.join('\n') : '',
      specs: Array.isArray(product.specs)
        ? product.specs.map((s: any) => `${s.key}: ${s.value}`).join('\n')
        : '',
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function resetForm() {
    setEditId(null)
    setForm({ brand: '', brandSlug: '', name: '', slug: '', sku: '', description: '', category: '', images: '', specs: '' })
  }

  function handleBrandChange(brandId: string) {
    const selected = brands.find(b => b._id === brandId)
    setForm({ ...form, brand: brandId, brandSlug: selected?.slug || '' })
  }

  const totalPages = Math.ceil(products.length / PAGE_SIZE)
  const paginated = products.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0A1628]">Products</h1>
        <p className="text-gray-400 text-sm mt-1">{products.length} products total</p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
        <h2 className="font-semibold text-[#0A1628] mb-5">
          {editId ? '✏️ Edit Product' : '+ Add New Product'}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <select required value={form.brand} onChange={e => handleBrandChange(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#15A7DC] transition-colors">
            <option value="">Select Brand *</option>
            {brands.map(b => <option key={b._id} value={b._id}>{b.name}</option>)}
          </select>

          <input required placeholder="Product Name *" value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value, slug: slugify(e.target.value) })}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#15A7DC] transition-colors" />

          <input placeholder="Slug (auto-generated)" value={form.slug}
            onChange={e => setForm({ ...form, slug: e.target.value })}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#15A7DC] transition-colors" />

          <input placeholder="SKU" value={form.sku}
            onChange={e => setForm({ ...form, sku: e.target.value })}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#15A7DC] transition-colors" />

          <input placeholder="Category" value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value })}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#15A7DC] transition-colors" />

          <textarea placeholder="Description" value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            rows={3}
            className="sm:col-span-2 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#15A7DC] transition-colors resize-none" />

          <textarea placeholder={"Image URLs (one per line)\nhttps://...\nhttps://..."} value={form.images}
            onChange={e => setForm({ ...form, images: e.target.value })}
            rows={3}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#15A7DC] transition-colors resize-none" />

          <textarea placeholder={"Specs (one per line)\nVoltage: 18V\nWeight: 2.5kg"} value={form.specs}
            onChange={e => setForm({ ...form, specs: e.target.value })}
            rows={3}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#15A7DC] transition-colors resize-none" />

          <div className="sm:col-span-2 flex gap-3">
            <button type="submit" disabled={saving}
              className="bg-[#0A1628] hover:bg-[#0F2040] text-white px-6 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-50 transition-colors">
              {saving ? 'Saving...' : editId ? 'Update Product' : 'Add Product'}
            </button>
            {editId && (
              <button type="button" onClick={resetForm}
                className="px-6 py-2.5 rounded-xl text-sm border border-gray-200 hover:bg-gray-50 transition-colors">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
          <p className="text-sm font-semibold text-[#0A1628]">All Products</p>
          <p className="text-xs text-gray-400">Page {page} of {totalPages || 1}</p>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50/80 text-gray-400 text-xs uppercase tracking-wide">
            <tr>
              <th className="px-6 py-3 text-left">Product</th>
              <th className="px-6 py-3 text-left">Brand</th>
              <th className="px-6 py-3 text-left">SKU</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {paginated.map((p) => (
              <tr key={p._id} className={`hover:bg-gray-50/50 transition-colors ${editId === p._id ? 'bg-[#15A7DC]/5' : ''}`}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {p.images?.[0] ? (
                      <img src={p.images[0]} alt="" className="h-8 w-8 rounded-lg object-cover" />
                    ) : (
                      <div className="h-8 w-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-xs">📦</div>
                    )}
                    <span className="font-medium text-[#0A1628] text-xs leading-snug max-w-[200px] truncate">{p.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs bg-[#15A7DC]/8 text-[#15A7DC] px-2 py-0.5 rounded-full capitalize font-medium"
                    style={{ background: 'rgba(21,167,220,0.08)' }}>
                    {p.brandSlug}
                  </span>
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

        {/* Pagination */}
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
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => setPage(p)}
                  className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${
                    page === p ? 'bg-[#15A7DC] text-white' : 'border border-gray-200 text-gray-600 hover:border-[#15A7DC] hover:text-[#15A7DC]'
                  }`}>
                  {p}
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
    </div>
  )
}
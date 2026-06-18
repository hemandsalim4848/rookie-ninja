'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

const PAGE_SIZE = 15

export default function BrandProductsPage() {
  const params = useParams()
  const brandSlug = params.brand as string

  const [products, setProducts] = useState<any[]>([])
  const [brand, setBrand] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [editId, setEditId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState({ name: '', sku: '', category: '', featured: false })
  const [saving, setSaving] = useState(false)

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
    await fetch(`/api/products/${id}`, { method: 'DELETE' })
    load()
  }

  function startEdit(p: any) {
    setEditId(p._id)
    setEditForm({ name: p.name, sku: p.sku || '', category: p.category || '', featured: p.featured || false })
  }

  async function saveEdit(id: string) {
    setSaving(true)
    await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm),
    })
    setEditId(null)
    setSaving(false)
    load()
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
              <tr key={p._id} className={`hover:bg-gray-50/50 transition-colors ${editId === p._id ? 'bg-[#15A7DC]/5' : ''}`}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {p.images?.[0] ? (
                      <img src={p.images[0]} alt="" className="h-9 w-9 rounded-lg object-cover border border-gray-100" />
                    ) : (
                      <div className="h-9 w-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-xs">📦</div>
                    )}
                    {editId === p._id ? (
                      <input
                        value={editForm.name}
                        onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                        className="border border-[#15A7DC] rounded-lg px-2 py-1 text-xs text-[#0A1628] focus:outline-none w-48"
                      />
                    ) : (
                      <span className="font-medium text-[#0A1628] text-xs leading-snug max-w-[220px] truncate">{p.name}</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {editId === p._id ? (
                    <input
                      value={editForm.sku}
                      onChange={e => setEditForm({ ...editForm, sku: e.target.value })}
                      className="border border-[#15A7DC] rounded-lg px-2 py-1 text-xs focus:outline-none w-24"
                    />
                  ) : (
                    <span className="text-gray-400 font-mono text-xs">{p.sku || '—'}</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {editId === p._id ? (
                    <input
                      value={editForm.category}
                      onChange={e => setEditForm({ ...editForm, category: e.target.value })}
                      className="border border-[#15A7DC] rounded-lg px-2 py-1 text-xs focus:outline-none w-32"
                    />
                  ) : (
                    <span className="text-gray-400 text-xs">{p.category || '—'}</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right space-x-3">
                  {editId === p._id ? (
                    <>
                      <button onClick={() => saveEdit(p._id)} disabled={saving}
                        className="text-green-500 hover:underline text-xs font-medium disabled:opacity-50">
                        {saving ? 'Saving...' : 'Save'}
                      </button>
                      <button onClick={() => setEditId(null)}
                        className="text-gray-400 hover:underline text-xs font-medium">
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => startEdit(p)}
                        className="text-[#15A7DC] hover:underline text-xs font-medium">Edit</button>
                      <button onClick={() => handleDelete(p._id)}
                        className="text-red-400 hover:underline text-xs font-medium">Delete</button>
                    </>
                  )}
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
    </div>
  )
}

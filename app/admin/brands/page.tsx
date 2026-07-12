'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { cld } from '@/src/lib/cloudinaryUrl'

const PAGE_SIZE = 10

function slugify(str: string) {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
}

export default function AdminBrandsPage() {
  const [brands, setBrands] = useState<any[]>([])
  const [form, setForm] = useState({ name: '', slug: '', logo: '', description: '', country: '' })
  const [saving, setSaving] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  async function load() {
    try {
      const res = await fetch('/api/brands')
      if (!res.ok) return
      const data = await res.json()
      setBrands(Array.isArray(data) ? data : [])
    } catch { setBrands([]) }
  }

  useEffect(() => { load() }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const method = editId ? 'PUT' : 'POST'
    const url = editId ? `/api/brands/${editId}` : '/api/brands'
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    resetForm()
    setSaving(false)
    load()
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this brand?')) return
    await fetch(`/api/brands/${id}`, { method: 'DELETE' })
    load()
  }

  function startEdit(brand: any) {
    setEditId(brand._id)
    setForm({ name: brand.name, slug: brand.slug, logo: brand.logo || '', description: brand.description || '', country: brand.country || '' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function resetForm() {
    setEditId(null)
    setForm({ name: '', slug: '', logo: '', description: '', country: '' })
  }

  const totalPages = Math.ceil(brands.length / PAGE_SIZE)
  const paginated = brands.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0A1628]">Brands</h1>
        <p className="text-gray-400 text-sm mt-1">{brands.length} brands total</p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
        <h2 className="font-semibold text-[#0A1628] mb-5">
          {editId ? '✏️ Edit Brand' : '+ Add New Brand'}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input required placeholder="Brand Name *" value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value, slug: slugify(e.target.value) })}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#15A7DC] transition-colors" />
          <input required placeholder="Slug *" value={form.slug}
            onChange={e => setForm({ ...form, slug: e.target.value })}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#15A7DC] transition-colors" />
          <input placeholder="Logo URL" value={form.logo}
            onChange={e => setForm({ ...form, logo: e.target.value })}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#15A7DC] transition-colors" />
          <input placeholder="Country" value={form.country}
            onChange={e => setForm({ ...form, country: e.target.value })}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#15A7DC] transition-colors" />
          <textarea placeholder="Description" value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            rows={2}
            className="sm:col-span-2 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#15A7DC] transition-colors resize-none" />
          <div className="sm:col-span-2 flex gap-3">
            <button type="submit" disabled={saving}
              className="bg-[#0A1628] hover:bg-[#0F2040] text-white px-6 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-50 transition-colors">
              {saving ? 'Saving...' : editId ? 'Update Brand' : 'Add Brand'}
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
          <p className="text-sm font-semibold text-[#0A1628]">All Brands</p>
          <p className="text-xs text-gray-400">Page {page} of {totalPages || 1}</p>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50/80 text-gray-400 text-xs uppercase tracking-wide">
            <tr>
              <th className="px-6 py-3 text-left">Brand</th>
              <th className="px-6 py-3 text-left">Slug</th>
              <th className="px-6 py-3 text-left">Country</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {paginated.map((brand) => (
              <tr key={brand._id} className={`hover:bg-gray-50/50 transition-colors ${editId === brand._id ? 'bg-[#15A7DC]/5' : ''}`}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {brand.logo ? (
                      <img src={cld(brand.logo)} alt="" className="h-6 w-12 object-contain" />
                    ) : (
                      <div className="h-6 w-6 rounded bg-[#15A7DC]/10 flex items-center justify-center text-[10px] font-bold text-[#15A7DC]">
                        {brand.name?.[0]}
                      </div>
                    )}
                    <span className="font-medium text-[#0A1628]">{brand.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-400 font-mono text-xs">{brand.slug}</td>
                <td className="px-6 py-4 text-gray-400">{brand.country || '—'}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link href={`/admin/products/browse/${brand.slug}`}
                      className="text-gray-300 hover:text-[#15A7DC] transition-colors" title="View products">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                      </svg>
                    </Link>
                    <button onClick={() => startEdit(brand)}
                      className="text-[#15A7DC] hover:underline text-xs font-medium">Edit</button>
                    <button onClick={() => handleDelete(brand._id)}
                      className="text-red-400 hover:underline text-xs font-medium">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-50 flex items-center justify-between">
            <p className="text-xs text-gray-400">
              Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, brands.length)} of {brands.length}
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
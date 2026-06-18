'use client'

import { useEffect, useState } from 'react'

function slugify(str: string) {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
}

export default function AddProductPage() {
  const [brands, setBrands] = useState<any[]>([])
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({
    brand: '', brandSlug: '', name: '', slug: '', sku: '',
    shortDescription: '', description: '', category: '', images: '', specs: '',
  })

  useEffect(() => {
    fetch('/api/brands').then(r => r.json()).then(d => setBrands(Array.isArray(d) ? d : []))
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setSuccess(false)
    const payload = {
      ...form,
      shortDescription: form.shortDescription.trim(),
      images: form.images.split('\n').map(s => s.trim()).filter(Boolean),
      specs: form.specs.split('\n').map(line => {
        const [key, ...rest] = line.split(':')
        return { key: key?.trim(), value: rest.join(':').trim() }
      }).filter(s => s.key),
    }
    await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    resetForm()
    setSaving(false)
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  function handleBrandChange(brandId: string) {
    const selected = brands.find(b => b._id === brandId)
    setForm({ ...form, brand: brandId, brandSlug: selected?.slug || '' })
  }

  function resetForm() {
    setForm({ brand: '', brandSlug: '', name: '', slug: '', sku: '', shortDescription: '', description: '', category: '', images: '', specs: '' })
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0A1628]">Add Product</h1>
        <p className="text-gray-400 text-sm mt-1">Fill in the details to add a new product.</p>
      </div>

      {success && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-xl">
          Product added successfully.
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-100 p-6">
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

          <div className="sm:col-span-2 h-px bg-gray-100" />

          <textarea placeholder={"Short Description — one feature per line\nCable length 112cm\nMFi-approved\nWater resistant"} value={form.shortDescription}
            onChange={e => setForm({ ...form, shortDescription: e.target.value })}
            rows={4}
            className="sm:col-span-2 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#15A7DC] transition-colors resize-none" />

          <textarea placeholder="Description" value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            rows={4}
            className="sm:col-span-2 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#15A7DC] transition-colors resize-none" />

          <div className="sm:col-span-2 h-px bg-gray-100" />

          <textarea placeholder={"Image URLs (one per line)\nhttps://...\nhttps://..."} value={form.images}
            onChange={e => setForm({ ...form, images: e.target.value })}
            rows={3}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#15A7DC] transition-colors resize-none" />

          <textarea placeholder={"Specs (one per line)\nVoltage: 18V\nWeight: 2.5kg"} value={form.specs}
            onChange={e => setForm({ ...form, specs: e.target.value })}
            rows={3}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#15A7DC] transition-colors resize-none" />

          <div className="sm:col-span-2 flex gap-3 pt-2">
            <button type="submit" disabled={saving}
              className="bg-[#0A1628] hover:bg-[#0F2040] text-white px-6 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-50 transition-colors">
              {saving ? 'Saving...' : 'Add Product'}
            </button>
            <button type="button" onClick={resetForm}
              className="px-6 py-2.5 rounded-xl text-sm border border-gray-200 hover:bg-gray-50 transition-colors">
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

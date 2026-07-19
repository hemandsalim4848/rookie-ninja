'use client'

import { useEffect, useRef, useState } from 'react'
import Toast, { ToastType } from '@/src/components/admin/Toast'
import ImageUploader from '@/src/components/admin/ImageUploader'
import PdfUploader, { PdfUploaderHandle } from '@/src/components/admin/PdfUploader'

function slugify(str: string) {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
}

export default function AddProductPage() {
  const [brands, setBrands] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null)
  const [images, setImages] = useState<string[]>([])
  const [downloads, setDownloads] = useState<{ label: string; url: string }[]>([])
  const [showAccessoriesBadge, setShowAccessoriesBadge] = useState(true)
  const pdfUploaderRef = useRef<PdfUploaderHandle>(null)
  const [form, setForm] = useState({
    brand: '', brandSlug: '', name: '', slug: '', sku: '',
    shortDescription: '', description: '', category: '', specs: '',
  })

  useEffect(() => {
    fetch('/api/brands').then(r => r.json()).then(d => setBrands(Array.isArray(d) ? d : []))
    fetch('/api/categories').then(r => r.json()).then(d => setCategories(Array.isArray(d) ? d : []))
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      const finalDownloads = await pdfUploaderRef.current?.uploadPending() ?? downloads
      const payload = {
        ...form,
        shortDescription: form.shortDescription.trim(),
        images,
        downloads: finalDownloads,
        showAccessoriesBadge,
        specs: form.specs.split('\n').map(line => {
          const [key, ...rest] = line.split(':')
          return { key: key?.trim(), value: rest.join(':').trim() }
        }).filter(s => s.key),
      }
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error()
      resetForm()
      setToast({ message: 'Product added successfully.', type: 'success' })
    } catch {
      setToast({ message: 'Failed to add product. Please try again.', type: 'error' })
    }
    setSaving(false)
  }

  function handleBrandChange(brandId: string) {
    const selected = brands.find(b => b._id === brandId)
    setForm({ ...form, brand: brandId, brandSlug: selected?.slug || '' })
  }

  function resetForm() {
    setForm({ brand: '', brandSlug: '', name: '', slug: '', sku: '', shortDescription: '', description: '', category: '', specs: '' })
    setImages([])
    setDownloads([])
    setShowAccessoriesBadge(true)
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0A1628]">Add Product</h1>
        <p className="text-gray-400 text-sm mt-1">Fill in the details to add a new product.</p>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

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

          <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#15A7DC] transition-colors">
            <option value="">Select Category</option>
            {categories.map(c => <option key={c._id} value={c.name}>{c.name}</option>)}
          </select>

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

          <div className="sm:col-span-2">
            <p className="text-xs font-medium text-gray-400 mb-2">Images</p>
            <ImageUploader images={images} onChange={setImages} />
          </div>

          <textarea placeholder={"Specs (one per line)\nVoltage: 18V\nWeight: 2.5kg"} value={form.specs}
            onChange={e => setForm({ ...form, specs: e.target.value })}
            rows={3}
            className="sm:col-span-2 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#15A7DC] transition-colors resize-none" />

          <div className="sm:col-span-2 h-px bg-gray-100" />

          <div className="sm:col-span-2">
            <p className="text-xs font-medium text-gray-400 mb-2">Downloads <span className="text-gray-300">(PDF datasheets)</span></p>
            <PdfUploader ref={pdfUploaderRef} downloads={downloads} onChange={setDownloads} productName={form.name} />
          </div>

          {downloads.length > 1 && (
            <div className="sm:col-span-2 flex items-center gap-3">
              <input type="checkbox" id="showAccessoriesBadge" checked={showAccessoriesBadge}
                onChange={e => setShowAccessoriesBadge(e.target.checked)}
                className="w-4 h-4 accent-[#15A7DC]" />
              <label htmlFor="showAccessoriesBadge" className="text-sm text-[#0A1628]">
                Show &quot;Compatible with optional accessories&quot; badge
              </label>
            </div>
          )}

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

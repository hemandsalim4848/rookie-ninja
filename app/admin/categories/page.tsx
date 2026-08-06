'use client'

import { useEffect, useState } from 'react'

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading]       = useState(true)
  const [newName, setNewName]       = useState('')
  const [newParent, setNewParent]   = useState('')
  const [adding, setAdding]         = useState(false)
  const [editingId, setEditingId]   = useState<string | null>(null)
  const [editName, setEditName]     = useState('')
  const [editParent, setEditParent] = useState('')
  const [saving, setSaving]         = useState(false)
  const [error, setError]           = useState<string | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  async function load() {
    setLoading(true)
    const res = await fetch('/api/categories')
    const data = await res.json()
    setCategories(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const topLevel = categories.filter(c => !c.parent)
  const childrenOf = (name: string) => categories.filter(c => c.parent === name)
  // Only top-level categories can be picked as a parent — keeps the tree two levels deep.
  const parentOptions = categories.filter(c => !c.parent)

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!newName.trim()) return
    setAdding(true)
    setError(null)
    const res = await fetch('/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName.trim(), parent: newParent || null }),
    })
    if (res.ok) { setNewName(''); setNewParent(''); load() }
    else { const d = await res.json(); setError(d.error) }
    setAdding(false)
  }

  async function handleSaveEdit(id: string) {
    if (!editName.trim()) return
    setSaving(true)
    setError(null)
    const res = await fetch(`/api/categories/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editName.trim(), parent: editParent || null }),
    })
    if (res.ok) { setEditingId(null); load() }
    else { const d = await res.json(); setError(d.error) }
    setSaving(false)
  }

  async function handleDelete(id: string) {
    setError(null)
    const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' })
    if (res.ok) { setDeleteConfirm(null); load() }
    else { const d = await res.json(); setError(d.error); setDeleteConfirm(null) }
  }

  function Row({ cat, indented }: { cat: any; indented: boolean }) {
    const isEditing = editingId === cat._id
    const isDeleting = deleteConfirm === cat._id
    return (
      <li className={`flex items-center gap-3 px-5 py-3.5 ${indented ? 'pl-10 bg-gray-50/50' : ''}`}>
        {isEditing ? (
          <>
            {indented && <span className="text-gray-300 text-sm">↳</span>}
            <input
              value={editName}
              onChange={e => setEditName(e.target.value)}
              autoFocus
              onKeyDown={e => { if (e.key === 'Enter') handleSaveEdit(cat._id); if (e.key === 'Escape') setEditingId(null) }}
              className="flex-1 border border-[#15A7DC] rounded-lg px-3 py-1.5 text-sm focus:outline-none"
            />
            <select
              value={editParent}
              onChange={e => setEditParent(e.target.value)}
              className="border border-gray-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-[#15A7DC]"
            >
              <option value="">No parent (top-level)</option>
              {parentOptions.filter(p => p._id !== cat._id).map(p => (
                <option key={p._id} value={p.name}>{p.name}</option>
              ))}
            </select>
            <button onClick={() => handleSaveEdit(cat._id)} disabled={saving}
              className="text-xs font-semibold text-[#15A7DC] hover:opacity-70 transition-opacity disabled:opacity-40">
              {saving ? 'Saving…' : 'Save'}
            </button>
            <button onClick={() => setEditingId(null)}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
              Cancel
            </button>
          </>
        ) : isDeleting ? (
          <>
            <span className="flex-1 text-sm text-gray-700">
              Delete <strong>{cat.name}</strong>?
            </span>
            <button onClick={() => handleDelete(cat._id)}
              className="text-xs font-semibold text-red-500 hover:text-red-700 transition-colors">
              Confirm
            </button>
            <button onClick={() => setDeleteConfirm(null)}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
              Cancel
            </button>
          </>
        ) : (
          <>
            {indented && <span className="text-gray-300 text-sm">↳</span>}
            <span className="flex-1 text-sm text-[#0A1628] font-medium">{cat.name}</span>
            <button
              onClick={() => { setEditingId(cat._id); setEditName(cat.name); setEditParent(cat.parent || ''); setError(null) }}
              className="text-xs text-gray-400 hover:text-[#15A7DC] transition-colors px-2 py-1 rounded-lg hover:bg-[#15A7DC]/5"
            >
              Edit
            </button>
            <button
              onClick={() => { setDeleteConfirm(cat._id); setError(null) }}
              className="text-xs text-gray-400 hover:text-red-500 transition-colors px-2 py-1 rounded-lg hover:bg-red-50"
            >
              Delete
            </button>
          </>
        )}
      </li>
    )
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0A1628]">Categories</h1>
        <p className="text-gray-400 text-sm mt-1">Manage the master category list. Renaming cascades to all products. Subcategories nest one level under a top-level category.</p>
      </div>

      {/* Add */}
      <form onSubmit={handleAdd} className="flex gap-2 mb-6">
        <input
          value={newName}
          onChange={e => setNewName(e.target.value)}
          placeholder="New category name…"
          className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#15A7DC] transition-colors"
        />
        <select
          value={newParent}
          onChange={e => setNewParent(e.target.value)}
          className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#15A7DC] transition-colors"
        >
          <option value="">No parent (top-level)</option>
          {parentOptions.map(p => (
            <option key={p._id} value={p.name}>Under: {p.name}</option>
          ))}
        </select>
        <button
          type="submit"
          disabled={adding || !newName.trim()}
          className="bg-[#0A1628] hover:bg-[#0F2040] text-white px-5 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-40 transition-colors"
        >
          {adding ? 'Adding…' : 'Add'}
        </button>
      </form>

      {error && (
        <div className="mb-4 px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">
          {error}
        </div>
      )}

      {/* List */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-gray-300 text-sm">Loading…</div>
        ) : categories.length === 0 ? (
          <div className="py-16 text-center text-gray-300 text-sm">No categories yet.</div>
        ) : (
          <ul className="divide-y divide-gray-50">
            {topLevel.map(cat => (
              <div key={cat._id}>
                <Row cat={cat} indented={false} />
                {childrenOf(cat.name).map(child => (
                  <Row key={child._id} cat={child} indented />
                ))}
              </div>
            ))}
          </ul>
        )}
      </div>

      <p className="text-xs text-gray-300 mt-4">
        {categories.length} categor{categories.length !== 1 ? 'ies' : 'y'} ({topLevel.length} top-level)
      </p>
    </div>
  )
}

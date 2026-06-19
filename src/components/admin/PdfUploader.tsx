'use client'

import { forwardRef, useImperativeHandle, useRef, useState } from 'react'

interface Download {
  label: string
  url: string
}

interface Pending {
  file: File
  label: string
  previewName: string
}

interface Props {
  downloads: Download[]
  onChange: (downloads: Download[]) => void
  productName?: string
}

export interface PdfUploaderHandle {
  uploadPending: () => Promise<Download[]>
}

const PdfUploader = forwardRef<PdfUploaderHandle, Props>(({ downloads, onChange, productName }, ref) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [pending, setPending] = useState<Pending[]>([])
  const [error, setError] = useState('')
  const [urlInput, setUrlInput] = useState('')
  const [showUrlInput, setShowUrlInput] = useState(false)

  useImperativeHandle(ref, () => ({
    async uploadPending() {
      if (pending.length === 0) return downloads
      setError('')
      const uploaded: Download[] = []
      for (const p of pending) {
        const fd = new FormData()
        fd.append('file', p.file)
        const res = await fetch('/api/upload-pdf', { method: 'POST', body: fd })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Upload failed')
        uploaded.push({ label: p.label, url: data.url })
      }
      const final = [...downloads, ...uploaded]
      onChange(final)
      setPending([])
      return final
    },
  }))

  function addUrl() {
    const trimmed = urlInput.trim()
    if (!trimmed) return
    const label = productName ? `Datasheet for ${productName}` : 'Product Datasheet'
    onChange([...downloads, { label, url: trimmed }])
    setUrlInput('')
    setShowUrlInput(false)
  }

  function addFile(file: File) {
    if (file.type !== 'application/pdf') { setError('Only PDF files are allowed.'); return }
    setError('')
    const label = productName ? `Datasheet for ${productName}` : file.name.replace(/\.pdf$/i, '').replace(/_/g, ' ')
    setPending(prev => [...prev, { file, label, previewName: file.name }])
  }

  function removePending(index: number) {
    setPending(prev => prev.filter((_, i) => i !== index))
  }

  function updatePendingLabel(index: number, label: string) {
    setPending(prev => prev.map((p, i) => i === index ? { ...p, label } : p))
  }

  async function removeCommitted(url: string) {
    onChange(downloads.filter(d => d.url !== url))
    await fetch('/api/upload-pdf', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    })
  }

  function updateCommittedLabel(url: string, label: string) {
    onChange(downloads.map(d => d.url === url ? { ...d, label } : d))
  }

  return (
    <div className="space-y-3">

      {/* Committed (saved) PDFs */}
      {downloads.map((d, i) => (
        <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2.5 border border-gray-100">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#15A7DC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
          </svg>
          <input value={d.label} onChange={e => updateCommittedLabel(d.url, e.target.value)}
            className="flex-1 bg-transparent text-xs text-[#0A1628] focus:outline-none min-w-0"
            placeholder="Label" />
          <a href={d.url} target="_blank" rel="noreferrer"
            className="text-[10px] text-[#15A7DC] hover:underline shrink-0">View</a>
          <button type="button" onClick={() => removeCommitted(d.url)}
            className="text-gray-300 hover:text-red-400 transition-colors shrink-0 ml-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      ))}

      {/* Pending (not yet uploaded) PDFs */}
      {pending.map((p, i) => (
        <div key={i} className="flex items-center gap-2 bg-blue-50 rounded-xl px-3 py-2.5 border border-[#15A7DC]/20">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#15A7DC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
          </svg>
          <input value={p.label} onChange={e => updatePendingLabel(i, e.target.value)}
            className="flex-1 bg-transparent text-xs text-[#0A1628] focus:outline-none min-w-0"
            placeholder="Label" />
          <span className="text-[10px] text-[#15A7DC] shrink-0">Pending</span>
          <button type="button" onClick={() => removePending(i)}
            className="text-gray-300 hover:text-red-400 transition-colors shrink-0 ml-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      ))}

      <div className="flex gap-2">
        <button type="button" onClick={() => inputRef.current?.click()}
          className="flex items-center gap-2 text-xs text-[#15A7DC] border border-dashed border-[#15A7DC]/40 hover:border-[#15A7DC] rounded-xl px-4 py-2.5 flex-1 justify-center transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Upload PDF
        </button>
        <button type="button" onClick={() => setShowUrlInput(v => !v)}
          className="flex items-center gap-2 text-xs text-gray-400 border border-dashed border-gray-200 hover:border-[#15A7DC] hover:text-[#15A7DC] rounded-xl px-4 py-2.5 flex-1 justify-center transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
          </svg>
          Paste URL
        </button>
      </div>

      {showUrlInput && (
        <div className="flex gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={e => setUrlInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addUrl())}
            placeholder="https://example.com/datasheet.pdf"
            className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#15A7DC] transition-colors"
          />
          <button type="button" onClick={addUrl}
            className="bg-[#0A1628] text-white px-4 py-2.5 rounded-xl text-xs font-semibold hover:bg-[#0F2040] transition-colors shrink-0">
            Add
          </button>
        </div>
      )}

      <input ref={inputRef} type="file" accept="application/pdf" className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if (f) addFile(f); e.target.value = '' }} />

      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
})

PdfUploader.displayName = 'PdfUploader'
export default PdfUploader

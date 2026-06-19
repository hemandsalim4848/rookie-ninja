'use client'

import { useRef, useState } from 'react'

interface Download {
  label: string
  url: string
}

interface Props {
  downloads: Download[]
  onChange: (downloads: Download[]) => void
}

export default function PdfUploader({ downloads, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  async function handleFile(file: File) {
    if (file.type !== 'application/pdf') {
      setError('Only PDF files are allowed.')
      return
    }
    setUploading(true)
    setError('')
    const fd = new FormData()
    fd.append('file', file)
    try {
      const res = await fetch('/api/upload-pdf', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Upload failed')
      const label = file.name.replace(/\.pdf$/i, '').replace(/_/g, ' ')
      onChange([...downloads, { label, url: data.url }])
    } catch (e: any) {
      setError(e.message || 'Upload failed')
    }
    setUploading(false)
  }

  async function handleDelete(url: string) {
    onChange(downloads.filter(d => d.url !== url))
    await fetch('/api/upload-pdf', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    })
  }

  function updateLabel(url: string, label: string) {
    onChange(downloads.map(d => d.url === url ? { ...d, label } : d))
  }

  return (
    <div className="space-y-3">
      {downloads.map((d, i) => (
        <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2.5 border border-gray-100">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#15A7DC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
          </svg>
          <input
            value={d.label}
            onChange={e => updateLabel(d.url, e.target.value)}
            className="flex-1 bg-transparent text-xs text-[#0A1628] focus:outline-none min-w-0"
            placeholder="Label (e.g. Datasheet)"
          />
          <a href={d.url} target="_blank" rel="noreferrer"
            className="text-[10px] text-[#15A7DC] hover:underline shrink-0">View</a>
          <button onClick={() => handleDelete(d.url)}
            className="text-gray-300 hover:text-red-400 transition-colors shrink-0 ml-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="flex items-center gap-2 text-xs text-[#15A7DC] border border-dashed border-[#15A7DC]/40 hover:border-[#15A7DC] rounded-xl px-4 py-2.5 w-full justify-center transition-colors disabled:opacity-50"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
        {uploading ? 'Uploading...' : 'Upload PDF'}
      </button>
      <input ref={inputRef} type="file" accept="application/pdf" className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = '' }} />

      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}

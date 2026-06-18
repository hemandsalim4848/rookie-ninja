'use client'

import { useRef, useState } from 'react'

interface Props {
  images: string[]
  onChange: (images: string[]) => void
}

function getPublicId(url: string) {
  try {
    const parts = new URL(url).pathname.split('/')
    const uploadIdx = parts.indexOf('upload')
    if (uploadIdx === -1) return null
    const withVersion = parts.slice(uploadIdx + 1).join('/')
    return withVersion.replace(/^v\d+\//, '').replace(/\.[^/.]+$/, '')
  } catch {
    return null
  }
}

export default function ImageUploader({ images, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [error, setError] = useState('')

  async function uploadFiles(files: FileList | File[]) {
    setUploading(true)
    setError('')
    const newUrls: string[] = []

    for (const file of Array.from(files)) {
      if (!file.type.startsWith('image/')) continue
      const fd = new FormData()
      fd.append('file', file)
      try {
        const res = await fetch('/api/upload', { method: 'POST', body: fd })
        const data = await res.json()
        if (data.url) newUrls.push(data.url)
        else setError('Upload failed for one or more images.')
      } catch {
        setError('Upload failed. Please try again.')
      }
    }

    onChange([...images, ...newUrls])
    setUploading(false)
  }

  async function removeImage(url: string, index: number) {
    const publicId = getPublicId(url)
    if (publicId) {
      try {
        await fetch('/api/upload', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ publicId }),
        })
      } catch {}
    }
    onChange(images.filter((_, i) => i !== index))
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragOver(false)
    if (e.dataTransfer.files?.length) uploadFiles(e.dataTransfer.files)
  }

  return (
    <div className="space-y-3">

      {/* Image previews */}
      {images.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {images.map((url, i) => (
            <div key={i} className="relative group w-20 h-20 rounded-xl overflow-hidden border border-gray-200">
              <img src={url} alt="" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removeImage(url, i)}
                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                  <path d="M10 11v6M14 11v6" />
                  <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Drop zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl px-4 py-6 cursor-pointer transition-colors ${
          dragOver ? 'border-[#15A7DC] bg-[#15A7DC]/5' : 'border-gray-200 hover:border-[#15A7DC] hover:bg-gray-50'
        }`}
      >
        {uploading ? (
          <p className="text-sm text-gray-400">Uploading...</p>
        ) : (
          <>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#15A7DC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 16 12 12 8 16" />
              <line x1="12" y1="12" x2="12" y2="21" />
              <path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3" />
            </svg>
            <p className="text-sm text-gray-400">
              <span className="text-[#15A7DC] font-medium">Click to upload</span> or drag & drop
            </p>
            <p className="text-xs text-gray-300">PNG, JPG, WEBP supported</p>
          </>
        )}
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={e => e.target.files && uploadFiles(e.target.files)}
      />
    </div>
  )
}

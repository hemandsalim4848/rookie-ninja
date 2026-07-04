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

  // Index being dragged; null when not dragging
  const dragIndex = useRef<number | null>(null)
  const [dropTarget, setDropTarget] = useState<number | null>(null)

  /* ── Upload ── */
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

  /* ── Reorder (drag between thumbnails) ── */
  function onThumbDragStart(e: React.DragEvent, i: number) {
    dragIndex.current = i
    e.dataTransfer.effectAllowed = 'move'
    // Use a transparent image so the ghost doesn't show
    const ghost = document.createElement('div')
    ghost.style.position = 'absolute'
    ghost.style.top = '-9999px'
    document.body.appendChild(ghost)
    e.dataTransfer.setDragImage(ghost, 0, 0)
    setTimeout(() => document.body.removeChild(ghost), 0)
  }

  function onThumbDragOver(e: React.DragEvent, i: number) {
    e.preventDefault()
    e.stopPropagation()
    if (dragIndex.current !== null && dragIndex.current !== i) setDropTarget(i)
  }

  function onThumbDrop(e: React.DragEvent, i: number) {
    e.preventDefault()
    e.stopPropagation()
    const from = dragIndex.current
    if (from === null || from === i) { cleanup(); return }
    const reordered = [...images]
    const [moved] = reordered.splice(from, 1)
    reordered.splice(i, 0, moved)
    onChange(reordered)
    cleanup()
  }

  function cleanup() {
    dragIndex.current = null
    setDropTarget(null)
  }

  /* ── Set primary ── */
  function setPrimary(index: number) {
    if (index === 0) return
    const reordered = [...images]
    const [picked] = reordered.splice(index, 1)
    onChange([picked, ...reordered])
  }

  /* ── Delete ── */
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

  /* ── File drop zone ── */
  function onZoneDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragOver(false)
    // Ignore thumbnail reorder drops that bubble up
    if (dragIndex.current !== null) { cleanup(); return }
    if (e.dataTransfer.files?.length) uploadFiles(e.dataTransfer.files)
  }

  return (
    <div className="space-y-3">

      {/* Image thumbnails */}
      {images.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {images.map((url, i) => (
            <div
              key={url + i}
              draggable
              onDragStart={e => onThumbDragStart(e, i)}
              onDragOver={e => onThumbDragOver(e, i)}
              onDrop={e => onThumbDrop(e, i)}
              onDragEnd={cleanup}
              className="relative group w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-150 cursor-grab active:cursor-grabbing"
              style={{
                borderColor: i === 0 ? '#15A7DC' : dropTarget === i ? '#15A7DC' : '#e5e7eb',
                opacity: dragIndex.current === i ? 0.4 : 1,
                transform: dropTarget === i && dragIndex.current !== i ? 'scale(1.06)' : 'scale(1)',
              }}
            >
              <img src={url} alt="" className="w-full h-full object-cover pointer-events-none" />

              {/* Primary badge */}
              {i === 0 && (
                <span className="absolute top-1 left-1 text-[9px] font-bold bg-[#15A7DC] text-white px-1.5 py-0.5 rounded leading-none pointer-events-none">
                  Primary
                </span>
              )}

              {/* Drag handle hint */}
              <div className="absolute bottom-1 right-1 opacity-0 group-hover:opacity-60 transition-opacity pointer-events-none">
                <svg width="10" height="10" viewBox="0 0 16 16" fill="white">
                  <circle cx="5" cy="4" r="1.5"/><circle cx="11" cy="4" r="1.5"/>
                  <circle cx="5" cy="8" r="1.5"/><circle cx="11" cy="8" r="1.5"/>
                  <circle cx="5" cy="12" r="1.5"/><circle cx="11" cy="12" r="1.5"/>
                </svg>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5">
                {i !== 0 && (
                  <button
                    type="button"
                    title="Set as primary"
                    onClick={() => setPrimary(i)}
                    className="flex items-center justify-center w-7 h-7 rounded-full bg-[#15A7DC] hover:bg-[#0d8fb8] transition-colors"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="white" stroke="none">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => removeImage(url, i)}
                  className="flex items-center justify-center w-7 h-7 rounded-full bg-white/20 hover:bg-red-500 transition-colors"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                    <path d="M10 11v6M14 11v6" />
                    <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload drop zone */}
      <div
        onDragOver={e => { e.preventDefault(); if (dragIndex.current === null) setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onZoneDrop}
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

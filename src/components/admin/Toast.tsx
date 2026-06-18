'use client'

import { useEffect } from 'react'

export type ToastType = 'success' | 'error' | 'info'

interface Props {
  message: string
  type: ToastType
  onClose: () => void
}

const styles = {
  success: 'bg-green-50 border-green-200 text-green-700',
  error: 'bg-red-50 border-red-200 text-red-600',
  info: 'bg-[#15A7DC]/10 border-[#15A7DC]/30 text-[#0d8fb8]',
}

const icons = {
  success: <polyline points="20 6 9 17 4 12" />,
  error: <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>,
  info: <><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></>,
}

export default function Toast({ message, type, onClose }: Props) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000)
    return () => clearTimeout(t)
  }, [message])

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-sm text-sm font-medium max-w-sm ${styles[type]}`}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
        {icons[type]}
      </svg>
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 opacity-50 hover:opacity-100 transition-opacity">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
  )
}

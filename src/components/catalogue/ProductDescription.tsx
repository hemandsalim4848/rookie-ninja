import React from 'react'

interface Props {
  description: string
  shortDescription?: string
}

function parseFeatures(text: string): string[] {
  const lines = text.split('\n')
  const features: string[] = []
  for (const line of lines) {
    const cleaned = line.replace(/^[-•*]\s*/, '').trim()
    if (cleaned.length > 5 && cleaned.length < 120) {
      features.push(cleaned)
    }
  }
  return features.slice(0, 6)
}

function parseSections(text: string): { title: string; body: string }[] {
  const sections: { title: string; body: string }[] = []
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean)
  let current: { title: string; body: string } | null = null

  for (const line of lines) {
    const isHeading = line.length < 60 && (
      line.endsWith('.') === false &&
      !line.includes(',') &&
      line === line.replace(/[^a-zA-Z0-9\s&/-]/g, '')
    )
    if (isHeading && line.split(' ').length <= 6) {
      if (current && current.body.trim()) sections.push(current)
      current = { title: line, body: '' }
    } else {
      if (!current) current = { title: '', body: '' }
      current.body += ' ' + line
    }
  }
  if (current && current.body.trim()) sections.push(current)
  return sections.filter(s => s.body.trim().length > 20).slice(0, 3)
}

function extractHighlights(text: string): { icon: string; label: string; value: string }[] {
  const highlights: { icon: string; label: string; value: string }[] = []
  const lower = text.toLowerCase()

  const patterns = [
    { regex: /(\d+w)\s*(usb|power|charging)/i, label: 'Power Output', icon: '⚡' },
    { regex: /usb-if certified/i, label: 'Certification', icon: '🛡️' },
    { regex: /(\d+)-year\s*\w*\s*warranty/i, label: 'Warranty', icon: '✅' },
    { regex: /plastic.free/i, label: 'Packaging', icon: '🌿' },
    { regex: /(\d+)\s*m\s*(cable|length|cord)/i, label: 'Cable Length', icon: '📏' },
    { regex: /bluetooth\s*([\d.]+)/i, label: 'Bluetooth', icon: '📶' },
    { regex: /(\d+)\s*mah/i, label: 'Battery', icon: '🔋' },
    { regex: /water.?proof|ipx?\d/i, label: 'Protection', icon: '💧' },
    { regex: /mfi.?approved|mfi certified/i, label: 'MFi', icon: '🍎' },
    { regex: /(\d+)\s*port/i, label: 'Ports', icon: '🔌' },
  ]

  for (const p of patterns) {
    const match = text.match(p.regex)
    if (match) {
      let value = match[1] || match[0]
      value = value.charAt(0).toUpperCase() + value.slice(1)
      if (p.label === 'Certification') value = 'USB-IF Certified'
      if (p.label === 'Packaging') value = '100% Plastic Free'
      if (p.label === 'MFi') value = 'MFi Approved'
      if (p.label === 'Warranty') value = `${match[1]}-Year Warranty`
      highlights.push({ icon: p.icon, label: p.label, value })
      if (highlights.length === 4) break
    }
  }

  return highlights
}

export default function ProductDescription({ description, shortDescription }: Props) {
  if (!description && !shortDescription) {
    return (
      <p className="text-[#0A1628]/40 text-sm">No description available.</p>
    )
  }

  const fullText = [shortDescription, description].filter(Boolean).join('\n')
  const highlights = extractHighlights(fullText)
  const features = parseFeatures(fullText)
  const sections = parseSections(description || '')
  const leadText = shortDescription?.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()

  return (
    <div className="max-w-3xl">

      {/* Lead paragraph */}
      {leadText && (
        <p className="text-base text-[#0A1628] leading-relaxed mb-8 pl-5 border-l-[3px] border-[#15A7DC]">
          {leadText}
        </p>
      )}

      {/* Highlight cards */}
      {highlights.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {highlights.map((h, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-4 flex flex-col gap-1.5">
              <span className="text-xl">{h.icon}</span>
              <span className="text-[10px] text-[#0A1628]/40 uppercase tracking-widest font-medium">
                {h.label}
              </span>
              <span className="text-sm font-semibold text-[#0A1628] leading-tight">
                {h.value}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Divider */}
      {highlights.length > 0 && (
        <div className="h-px bg-gray-100 mb-8" />
      )}

      {/* Body sections */}
      {sections.length > 0 && (
        <div className="space-y-6 mb-8">
          {sections.map((section, i) => (
            <div key={i}>
              {section.title && (
                <p className="text-[11px] font-semibold text-[#15A7DC] uppercase tracking-widest mb-2">
                  {section.title}
                </p>
              )}
              <p className="text-sm text-[#0A1628]/60 leading-relaxed">
                {section.body.trim()}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Key features */}
      {features.length > 0 && (
        <>
          <div className="h-px bg-gray-100 mb-8" />
          <div>
            <p className="text-[11px] font-semibold text-[#15A7DC] uppercase tracking-widest mb-4">
              Key Features
            </p>
            <ul className="space-y-3">
              {features.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#0A1628]/60 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#15A7DC] mt-2 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  )
}
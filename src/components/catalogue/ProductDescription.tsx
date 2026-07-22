import React from 'react'

interface Props {
  description: string
  shortDescription?: string
  images?: string[]
}

// ── Structured format (admin-authored, rich layout) ───────────────────────────
// [stats: Value§Label | Value§Label | Value§Label]
// Intro paragraph (no heading)
// ## Section heading
// Section body paragraph
// ─────────────────────────────────────────────────────────────────────────────

function parseStructured(text: string): {
  stats: { value: string; label: string }[]
  lead: string
  sections: { heading: string; body: string }[]
} | null {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean)
  if (!lines[0]?.startsWith('[stats:')) return null

  const statsLine = lines[0].replace(/^\[stats:\s*/, '').replace(/\]$/, '')
  const stats = statsLine.split('|').map(s => {
    const [value, label] = s.trim().split('§')
    return { value: value?.trim() ?? '', label: label?.trim() ?? '' }
  }).filter(s => s.value && s.label)

  const sections: { heading: string; body: string }[] = []
  let current: { heading: string; body: string } | null = null
  let lead = ''

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]
    if (line.startsWith('## ')) {
      if (current) sections.push(current)
      current = { heading: line.replace('## ', ''), body: '' }
    } else {
      if (!current) {
        lead += (lead ? ' ' : '') + line
      } else {
        current.body += (current.body ? ' ' : '') + line
      }
    }
  }
  if (current) sections.push(current)

  return { stats, lead, sections }
}

// ── Plain-text renderer (every catalogue-imported product) ───────────────────
// Descriptions come in as one continuous block with no line breaks, so we
// split on sentence boundaries and regroup into evenly-sized paragraphs
// rather than showing either one giant wall of text or repeating the
// shortDescription bullets that already sit beside the image slider.

function splitIntoSentences(text: string): string[] {
  const clean = text.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
  if (!clean) return []
  return clean.split(/(?<=[.!?])\s+(?=[A-Z0-9])/).map(s => s.trim()).filter(Boolean)
}

function groupIntoParagraphs(sentences: string[], targetChars = 260): string[] {
  const paragraphs: string[] = []
  let current = ''
  for (const s of sentences) {
    if (current && current.length + s.length > targetChars) {
      paragraphs.push(current)
      current = s
    } else {
      current = current ? `${current} ${s}` : s
    }
  }
  if (current) paragraphs.push(current)
  return paragraphs
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function ProductDescription({ description, shortDescription, images }: Props) {
  if (!description && !shortDescription) {
    return <p className="text-[#0A1628]/40 text-sm">No description available.</p>
  }

  const structured = description ? parseStructured(description) : null

  // ── Editorial layout (structured format) ──────────────────────────────────
  if (structured) {
    const { stats, lead, sections } = structured
    const heroImage = images?.[0]
    const bodyCount = sections.length
    const lastIdx = bodyCount - 1

    return (
      <div className="max-w-3xl">

        {/* Stat callouts */}
        {stats.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mb-8">
            {stats.map((s, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                <p className="text-xl font-semibold text-[#15A7DC] mb-1 leading-tight">{s.value}</p>
                <p className="text-[11px] text-[#0A1628]/45 leading-snug tracking-wide uppercase">{s.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Lead paragraph */}
        {lead && (
          <p className="text-[14px] text-[#0A1628]/70 leading-relaxed mb-8 pl-4 border-l-[3px] border-[#15A7DC]">
            {lead}
          </p>
        )}

        {/* Section cards */}
        {sections.map((sec, i) => {
          const isLast = i === lastIdx
          const isEven = i % 2 === 0
          const tag = String(i + 1).padStart(2, '0')

          // Last section → full-width banner
          if (isLast) {
            return (
              <div
                key={i}
                className="border border-gray-100 rounded-2xl p-6 mb-3 flex gap-5 items-start bg-gray-50/60"
              >
                <div className="w-12 h-12 rounded-xl bg-[#15A7DC]/10 flex items-center justify-center shrink-0" />
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.1em] uppercase text-[#15A7DC] mb-2">{tag} — {sec.heading}</p>
                  <p className="text-[13px] text-[#0A1628]/60 leading-relaxed">{sec.body}</p>
                </div>
              </div>
            )
          }

          // First section with product image → image gets a real photo
          const usePhoto = i === 0 && heroImage
          const imgPane = usePhoto ? (
            <div className="bg-gray-50 rounded-xl overflow-hidden" style={{ minHeight: 200 }}>
              <img
                src={heroImage}
                alt={sec.heading}
                className="w-full h-full object-contain p-4"
                style={{ minHeight: 180, maxHeight: 220 }}
              />
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl flex flex-col items-center justify-center gap-3 p-8" style={{ minHeight: 180 }}>
              <div className="w-14 h-14 rounded-2xl bg-[#15A7DC]/10 flex items-center justify-center" />
              <p className="text-[11px] text-[#0A1628]/30 text-center leading-snug max-w-[120px]">{sec.heading}</p>
            </div>
          )

          const textPane = (
            <div className="flex flex-col justify-center py-1">
              <p className="text-[10px] font-semibold tracking-[0.1em] uppercase text-[#15A7DC] mb-2">{tag} — {sec.heading}</p>
              <p className="text-[13px] text-[#0A1628]/60 leading-relaxed">{sec.body}</p>
            </div>
          )

          return (
            <div
              key={i}
              className="grid gap-5 border border-gray-100 rounded-2xl overflow-hidden mb-3"
              style={{ gridTemplateColumns: '1fr 1fr' }}
            >
              {isEven ? (
                <>
                  <div>{imgPane}</div>
                  <div className="pr-5 py-5">{textPane}</div>
                </>
              ) : (
                <>
                  <div className="pl-5 py-5">{textPane}</div>
                  <div>{imgPane}</div>
                </>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  // ── Plain-text layout (every product today) ────────────────────────────────
  // Use the long-form description when present; only fall back to the
  // shortDescription bullets (already shown beside the image) when a
  // product has nothing else — never render both.
  const sentences = description
    ? splitIntoSentences(description)
    : splitIntoSentences((shortDescription || '').split('\n').join('. '))

  if (sentences.length === 0) {
    return <p className="text-[#0A1628]/40 text-sm">No description available.</p>
  }

  const [lead, ...rest] = sentences
  const paragraphs = groupIntoParagraphs(rest)

  return (
    <div className="max-w-3xl">
      <p className="text-base text-[#0A1628] leading-relaxed mb-6 pl-5 border-l-[3px] border-[#15A7DC]">
        {lead}
      </p>
      <div className="space-y-4">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-sm text-[#0A1628]/65 leading-relaxed">{p}</p>
        ))}
      </div>
    </div>
  )
}

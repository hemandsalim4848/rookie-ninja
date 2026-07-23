'use client'

import { useEffect } from 'react'

// Next.js streaming bug on this route: the whole page (main, h1, the
// JSON-LD script tags, everything) gets duplicated into a hidden
// <div id="S:n"> after hydration and is never cleaned up — reproduces even
// with loading.tsx removed and a fully static generateMetadata, so it's a
// framework quirk, not this page's content. Google's structured-data
// parser reads <script type="application/ld+json"> regardless of
// visibility, so the stale copy is stripped here rather than left in the DOM.
export default function CleanupStreamingArtifact() {
  useEffect(() => {
    document.querySelectorAll('div[hidden][id^="S:"]').forEach(el => el.remove())
  }, [])

  return null
}

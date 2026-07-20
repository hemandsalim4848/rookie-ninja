import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Pages retired with no content equivalent on the new site.
// 410 tells search engines the page is permanently gone, so it drops
// out of the index faster than a 404 would.
const GONE_PATHS = new Set([
  '/itdistribution',
  '/rowe-scan',
  '/belkin',
  '/silex-networking',
  '/ezofis',
  '/ezofis-3',
  '/elar-scan',
  '/asustor',
  '/avita',
  '/eset',
  '/optimidoc',
  '/nexvoo-av',
  '/vaio-laptops',
])

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname.replace(/\/$/, '') || '/'
  if (GONE_PATHS.has(pathname)) {
    return new NextResponse(null, { status: 410 })
  }
  return NextResponse.next()
}

// Next.js statically analyzes `matcher`, so it must be a literal array
// (no spreading/computing from GONE_PATHS here).
export const config = {
  matcher: [
    '/itdistribution', '/itdistribution/',
    '/rowe-scan', '/rowe-scan/',
    '/belkin', '/belkin/',
    '/silex-networking', '/silex-networking/',
    '/ezofis', '/ezofis/',
    '/ezofis-3', '/ezofis-3/',
    '/elar-scan', '/elar-scan/',
    '/asustor', '/asustor/',
    '/avita', '/avita/',
    '/eset', '/eset/',
    '/optimidoc', '/optimidoc/',
    '/nexvoo-av', '/nexvoo-av/',
    '/vaio-laptops', '/vaio-laptops/',
  ],
}

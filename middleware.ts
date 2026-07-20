import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Pages retired with no content equivalent on the new site.
// 410 tells search engines the page is permanently gone, so it drops
// out of the index faster than a 404 would.
const GONE_PATHS = new Set(['/itdistribution'])

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname.replace(/\/$/, '') || '/'
  if (GONE_PATHS.has(pathname)) {
    return new NextResponse(null, { status: 410 })
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/itdistribution', '/itdistribution/'],
}

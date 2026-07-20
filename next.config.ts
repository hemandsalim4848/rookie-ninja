import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== 'production'

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://res.cloudinary.com",
  "font-src 'self' data:",
  "frame-src https://www.google.com https://maps.google.com https://www.youtube.com",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
].join('; ')

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/brother/brother-ads-1200-portable-scanner',
        destination: '/brother/brother-ads-1200-portable-document-scanner',
        permanent: true,
      },
      {
        source: '/brother/brother-ads-3600w-scanner',
        destination: '/brother/brother-ads-3600w-desktop-document-scanner',
        permanent: true,
      },
      {
        source: '/brother/brother-ads-4300n-professional-desktop-document-scanner',
        destination: '/brother/brother-ads-4300n-desktop-document-scanner',
        permanent: true,
      },
      {
        source: '/audiovisual',
        destination: '/audio-visual',
        permanent: true,
      },
      {
        source: '/mobility',
        destination: '/it-accessories',
        permanent: true,
      },
      {
        source: '/components',
        destination: '/gaming',
        permanent: true,
      },
      {
        source: '/power-solutions',
        destination: '/gaming',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
};

export default nextConfig;

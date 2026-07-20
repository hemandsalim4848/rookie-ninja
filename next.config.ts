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
        destination: '/products/brother-ads-1200-portable-document-scanner',
        permanent: true,
      },
      {
        source: '/brother/brother-ads-3600w-scanner',
        destination: '/products/brother-ads-3600w-desktop-document-scanner',
        permanent: true,
      },
      {
        source: '/brother/brother-ads-4300n-professional-desktop-document-scanner',
        destination: '/products/brother-ads-4300n-desktop-document-scanner',
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
      {
        source: '/job-form-business-operations-manager',
        destination: '/careers',
        permanent: true,
      },
      {
        source: '/job-form-product-manager-display-solutions',
        destination: '/careers',
        permanent: true,
      },
      {
        source: '/job-form-product-manager-gaming',
        destination: '/careers',
        permanent: true,
      },
      {
        source: '/job-form-accountant',
        destination: '/careers',
        permanent: true,
      },
      {
        source: '/job-form-product-sales-specialist-print',
        destination: '/careers',
        permanent: true,
      },
      {
        source: '/job-form-product-sales-specialist-scan',
        destination: '/careers',
        permanent: true,
      },
      {
        source: '/equal-opportunity',
        destination: '/careers',
        permanent: true,
      },
      {
        source: '/wp-content/uploads/2025/05/RN-Company-Profile-2025-min.pdf',
        destination: '/company-profile.pdf',
        permanent: true,
      },
      {
        source: '/kodak',
        destination: '/our-vendors/kodak-alaris',
        permanent: true,
      },
      {
        source: '/viewsonic-av',
        destination: '/our-vendors/viewsonic-av',
        permanent: true,
      },
      {
        source: '/dicota-bags',
        destination: '/our-vendors/dicota',
        permanent: true,
      },
      {
        source: '/dahua-technology',
        destination: '/our-vendors/dahua',
        permanent: true,
      },
      {
        source: '/ricoh',
        destination: '/our-vendors/ricoh',
        permanent: true,
      },
      {
        source: '/brother',
        destination: '/our-vendors/brother',
        permanent: true,
      },
      {
        source: '/canon',
        destination: '/our-vendors/canon',
        permanent: true,
      },
      {
        source: '/czur',
        destination: '/our-vendors/czur',
        permanent: true,
      },
      {
        source: '/colortrac',
        destination: '/our-vendors/colortrac',
        permanent: true,
      },
      {
        source: '/unv',
        destination: '/our-vendors/unv',
        permanent: true,
      },
      {
        source: '/aerocool',
        destination: '/our-vendors/aerocool',
        permanent: true,
      },
      {
        source: '/msi',
        destination: '/our-vendors/msi',
        permanent: true,
      },
      {
        source: '/aztech',
        destination: '/our-vendors/aztech',
        permanent: true,
      },
      {
        source: '/deli',
        destination: '/our-vendors/deli',
        permanent: true,
      },
      {
        source: '/contex',
        destination: '/our-vendors/contex',
        permanent: true,
      },
      {
        source: '/vision',
        destination: '/about/mission',
        permanent: true,
      },
      {
        source: '/team',
        destination: '/about/team',
        permanent: true,
      },
      {
        source: '/overview',
        destination: '/partner-central',
        permanent: true,
      },
      {
        source: '/become-a-partner',
        destination: '/partner-central',
        permanent: true,
      },
      {
        source: '/become-partner',
        destination: '/partner-central',
        permanent: true,
      },
      {
        source: '/why-choose-us-partner',
        destination: '/partner-central',
        permanent: true,
      },
      {
        source: '/printers',
        destination: '/print-solutions',
        permanent: true,
      },
      {
        source: '/uniarch',
        destination: '/our-vendors/unv',
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

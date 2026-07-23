import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { connectDB } from '@/src/lib/mongodb'
import { Product } from '@/src/lib/models/Products'

// Next.js/Turbopack has a long-standing bug where notFound() called from a
// dynamic page returns HTTP 200 instead of 404 (vercel/next.js#76474) —
// reproduced exhaustively for this exact route (dev + production build,
// full cache wipes, renamed segment) with no code-level fix found. Search
// engines need a real 404 for gone products, so the existence check is done
// here instead, where status codes aren't subject to that bug.
const NOT_FOUND_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Page Not Found — Rookie Ninja</title>
<style>
  body { margin: 0; font-family: system-ui, -apple-system, sans-serif; background: #fff; }
  main { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 0 16px; }
  .code { font-size: 6rem; font-weight: 700; color: rgba(10, 22, 40, 0.1); margin: 0 0 16px; }
  h1 { font-size: 1.5rem; font-weight: 700; color: #0A1628; margin: 0 0 8px; }
  .sub { color: #9ca3af; font-size: 0.875rem; margin: 0 0 32px; }
  .btn { background: #0A1628; color: #fff; font-size: 0.875rem; font-weight: 600; padding: 12px 24px; border-radius: 12px; text-decoration: none; display: inline-block; }
  .btn:hover { background: #15A7DC; }
</style>
</head>
<body>
<main>
  <p class="code">404</p>
  <h1>Page Not Found</h1>
  <p class="sub">The page you're looking for doesn't exist or has been moved.</p>
  <a class="btn" href="/">Back to Home</a>
</main>
</body>
</html>`

// ============================================================
// rookie-ninja.com (main site) — pages retired with no content
// equivalent on the new site. 410 tells search engines the page
// is permanently gone, so it drops out of the index faster than
// a 404 would.
// ============================================================
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
  '/eset-nod32',
  '/msi-modern-am242tp-12m',
  '/viewsonic-ifp-7532',
  '/epson',
  '/intex',
  '/asustor-nas-storage',
])

// ============================================================
// products.rookie-ninja.com (old product catalogue) — being
// merged into this same app. Old URL shapes:
//   /product/:slug            individual product page
//   /brand/:slug              brand-listing (taxonomy) page
//   /product-category/:slug   category-listing (taxonomy) page
//   /shop /cart /checkout /my-account   WooCommerce system pages
// ============================================================

// Old product slug -> current DB slug, for the ~65 products whose
// slug changed wording between the old catalogue and this site.
// Every mapping here was individually verified against the database
// (not just fuzzy-matched) before being treated as a redirect target.
const PRODUCT_RENAME_MAP: Record<string, string> = {
  "brother-ads-1200-portable-scanner": "brother-ads-1200-portable-document-scanner",
  "canon-imageformula-cr-190i-ii-series": "canon-cr-190i-ii-uv-cheque-scanner",
  "kodak-s3120-scanner": "kodak-s3120-max-scanner",
  "brother-hl-l2375dw-monochrome-laser-printer": "brother-hl-l2375dw",
  "brother-hl-l5200dw-mono-laser-printer": "brother-hl-l5200dw",
  "brother-hl-l6200dw-mono-laser-printer": "brother-hl-l6200dw",
  "brother-hl-l6400dw-mono-laser-printer": "brother-hl-l6400dw",
  "brother-dcp-l2550dw-all-in-one-monochrome-laser-printer": "brother-dcp-l2550dw",
  "brother-mfc-l2715dw-all-in-one-monochrome-laser-printer": "brother-mfc-l2715dw",
  "brother-mfc-l2750dw-all-in-one-monochrome-laser-printer": "brother-mfc-l2750dw",
  "brother-mfc-l5755dw-mono-laser-multi-function-printer": "brother-mfc-l5755dw",
  "brother-hl-l3270cdw-colour-laser-printer": "brother-hl-l3270cdw",
  "brother-hl-l8360cdw-colour-laser-printer": "brother-hl-l8360cdw",
  "brother-mfc-l3750cdw-colour-laser-multi-function-printer": "brother-mfc-l3750cdw",
  "brother-mfc-l8690cdw-colour-laser-multi-function-printer": "brother-mfc-l8690cdw",
  "brother-mfc-l9570cdw-colour-laser-multi-function-printer": "brother-mfc-l9570cdw",
  "brother-dcp-l3510cdw-colour-laser-multi-function-printer": "brother-dcp-l3510cdw",
  "brother-dcp-l3551cdw-colour-laser-multi-function-printer": "brother-dcp-l3551cdw",
  "brother-hl-l2370dn-mono-laser-printer": "brother-hl-l2370dn",
  "viewsonic-x100-4k": "viewsonic-x100-4k-plus",
  "viewsonic-x1000-4k": "viewsonic-x1000-4k-plus",
  "viewsonic-x10-4k": "viewsonic-x10-4k-plus",
  "brother-ads-4300n-professional-desktop-document-scanner": "brother-ads-4300n-desktop-document-scanner",
  "viewsonic-direct-vbd100": "viewsonic-vbd100",
  "brother-mfc-l6900dw-mono-laser-multifunction-printer": "brother-mfc-l6900dw",
  "viewsonic-td1655-2": "viewsonic-td1655",
  "brother-dcp-l2535d-mono-laser-multi-function-printer": "brother-dcp-l2535d",
  "brother-ads-3600w-scanner": "brother-ads-3600w-desktop-document-scanner",
  "brother-hl-l2400d-mono-laser-printer": "brother-hl-l2400d",
  "brother-hl-l2460dn-mono-laser-printer": "brother-hl-l2460dn",
  "brother-hl-l2461dw-mono-laser-printer": "brother-hl-l2461dw",
  "deli-p1820w-a4-monochrome-laser-printer": "deli-p1820w",
  "deli-m1820w-colour-mfp-laser-a4-printer": "deli-m1820w",
  "deli-m3100adnw-monochrome-laser-a4-printer": "deli-m3100adnw",
  "dicota-usb-c-12-in-1-docking-station-5k-hdmi-dp-pd-100w-uk": "dicota-usb-c-12-in-1-docking-station-5k-hdmidp-pd-100w-uk",
  "dicota-secret-2-way-magnetic-macbook-pro-15-macbook-pro-retina-15-2012-2015": "dicota-secret-2-way-magnetic-macbook-pro-15macbook-pro-retina-15-2012-2015",
  "brother-dcp-l2600d-mono-laser-printer": "brother-dcp-l2600d",
  "brother-dcp-l2625dw-mono-laser-printer": "brother-dcp-l2625dw",
  "brother-dcp-l2640dw-mono-laser-printer": "brother-dcp-l2640dw",
  "brother-mfc-l2805dw-mono-laser-printer": "brother-mfc-l2805dw",
  "brother-mfc-l2885dw-mono-laser-printer": "brother-mfc-l2885dw",
  "brother-hl-l3220cw-color-laser-printer": "brother-hl-l3220cw",
  "brother-hl-l3280cdw-color-laser-printer": "brother-hl-l3280cdw",
  "brother-dcp-l3520cdw-color-laser-printer": "brother-dcp-l3520cdw",
  "brother-mfc-l3720cdw-color-laser-printer": "brother-mfc-l3720cdw",
  "brother-dcp-l3560cdw-color-laser-printer": "brother-dcp-l3560cdw",
  "brother-mfc-l3760cdw-color-laser-printer": "brother-mfc-l3760cdw",
  "brother-mfc-l8390cdw-color-laser-printer": "brother-mfc-l8390cdw",
  "canon-sf400": "canon-scanfront-400-document-scanner",
  "canon-imageformula-dr-c340-c350": "canon-imageformula-dr-c340c350",
  "dahua-lph75-mc420-c-s2for-project": "dahua-lph75-mc420-c-s2-project",
  "32-smart-movable-screen-4k": "aztech-32-smart-movable-screen-4k",
  "32-smart-movable-screen": "aztech-32-smart-movable-screen",
  "heavy-duty-trolley-stand-pro-for-62-to-120": "aztech-heavy-duty-trolley-stand-pro-62-120",
  "portable-trolley-stand-lite-for-32″-to-75″": "aztech-portable-trolley-stand-lite-32-75",
  "heavy-duty-trolley-stand-for-55″-to-100″": "aztech-heavy-duty-trolley-stand-55-100",
  "heavy-duty-trolley-stand-pro-for-42-to-100": "aztech-heavy-duty-trolley-stand-pro-42-100",
  "wall-mount-bracket-lite-for-14″-to-24″": "aztech-wall-mount-bracket-lite-14-24",
  "fixed-heavy-duty-wall-mount-pro-for-75″-to-120″": "aztech-fixed-wall-mount-pro-75-120",
  "heavy-duty-trolley-stand-pro-for-55-to-120": "aztech-heavy-duty-trolley-stand-pro-55-120",
  "kodak-alaris-e1025-scanner": "kodak-e1030-document-scanner",
  "kodak-alaris-e1035-scanner": "kodak-e1040-document-scanner",
  "kodak-i3500-scanner": "kodak-i4650-scanner",
  "kodak-i4250-scanner": "kodak-i4850-scanner",
  "czur-shine500-pro-book-scanner": "czur-shine-ultra-pro-24mp-document-scanner",
  // Data-artifact slugs (stray/doubled dashes) found via Search Console
  // performance data — same product, just malformed in Google's index.
  "viewsonic-vg2748-": "viewsonic-vg2748",
  "viewsonic-ifp8630-": "viewsonic-ifp8630",
  "viewsonic-m2e-": "viewsonic-m2e",
  "czur--et25-pro": "czur-et25-pro",
  "dicota-eco-accessory-pouch-move-medium": "dicota-accessory-pouch-eco-move-medium",
  // Old site's "v2" CZUR book scanner was superseded by v3 in our catalogue
  "czur-m3000-pro-v2-pro-book-scanner": "czur-m3000-pro-v3-pro-book-scanner",
  "czur-m3000-pro-v2-book-scanner": "czur-m3000-pro-v3-pro-book-scanner",
  // Canon DR-C240 was discontinued and removed from the catalogue; DR-C230
  // is the closest current model in the same compact desktop scanner tier.
  "canon-dr-c240": "canon-imageformula-dr-c230-document-scanner",
  "canon-dr-c240-1yr": "canon-imageformula-dr-c230-document-scanner",
  "canon-imageformula-dr-c240-office-document-scanner": "canon-imageformula-dr-c230-document-scanner",
  // More data-artifact / "-alaris-" prefixed duplicates found in the second
  // Search Console drilldown, same treatment as the batch above.
  "kodak-alaris-e1030-document-scanner": "kodak-e1030-document-scanner",
  "kodak-alaris-e1040-document-scanner": "kodak-e1040-document-scanner",
  "kodak-alaris-s2070-scanner": "kodak-s2070-scanner",
  "colortrac-smartlf-scan-series": "smartlf-scan",
}

// Old products with no current equivalent (discontinued brands like
// Belkin/Rowe, or discontinued SKUs, or Dicota SKUs we're deliberately
// not adding since that brand is being wound down). 410, not 404.
const PRODUCT_GONE_SET = new Set([
  "rowe-scan-450i-large-format-scanner-series",
  "rowe-scan-850i-large-format-scanner-series",
  "viewsonic-m1_g2",
  "eco-multi-base-14-15-6",
  "eco-slim-case-base-13-14-1-blue",
  "laptop-case-slim-eco-base-13-14-1-grey",
  "laptop-case-slim-eco-base-13-14-1",
  "laptop-case-slim-eco-base-15-15-6",
  "laptop-bag-eco-top-traveller-base-13-14-1",
  "laptop-bag-eco-top-traveller-base-15-15-6",
  "laptop-sleeve-perfect-13-13-3",
  "perfect-skin-14-14-1",
  "laptop-sleeve-base-13-14-1-grey",
  "laptop-sleeve-smart-13-13-3",
  "laptop-sleeve-smart-14-14-1",
  "laptop-sleeve-flow-13-14-1-anthracite-blue",
  "ultra-skin-pro-13-13-3",
  "laptop-sleeve-plus-pro-13-13-3",
  "laptop-sleeve-plus-pro-14-14-1",
  "backpack-spin-14-15-6",
  "laptop-backpack-move-13-15-6",
  "laptop-backpack-move-13-15-6-light-grey",
  "dicota-backpack-go-13-15-6-black",
  "laptop-backpack-go-13-15-6-light-grey",
  "laptop-case-slim-eco-pro-12-14-1",
  "dicota-backpack-solid-grey-for-15-6inch-laptop",
  "dicota-d31760-backpack-for-15-6inch-laptop",
  "base-xx-laptop-slim-case-10-12-5-black",
  "base-xx-laptop-sleeve-14-14-1-black",
  "base-xx-laptop-sleeve-13-13-3-black",
  "dicota-backpack-move-13-15-6-black",
  "dicota-skin-flow-13-14-1-anthracite-blue",
  "dicota-universal-travel-notebook-charger-usb-c-45w",
  "dicota-eco-top-traveller-base-15-17-3",
  "dicota-secret-2-way-magnetic-ipad-2017-2018-air-air2",
  "dicota-secret-2-way-magnetic-surface-pro4-surface-pro-2017",
  "dicota-secret-2-way-magnetic-ipad-pro-12-9",
  "dicota-universal-car-notebook-charger-usb-c",
  "dicota-eco-multi-scale-12-14-1",
  "dicota-eco-backpack-scale-13-15-6",
  "dicota-skin-base-15-15-6-grey",
  "dicota-skin-base-13-14-1-red",
  "dicota-backpack-roller-pro-15-17-3",
  "dicota-cabin-roller-pro-14-15-6",
  "dicota-slim-case-edge-10-11-6-red",
  "dicota-slim-case-edge-10-11-6-grey",
  "dicota-perfect-skin-13-13-3",
  "dicota-smart-skin-13-13-3",
  "dicota-ultra-skin-plus-pro-13-13-3",
  "dicota-backpack-universal-14-15-6",
  "dicota-eco-multi-pro-13-15-6",
  "dicota-top-traveller-roller-pro-14-15-6",
  "dicota-eco-top-traveller-pro-12-14-1",
  "dicota-backpack-eco-14-15-6",
  "eco-multi-base-14-15-6-red",
  "belkin-soundform-headphones-with-lightning-connector-white",
  "belkin-boostcharge-pro-flex-usb-c-to-usb-c-cable",
  "belkin-boostcharge-usb-c-to-usb-c-cable-100w",
  "belkin-protective-laptop-sleeve-with-shoulder-strap-for-11-13",
  "belkin-2-4-amp-usb-charging-8-outlet-surge-protection-strip",
  "belkin-2-4-amp-usb-charging-6-outlet-surge-protection-strip",
  "belkin-6-outlet-surge-protection-strip-with-2m-power-cord",
  "belkin-soundform-headphones-with-lightning-connector",
  "belkin-connect-universal-usb-c-triple-display-dock",
  "belkin-14-port-usb-c-docking-station-65w-chromebook-certified",
  "belkin-usb-c-dual-display-docking-station",
  "belkin-connect-usb-c-11-in-1-multiport-dock",
  "belkin-connect-usb-c-6-in-1-multiport-adapter",
  "belkin-connect-usb-c-to-hdmi-2-1-adapter-8k-4k-hdr-compatible",
  "belkin-boostcharge-power-bank-10k-black",
  "belkin-boostcharge-30w-usb-c-car-charger",
  "belkin-boostcharge-dual-usb-a-wall-charger-24w-usb-a-to-micro-usb-cable",
  "belkin-boostcharge-usb-c-pd-3-0-pps-wall-charger-25w-usb-c-cable",
  "belkin-boostcharge-usb-c-wall-charger-20w",
  "belkin-boostcharge-pro-dual-usb-c-gan-wall-charger-with-pps-45w",
  "belkin-boostcharge-usb-c-to-usb-a-cable-1m-6-6ft-black",
  "belkin-boostcharge-usb-c-to-lightning-cable-1m-3-3ft-white",
  "belkin-boostcharge-lightning-to-usb-a-cable-15cm-6in-black",
  "belkin-boostcharge-braided-usb-a-to-micro-usb-cable-3-3-foot-1-meter-cable-available-in-black",
  "belkin-boostcharge-braided-usb-c-to-usb-a-cable-1m-3-3ft-black",
  "belkin-boostcharge-braided-lightning-to-usb-a-cable-15cm-6in-black",
  "belkin-boostcharge-pro-flex-usb-a-cable-with-lightning-connector-2m",
  "belkin-boostcharge-magnetic-wireless-power-bank-5k-stand-black",
  "belkin-boostcharge-magnetic-wireless-power-bank-5k-stand-white",
  "belkin-boostcharge-magnetic-wireless-car-charger-10w",
  "contex-sd-one-plus-24",
  "contex-sd-one-plus-36",
  "dicota-usb-c-11-in-1-docking-station-5k-hdmi-dp-pd-100w-uk",
  "dicota-secret-2-way-magnetic-macbook-air-13-macbook-pro-13-macbook-pro-retina-13-2012-2015",
  // Brands never carried on the new site (Epson, Nexvoo, Silex, Asustor, Oki),
  // discovered via Search Console performance data. All already 404 on the
  // old site too, but still had residual index entries worth a clean 410.
  "epson-ecotank-pro-l15180-mfp",
  "epson-wf-c20750-d4tw-240",
  "epson-wf-c21000d4tw-printer",
  "epson-workforce-enterprise-wf-c17590-d4twf-mfp",
  "epson-fastfoto-ff-680w",
  "epson-workforce-ds-770ii",
  "epson-workforce-wf-m5799dwf",
  "epson-workforce-ds-870-departmental-business-scanner",
  "epson-workforce-ds-30000",
  "epson-workforce-ds-410",
  "epson-ecotank-pro-l6580-mfp",
  "epson-expression-12000xl-pro",
  "nexvoo-classcam-cc520",
  "nexvoo---n110",
  "nexvoo-nexpad-t530",
  "silex-ds-520an",
  "asustor-lockerstor-4rs-as6504rs--lockerstor-4rd-as6504rd",
  "asustor-lockerstor-12r-pro-as7112rdx",
  "oki-b432dn-mono-printer",
  "msi-all-in--one-pcs--modern-am242-12m",
  // More Dicota bag/case variants with no equivalent (see note above re: Dicota)
  "dicota-backpack-go-13-156-light-grey",
  "dicota-backpack-move-13-156-black",
  // Data-artifact dash-variant of an already-gone Belkin product
  "belkin-24-amp-usb-charging-8-outlet-surge-protection-strip",
  // Second Search Console drilldown batch: more orphaned-brand products
  // (Epson, Asustor, Nexvoo, Silex, Oki) plus a few genuinely discontinued
  // /never-carried models in brands we do sell (Canon R40 camera, Kodak
  // i5650, CZUR Shine800 A3, Colortrac SC-36 Xpress).
  "epson-ecotank-m3180-business-mfp",
  "epson-ds-32000",
  "epson-workforce-enterprise-wf-c20600-d4tw-departmental-mfp",
  "epson-workforce-pro-wf-c878rdtwfc-business-inkjet-mfp",
  "epson-ecotank-m1180-business-printer",
  "epson-workforce-ds-7500n",
  "epson-wf-c5890dwf-",
  "epson-workforce-ds-6500n",
  "epson-workforce-ds-60000n",
  "asustor-drivestor-2-pro-as3302t",
  "asustor-lockerstor-4-as6604t",
  "asustor-lockerstor-12rd-as6512rd",
  "asustor-lockerstor-10-pro-as7110t",
  "asustor-nimbustor-2-as5202t",
  "asustor-lockerstor-16r-pro-as7116rdx",
  "asustor-lockerstor-2-as6602t",
  "asustor-lockerstor-4-gen2-as6704t",
  "asustor-nimbustor-4-as5304t",
  "asustor-lockerstor-8-as6508t",
  "nexvoo-nexpod-n109",
  "nexvoo--n120w",
  "nexvoo-bh06-stereo-bluetooth-headset-",
  "nexvoo-nexbar-n120u",
  "nexvoo-nexpod-pro-n149",
  "silex-ds-600",
  "silex-br-300an",
  "silex-ds-510",
  "oki-c650-a4-colour-led-printer",
  "oki-mc883dnct-multifunction-printer",
  "canon-r40",
  "kodak-i5650-scanner",
  "czur-shine800-a3-pro-book-scanner",
  "colortrac-smartlf-sc-36-xpress-series",
  "dicota-skin-flow-13-141-anthraciteblue",
  "base-xx-laptop-sleeve-13-133-black",
  "base-xx-laptop-sleeve-14-141-black",
  "base-xx-laptop-slim-case-10-125-black",
  "dicota-backpack-go-13-156-black",
  "dicota-backpack-move-13-156-light-grey",
  "dicota-d31760-backpack-for-156inch-laptop",
  "belkin-soundform-headphones-with-lightning-connectorwhite",
])

// Old /brand/:slug taxonomy pages -> our brandSlug (used as /products?brand=X)
const BRAND_TAXONOMY_MAP: Record<string, string> = {
  kodakalaris: 'kodak-alaris',
  czur: 'czur',
  brother: 'brother',
  dicota: 'dicota',
  colortrac: 'colortrac',
  canon: 'canon',
  viewsonic: 'viewsonic',
  msi: 'msi',
  aztech: 'aztech',
  deli: 'deli',
  contex: 'contex',
  aerocool: 'aerocool',
  dahua: 'dahua',
  unv: 'unv',
}
// Brand taxonomy pages with no equivalent (discontinued brands)
const BRAND_TAXONOMY_GONE = new Set(['rowe', 'belkin'])

// Old /product-category/:slug taxonomy pages -> our category filter value.
// '__GAMING_PAGE__' is a special marker: old site's "gaming" category maps
// to our /gaming solutions page, not a /products?category= filter.
const CATEGORY_TAXONOMY_MAP: Record<string, string> = {
  'digital-signage': 'Digital Signage',
  'portable-displays': 'Portable Displays',
  ifp: 'IFP',
  'optional-accessories': 'IT Accessories',
  'trolleys-and-brackets': 'Trolleys and Brackets',
  gaming: '__GAMING_PAGE__',
  'gaming/power-supply-unit': 'Power Supply Units',
  'document-scanner': 'Document Scanners',
  monitors: 'Monitors',
  projector: 'Projectors',
  'video-conferencing-solutions': 'Video Conferencing',
  printer: 'Printers',
  'graphics-cards': 'Graphics Cards',
  'it-accessories': 'IT Accessories',
  motherboards: 'Motherboards',
  softwares: 'Software',
  // 'uncategorized' falls through to the generic /products redirect below
}

// Shared by /product/:slug and the legacy /single-product/:id?name=X pattern —
// both identify a product purely by slug, just via a different URL shape.
function resolveProduct(slug: string, requestUrl: string): NextResponse {
  if (PRODUCT_GONE_SET.has(slug)) {
    return new NextResponse(null, { status: 410 })
  }
  const newSlug = PRODUCT_RENAME_MAP[slug] || slug
  return NextResponse.redirect(new URL(`/products/${newSlug}`, requestUrl), 308)
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const clean = pathname.replace(/\/$/, '') || '/'

  if (GONE_PATHS.has(clean)) {
    return new NextResponse(null, { status: 410 })
  }

  // Legacy rookie-ninja.com/product-single/:mongoId pattern — an even older
  // URL shape than /single-product/, and unlike that one it carries no name/
  // slug at all, so the specific product can't be resolved. Best effort:
  // send to the general listing rather than 404.
  if (/^\/product-single\/[^/]+$/.test(clean)) {
    return NextResponse.redirect(new URL('/products', request.url), 308)
  }

  // /product/:slug
  const productMatch = clean.match(/^\/product\/([^/]+)$/)
  if (productMatch) {
    return resolveProduct(decodeURIComponent(productMatch[1]), request.url)
  }

  // Legacy /single-product/:id?name=slug pattern (an older URL shape from
  // the catalogue site, still live and still getting search impressions).
  // The MongoDB id in the path is meaningless to us; the real identity is
  // the `name` query param, which is a product slug just like /product/:slug.
  if (/^\/single-product\/[^/]+$/.test(clean)) {
    const name = request.nextUrl.searchParams.get('name')
    if (name) {
      return resolveProduct(decodeURIComponent(name), request.url)
    }
    return NextResponse.redirect(new URL('/products', request.url), 308)
  }

  // Legacy /view-all?brand=<mongoId> or ?catId=<mongoId> listing pages.
  // The ids don't map to anything we have, so send to the general listing
  // rather than 410 — someone landing here is browsing, not looking for one
  // specific gone product.
  if (clean === '/view-all') {
    return NextResponse.redirect(new URL('/products', request.url), 308)
  }

  // /brand/:slug and the paginated /brand/:slug/page/:num variant — both
  // just mean "browsing this brand", so page number is dropped.
  const brandMatch = clean.match(/^\/brand\/([^/]+)(?:\/page\/\d+)?$/)
  if (brandMatch) {
    const slug = decodeURIComponent(brandMatch[1])
    if (BRAND_TAXONOMY_GONE.has(slug)) {
      return new NextResponse(null, { status: 410 })
    }
    const brandSlug = BRAND_TAXONOMY_MAP[slug]
    if (brandSlug) {
      return NextResponse.redirect(new URL(`/products?brand=${brandSlug}`, request.url), 308)
    }
    return new NextResponse(null, { status: 410 })
  }

  // /product-category/:slug (also handles the one nested case, gaming/power-supply-unit)
  const categoryMatch = clean.match(/^\/product-category\/(.+)$/)
  if (categoryMatch) {
    const slug = decodeURIComponent(categoryMatch[1])
    const category = CATEGORY_TAXONOMY_MAP[slug]
    if (category === '__GAMING_PAGE__') {
      return NextResponse.redirect(new URL('/gaming', request.url), 308)
    }
    if (category) {
      return NextResponse.redirect(new URL(`/products?category=${encodeURIComponent(category)}`, request.url), 308)
    }
    // 'uncategorized' and anything unmapped -> general product listing
    return NextResponse.redirect(new URL('/products', request.url), 308)
  }

  // Old WooCommerce system pages — no equivalent e-commerce flow on the new site
  if (clean === '/shop') {
    return NextResponse.redirect(new URL('/products', request.url), 308)
  }
  if (clean === '/cart' || clean === '/checkout' || clean === '/my-account') {
    return new NextResponse(null, { status: 410 })
  }
  // Note: bare /unv is NOT handled here. It's already covered by the
  // rookie-ninja.com vendor-page redirect in next.config.ts ('/unv' ->
  // '/our-vendors/unv'), which — since next.config.ts redirects run before
  // middleware — always wins over anything we could do here. The old
  // products.rookie-ninja.com /unv page (a thin camera-series overview) is
  // effectively superseded by /brand/unv -> /products?brand=unv anyway.

  // Real 404 for missing products — see NOT_FOUND_HTML comment above.
  const productPageMatch = clean.match(/^\/products\/([^/]+)$/)
  if (productPageMatch) {
    const slug = decodeURIComponent(productPageMatch[1])
    await connectDB()
    const exists = await Product.exists({ slug })
    if (!exists) {
      return new NextResponse(NOT_FOUND_HTML, {
        status: 404,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      })
    }
  }

  return NextResponse.next()
}

// Next.js statically analyzes `matcher`, so it must be a literal array
// (no spreading/computing from the sets/maps above here).
// runtime: 'nodejs' is required here — Mongoose (used for the product
// existence check below) doesn't run on the default Edge runtime.
export const config = {
  runtime: 'nodejs',
  matcher: [
    '/products/:slug',
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
    '/eset-nod32', '/eset-nod32/',
    '/msi-modern-am242tp-12m', '/msi-modern-am242tp-12m/',
    '/viewsonic-ifp-7532', '/viewsonic-ifp-7532/',
    '/epson', '/epson/',
    '/intex', '/intex/',
    '/asustor-nas-storage', '/asustor-nas-storage/',
    '/product/:path*',
    '/product-single/:path*',
    '/single-product/:path*',
    '/view-all', '/view-all/',
    '/brand/:path*',
    '/product-category/:path*',
    '/shop', '/shop/',
    '/cart', '/cart/',
    '/checkout', '/checkout/',
    '/my-account', '/my-account/',
  ],
}

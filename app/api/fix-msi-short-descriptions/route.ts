import { NextResponse } from 'next/server'
import { connectDB } from '@/src/lib/mongodb'
import { Product } from '@/src/lib/models/Products'

/* ── GPU bullets based on product name ── */
function gpuBullets(name: string): string[] {
  const n = name.toUpperCase()
  const bullets: string[] = ['NVIDIA Blackwell Architecture', 'DLSS 4 with Multi Frame Generation']

  // Memory
  if (/32G/.test(n))      bullets.push('32GB GDDR7 Memory')
  else if (/16G/.test(n)) bullets.push('16GB GDDR7 Memory')
  else if (/12G/.test(n)) bullets.push('12GB GDDR7 Memory')
  else if (/8G/.test(n))  bullets.push('8GB GDDR7 Memory')

  // Cooling
  if (/SUPRIM LIQUID/.test(n))    bullets.push('Hybrid Liquid + Air Cooling')
  else if (/SUPRIM/.test(n))      bullets.push('HYPER FROZR Thermal Design')
  else if (/GAMING TRIO/.test(n)) bullets.push('TRI FROZR 4 Triple-Fan Cooling')
  else if (/GAMING/.test(n))      bullets.push('TWIN FROZR 10 Dual-Fan Cooling')
  else if (/CYCLONE/.test(n))     bullets.push('CYCLONE Circular Thermal Design')
  else if (/INSPIRE ITX/.test(n)) bullets.push('Copper-Core Single-Fan Cooling')
  else if (/INSPIRE/.test(n))     bullets.push('STORMFORCE Dual-Fan Cooling')
  else if (/VENTUS/.test(n))      bullets.push('TORX Fan 5.0 Triple Cooling')
  else if (/VANGUARD/.test(n))    bullets.push('Advanced Vapor Chamber Cooling')

  // Special
  if (/ITX/.test(n))    bullets.push('Ultra-Compact ITX Form Factor')
  if (/WHITE/.test(n))  bullets.push('White Edition with RGB Lighting')
  if (/ OC/.test(n))    bullets.push('Factory Overclocked Boost Clock')
  if (/ZERO FROZR|INSPIRE/.test(n)) bullets.push('Zero Frozr — 0dB Silent Mode')

  bullets.push('PCIe 5.0 x16 Interface')
  bullets.push('HDMI 2.1b + 3x DisplayPort 2.1b')

  return bullets.slice(0, 7)
}

/* ── Motherboard bullets based on product name ── */
function mbBullets(name: string): string[] {
  const n = name.toUpperCase()
  const bullets: string[] = []

  // Platform
  const isAMD   = /B850|X870|B550|X570/.test(n)
  const isIntel = /B860|Z890|B760|Z790/.test(n)

  if (isAMD)   bullets.push('AMD AM5 Socket')
  if (isIntel) bullets.push('Intel LGA1851 Socket')

  // Chipset / tier
  if (/MEG/.test(n))       bullets.push('Flagship MEG Series')
  else if (/MPG/.test(n))  bullets.push('Performance MPG Series')
  else if (/MAG/.test(n))  bullets.push('Gaming MAG Series')
  else if (/TOMAHAWK/.test(n)) bullets.push('TOMAHAWK Proven Reliability')
  else if (/GAMING PLUS/.test(n)) bullets.push('GAMING PLUS Feature Set')
  else if (/GAMING PRO/.test(n))  bullets.push('GAMING PRO Feature Set')

  // Memory
  if (/B860|Z890/.test(n))      bullets.push('DDR5 9066+ MT/s (OC)')
  else if (/MLG|MEG/.test(n))   bullets.push('DDR5 8400+ MT/s (OC)')
  else                           bullets.push('DDR5 8200+ MT/s (OC)')

  // Storage
  if (/Z890|MEG|MPG/.test(n))   bullets.push('PCIe 5.0 GPU + Gen 5 M.2')
  else                           bullets.push('PCIe 5.0 x16 + Lightning M.2')

  // Connectivity
  if (/WIFI7|WIFI 7|WI-FI 7/.test(n.replace(/WIFI6E/,'')) || /B860|B850M GAMING PLUS WIFI$|B850M GAMING WIFI$/.test(n)) bullets.push('Wi-Fi 7 + Bluetooth 5.4')
  else if (/WIFI6E/.test(n))     bullets.push('Wi-Fi 6E + Bluetooth 5.3')
  else if (/WIFI/.test(n))       bullets.push('Wi-Fi 7 + Bluetooth 5.4')

  // Intel extras
  if (isIntel) bullets.push('Thunderbolt 4 Connectivity')
  if (isIntel) bullets.push('Killer Wi-Fi 7 + 2.5G LAN')
  else         bullets.push('2.5G LAN Connectivity')

  // Form factor
  if (/\bM\b/.test(n) && !/MAG|MLG|MSI/.test(n)) bullets.push('Micro-ATX Form Factor')

  return bullets.slice(0, 7)
}

export async function GET() {
  await connectDB()

  const products = await Product.find({ brandSlug: 'msi' }).select('name slug category shortDescription')
  let updated = 0

  for (const p of products) {
    const isGPU = /graphics?\s*cards?|gpu/i.test(p.category)
    const isMB  = /motherboard/i.test(p.category)

    if (!isGPU && !isMB) continue

    const bullets = isGPU ? gpuBullets(p.name) : mbBullets(p.name)
    await Product.updateOne({ _id: p._id }, { $set: { shortDescription: bullets.join('\n') } })
    updated++
  }

  return NextResponse.json({ ok: true, updated })
}

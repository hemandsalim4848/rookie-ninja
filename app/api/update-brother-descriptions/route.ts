import { NextResponse } from 'next/server'
import { connectDB } from '@/src/lib/mongodb'
import { Product } from '@/src/lib/models/Products'

const updates: Record<string, string> = {
  'brother-ads-1200-portable-scanner': [
    '25ppm | 20 sheets ADF',
    'Portable, USB 3.0 bus-powered',
    '2-sided (duplex) colour scanning',
    'Dedicated plastic ID card slot',
    'Scan to PDF, file, email & USB',
    'Nuance Power PDF software included',
    'Max paper size: A4',
  ].join('\n'),

  'brother-ads-1300-portable-document-scanner': [
    '30ppm | 20 sheets ADF',
    'Portable, USB-C bus-powered',
    '2-sided (duplex) colour scanning @ 300dpi',
    'Dedicated plastic ID card slot',
    'Scan to PC and USB host',
    'Max paper size: A4',
    'Compact, travel-ready design',
  ].join('\n'),

  'brother-ads-1350w-portable-document-scanner': [
    '30ppm | 20 sheets ADF',
    'Wireless network connectivity',
    '2-sided (duplex) colour scanning @ 300dpi',
    'Dedicated plastic ID card slot',
    'Scan to PC and USB host',
    'Max paper size: A4',
    'Compact, travel-ready design',
  ].join('\n'),

  'brother-ads-3100-desktop-document-scanner': [
    '40ppm | 60 sheets ADF',
    '2-sided scanning up to 80ipm',
    'USB 3.0 & USB host connectivity',
    'Optical character recognition (OCR)',
    'Kofax, NewSoft & ScanEssentials Lite included',
    'Max paper size: A4',
    'Duty cycle: 4,000 scans/day',
  ].join('\n'),

  'brother-ads-3600w-scanner': [
    '50ppm | 50 sheets ADF',
    'Network, Wi-Fi & NFC connectivity',
    '3.7" colour touchscreen display',
    '2-sided scanning up to 100ipm',
    'Advanced security features',
    'Max paper size: A4',
    'Duty cycle: 5,000 scans/day',
  ].join('\n'),

  'brother-ads-4300n-professional-desktop-document-scanner': [
    '40ppm | 80 sheets ADF',
    '2-sided scanning up to 80ipm',
    'TWAIN, WIA, ISIS & Linux SANE drivers',
    'Ultrasonic multi-feed sensor',
    'Advanced image processing & batch scan',
    'USB 3.0 & network connectivity',
    'Max paper size: A4',
  ].join('\n'),

  'brother-ads-4700w-professional-desktop-document-scanner': [
    '40ppm | 80 sheets ADF',
    'Wi-Fi, LAN, USB 3.0 & USB host',
    '2-sided scanning up to 80ipm',
    '10.9cm colour touchscreen',
    'OCR with Kofax, NewSoft & ScanEssentials',
    'Max paper size: A4',
    'Duty cycle: 5,000 scans/day',
  ].join('\n'),

  'brother-ads-4900w-professional-desktop-document-scanner': [
    '60ppm | 100 sheets ADF',
    'Wi-Fi, LAN, USB 3.0 & USB host',
    '2-sided scanning up to 120ipm',
    '10.9cm colour touchscreen',
    'OCR with Kofax, NewSoft & ScanEssentials',
    'Max paper size: A4',
    'Duty cycle: 7,000 scans/day',
  ].join('\n'),

  'brother-dcp-l2535d': [
    '34ppm mono | Automatic duplex print',
    'Print, Scan & Copy, Hi-Speed USB 2.0',
    'Max paper size: A4',
    'Up to 1200 × 1200 dpi print resolution',
    'Replaceable high-yield toner available',
    '250-sheet paper tray',
    'ENERGY STAR compliant',
  ].join('\n'),

  'brother-dcp-l2550dw': [
    '34ppm mono | Automatic duplex print',
    'USB, LAN & Wireless LAN connectivity',
    'Print, Scan & Copy',
    'Max paper size: A4',
    'Up to 1200 × 1200 dpi print resolution',
    'Replaceable high-yield toner available',
    '250-sheet paper tray',
  ].join('\n'),

  'brother-dcp-l2600d': [
    '30ppm mono | Automatic duplex print',
    'Quiet Mode for low-noise operation',
    'Print, Scan & Copy',
    'Max paper size: A4',
    'Up to 1200 × 1200 dpi print resolution',
    'Replaceable high-yield toner available',
    '250-sheet paper tray',
  ].join('\n'),

  'brother-dcp-l2625dw': [
    '34ppm mono | Automatic duplex print',
    'Wired & Wireless connectivity',
    'Print, Scan & Copy',
    'Mobile printing supported',
    'Up to 1200 × 1200 dpi print resolution',
    'Replaceable high-yield toner available',
    '250-sheet paper tray',
  ].join('\n'),

  'brother-dcp-l2640dw': [
    '34ppm mono | Automatic duplex print',
    'Wired, Wireless & ADF',
    'Print, Scan & Copy',
    'Mobile printing supported',
    'Up to 1200 × 1200 dpi print resolution',
    'Replaceable high-yield toner available',
    '250-sheet paper tray',
  ].join('\n'),

  'brother-dcp-l3510cdw': [
    '18ppm colour & mono | Automatic duplex',
    'USB, Wireless & Wi-Fi Direct',
    'Print, Scan & Copy',
    'Max paper size: A4',
    'Up to 2400 × 600 dpi print resolution',
    'Replaceable high-yield toner available',
    '250-sheet paper tray',
  ].join('\n'),

  'brother-dcp-l3520cdw': [
    '18ppm colour & mono | Automatic duplex',
    'Wireless & Wi-Fi Direct connectivity',
    'Print, Scan & Copy',
    'Max paper size: A4',
    'Up to 2400 × 600 dpi print resolution',
    'Replaceable high-yield toner available',
    '250-sheet paper tray',
  ].join('\n'),

  'brother-dcp-l3551cdw': [
    '18ppm colour & mono | Automatic duplex',
    'Wired, Wireless & Wi-Fi Direct',
    'Print, Scan & Copy',
    'Max paper size: A4',
    'Up to 2400 × 600 dpi print resolution',
    'Replaceable high-yield toner available',
    '250-sheet paper tray',
  ].join('\n'),

  'brother-dcp-l3560cdw': [
    '26ppm colour & mono | Automatic duplex',
    'Gigabit Ethernet, Wireless & Wi-Fi Direct',
    'Print, Scan & Copy',
    'Max paper size: A4',
    'Up to 2400 × 600 dpi print resolution',
    'Replaceable high-yield toner available',
    '250-sheet paper tray',
  ].join('\n'),

  'brother-hl-l2370dn': [
    '34ppm mono | Automatic duplex print',
    'USB & LAN connectivity',
    'Max paper size: A4',
    'Up to 1200 × 1200 dpi print resolution',
    'Replaceable high-yield toner available',
    '250-sheet paper tray',
    'ENERGY STAR compliant',
  ].join('\n'),

  'brother-hl-l2375dw': [
    '34ppm mono | Automatic duplex print',
    'USB & Wireless LAN connectivity',
    'Max paper size: A4',
    'Up to 1200 × 1200 dpi print resolution',
    'Replaceable high-yield toner available',
    '250-sheet paper tray',
    'ENERGY STAR compliant',
  ].join('\n'),

  'brother-hl-l2400d': [
    '30ppm mono | Automatic duplex print',
    'Quiet Mode for low-noise operation',
    'Hi-Speed USB connectivity',
    'Max paper size: A4',
    'Up to 1200 × 1200 dpi print resolution',
    'Replaceable high-yield toner available',
    '250-sheet paper tray',
  ].join('\n'),

  'brother-hl-l2460dn': [
    '34ppm mono | Automatic duplex print',
    'Wired LAN & mobile printing',
    'Hi-Speed USB connectivity',
    'Max paper size: A4',
    'Up to 1200 × 1200 dpi print resolution',
    'Replaceable high-yield toner available',
    '250-sheet paper tray',
  ].join('\n'),

  'brother-hl-l2461dw': [
    '34ppm mono | Automatic duplex print',
    'Wireless & Wi-Fi Direct connectivity',
    'Hi-Speed USB & mobile printing',
    'Max paper size: A4',
    'Up to 1200 × 1200 dpi print resolution',
    'Replaceable high-yield toner available',
    '250-sheet paper tray',
  ].join('\n'),

  'brother-hl-l3220cw': [
    '18ppm colour & mono',
    'Wireless & Wi-Fi Direct connectivity',
    'Max paper size: A4',
    'Up to 2400 × 600 dpi print resolution',
    'Replaceable high-yield toner available',
    '250-sheet paper tray',
    'Mobile printing supported',
  ].join('\n'),

  'brother-hl-l3270cdw': [
    '24ppm colour & mono | Automatic duplex',
    'USB, NFC, LAN & Wireless LAN',
    'Max paper size: A4',
    'Up to 2400 × 600 dpi print resolution',
    'Replaceable high-yield toner available',
    '250-sheet paper tray',
    'Mobile printing supported',
  ].join('\n'),

  'brother-hl-l3280cdw': [
    '26ppm colour & mono | Automatic duplex',
    'Gigabit Ethernet, Wireless & Wi-Fi Direct',
    'Max paper size: A4',
    'Up to 2400 × 600 dpi print resolution',
    'Replaceable high-yield toner available',
    '250-sheet paper tray',
    'Mobile printing supported',
  ].join('\n'),

  'brother-hl-l5200dw': [
    '40ppm mono | Automatic duplex print',
    'USB, Wired, Wireless & Wi-Fi Direct',
    'Max paper size: A4',
    'Up to 1200 × 1200 dpi print resolution',
    'Replaceable high-yield toner available',
    '250-sheet paper tray',
    'NFC & mobile printing supported',
  ].join('\n'),

  'brother-hl-l6200dw': [
    '50ppm mono | Automatic duplex print',
    'Wired, Wireless, Wi-Fi Direct & NFC',
    'Max paper size: A4',
    'Up to 1200 × 1200 dpi print resolution',
    'Replaceable ultra high-yield toner available',
    '520-sheet paper tray',
    'Mobile printing supported',
  ].join('\n'),

  'brother-hl-l6400dw': [
    '50ppm mono | Automatic duplex print',
    'Built-in NFC & Gigabit Ethernet',
    'Wired, Wireless & Wi-Fi Direct',
    'Max paper size: A4',
    'Up to 1200 × 1200 dpi print resolution',
    'Replaceable ultra high-yield toner available',
    '520-sheet paper tray',
  ].join('\n'),

  'brother-hl-l8360cdw': [
    '31ppm colour & mono | Automatic duplex',
    'Built-in NFC, Wired & Wireless',
    'Max paper size: A4',
    'Up to 2400 × 600 dpi print resolution',
    'Replaceable super high-yield toner available',
    '250-sheet paper tray',
    'Mobile printing supported',
  ].join('\n'),

  'brother-mfc-j3540dw': [
    'A3 duplex inkjet | Print, Scan, Copy, Fax',
    '2.7" TFT colour touchscreen LCD',
    'Max paper size: A3',
    'Up to 250 sheets 80gsm plain paper',
    'Wireless & USB connectivity',
    'Mobile printing supported',
    'Automatic 2-sided printing up to A3',
  ].join('\n'),

  'brother-mfc-l2715dw': [
    '34ppm mono | Automatic duplex print',
    'USB, LAN & Wireless LAN connectivity',
    'Print, Scan, Copy & Fax',
    'Max paper size: A4',
    'Up to 1200 × 1200 dpi print resolution',
    'Dual CIS scanner',
    'Replaceable high-yield toner available',
  ].join('\n'),

  'brother-mfc-l2750dw': [
    '34ppm mono | Automatic duplex print',
    'NFC, USB, LAN & Wireless LAN',
    'Print, Scan, Copy & Fax',
    'Max paper size: A4',
    'Dual CIS scanner',
    'Up to 1200 × 1200 dpi print resolution',
    'Replaceable high-yield toner available',
  ].join('\n'),

  'brother-mfc-l2805dw': [
    '34ppm mono | Automatic duplex print',
    'Wired & Wireless connectivity',
    'Print, Scan, Copy & Fax with ADF',
    'Max paper size: A4',
    'Up to 1200 × 1200 dpi print resolution',
    'Mobile printing supported',
    'Replaceable high-yield toner available',
  ].join('\n'),

  'brother-mfc-l2885dw': [
    '34ppm mono | Automatic duplex print',
    'Wired & Wireless connectivity',
    'Print, Scan, Copy & Fax with ADF',
    'Max paper size: A4',
    'Up to 1200 × 1200 dpi print resolution',
    'Mobile printing supported',
    'Replaceable high-yield toner available',
  ].join('\n'),

  'brother-mfc-l3720cdw': [
    '18ppm colour & mono | Automatic duplex',
    'Wireless & Wi-Fi Direct connectivity',
    'Print, Scan, Copy & Fax with ADF',
    'Max paper size: A4',
    'Up to 2400 × 600 dpi print resolution',
    'Mobile printing supported',
    'Replaceable high-yield toner available',
  ].join('\n'),

  'brother-mfc-l3750cdw': [
    '24ppm colour & mono | Automatic duplex',
    'Wired, Wireless & Wi-Fi Direct',
    'Print, Scan, Copy & Fax',
    'Max paper size: A4',
    'Up to 2400 × 600 dpi print resolution',
    'Mobile printing & NFC supported',
    'Replaceable high-yield toner available',
  ].join('\n'),

  'brother-mfc-l3760cdw': [
    '26ppm colour & mono | Automatic duplex',
    'Gigabit Ethernet, Wireless & Wi-Fi Direct',
    'Print, Scan, Copy & Fax with ADF',
    'Max paper size: A4',
    'Up to 2400 × 600 dpi print resolution',
    'Mobile printing supported',
    'Replaceable high-yield toner available',
  ].join('\n'),

  'brother-mfc-l5755dw': [
    '40ppm mono | Automatic duplex print & scan',
    'Wired, Wireless & Wi-Fi Direct',
    'Print, Scan, Copy & Fax',
    'Max paper size: A4',
    'Up to 1200 × 1200 dpi print resolution',
    'Mobile printing supported',
    'Replaceable high-yield toner available',
  ].join('\n'),

  'brother-mfc-l6900dw': [
    '50ppm mono | Automatic duplex print & scan',
    'Built-in NFC, Wired & Wireless',
    'Print, Scan, Copy & Fax',
    'Max paper size: A4',
    'Up to 1200 × 1200 dpi print resolution',
    'Replaceable ultra high-yield toner available',
    '520-sheet paper tray',
  ].join('\n'),

  'brother-mfc-l8390cdw': [
    '30ppm colour & mono | Automatic duplex',
    'Gigabit Ethernet, Wireless & Wi-Fi Direct',
    'Print, Scan, Copy & Fax with ADF',
    'Max paper size: A4',
    'Up to 2400 × 600 dpi print resolution',
    'Mobile printing supported',
    'Replaceable high-yield toner available',
  ].join('\n'),

  'brother-mfc-l8690cdw': [
    '31ppm colour & mono | Automatic duplex',
    'Wired, Wireless & Wi-Fi Direct',
    'Print, Scan, Copy & Fax',
    'Max paper size: A4',
    'Up to 2400 × 600 dpi print resolution',
    'Mobile printing & NFC supported',
    'Replaceable super high-yield toner available',
  ].join('\n'),

  'brother-mfc-l9570cdw': [
    '31ppm colour & mono | Automatic duplex',
    'Built-in NFC, Wired & Wireless',
    'Print, Scan, Copy & Fax',
    'Max paper size: A4',
    'Up to 2400 × 600 dpi print resolution',
    'Replaceable super high-yield toner available',
    '520-sheet paper tray',
  ].join('\n'),
}

export async function GET() {
  await connectDB()
  const results = []

  for (const [slug, shortDescription] of Object.entries(updates)) {
    const res = await Product.updateOne(
      { brandSlug: 'brother', slug },
      { $set: { shortDescription } }
    )
    results.push({ slug, updated: res.modifiedCount > 0 })
  }

  return NextResponse.json({ total: results.length, results })
}

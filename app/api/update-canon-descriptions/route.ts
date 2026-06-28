import { NextResponse } from 'next/server'
import { connectDB } from '@/src/lib/mongodb'
import { Product } from '@/src/lib/models/Products'

const updates: Record<string, string> = {
  'canon-dr-g2140': [
    '140ppm | 500 sheets ADF',
    'Ultrasonic double-feed detection',
    'Max paper size: A3',
    'Duty cycle: 30,000 scans/day',
    'USB 3.1 & LAN connectivity',
    'Compatible with CaptureOnTouch Pro',
    'ENERGY STAR compliant',
  ].join('\n'),

  'canon-dr-s150': [
    '50ppm | 50 sheets ADF',
    'Slim, space-saving design',
    'USB 3.1 connectivity',
    'Ultrasonic double-feed detection',
    'Max paper size: A4',
    'Compatible with CaptureOnTouch',
    'ENERGY STAR compliant',
  ].join('\n'),

  'canon-imageformula-dr-6030c-document-scanner': [
    '80ppm | 100 sheets ADF',
    'Max paper size: A3',
    'Optical resolution: 600 dpi',
    'USB & SCSI interface options',
    'Duty cycle: 10,000 scans/day',
    'Ultrasonic double-feed detection',
    'ISIS/TWAIN drivers included',
  ].join('\n'),

  'canon-imageformula-p-215-ii-document-scanner': [
    '15ppm | 20 sheets ADF',
    'Portable, bus-powered via USB',
    'Max paper size: A4',
    'Scans receipts, cards & passports',
    'Wi-Fi connectivity supported',
    'Compatible with iOS & Android',
    'CaptureOnTouch Mobile included',
  ].join('\n'),

  'canon-sf400': [
    '45ppm | 85 sheets ADF',
    'PC-free scanning with 4.3" touchscreen',
    'Max paper size: A4',
    'Scan to email, FTP, cloud & USB',
    'Wired LAN & Wi-Fi connectivity',
    'Duty cycle: 4,000 scans/day',
    'LDAP & Active Directory support',
  ].join('\n'),

  'canon-scanfront-400-document-scanner': [
    '45ppm | 85 sheets ADF',
    'Network scanning, PC-free operation',
    'Max paper size: A4',
    'Scan to email, FTP, cloud & USB',
    'Wired LAN & Wi-Fi connectivity',
    'Duty cycle: 4,000 scans/day',
    'LDAP & Active Directory support',
  ].join('\n'),

  'canon-imageformula-dr-6010c-document-scanner': [
    '60ppm | 100 sheets ADF',
    'Duty cycle: 7,500 scans/day',
    'Max paper size: A4',
    'Front-feed with straight paper path',
    'USB 2.0 connectivity',
    'Kofax VRS & CapturePerfect included',
    'ENERGY STAR compliant',
  ].join('\n'),

  'canon-imageformula-dr-c225-ii-document-scanner': [
    '25ppm | U-turn compact paper path',
    'One-touch scan to cloud & local folders',
    'Max paper size: A4',
    'Scans cards, receipts & long documents',
    'USB 3.1 connectivity',
    'Auto colour detection & deskew',
    'CaptureOnTouch included',
  ].join('\n'),

  'canon-imageformula-dr-c225w-document-scanner': [
    '20ppm | 30 sheets ADF',
    'Wi-Fi & USB connectivity',
    'Max paper size: A4',
    'Compact upright design',
    'Scans cards & receipts',
    'Auto colour detection',
    'CaptureOnTouch included',
  ].join('\n'),

  'canon-imageformula-dr-c225w-ii-wireless-document-scanner': [
    '25ppm | U-turn compact paper path',
    'Wi-Fi, scan to cloud & local folders',
    'Max paper size: A4',
    'Scans cards, receipts & long documents',
    'Auto colour detection & deskew',
    'Full Auto Mode for one-click setup',
    'CaptureOnTouch included',
  ].join('\n'),

  'canon-imageformula-dr-c230-document-scanner': [
    '30ppm | 60 sheets ADF',
    'Compact design, Max paper size: A4',
    'USB 3.1 connectivity',
    'Scans cards & long documents',
    'Ultrasonic double-feed detection',
    'Auto colour & page size detection',
    'CaptureOnTouch included',
  ].join('\n'),

  'canon-imageformula-dr-c340c350': [
    '100 ipm duplex | 100 sheets ADF',
    'Supports cards, passports & long documents',
    'Max paper size: A4',
    'Advanced image enhancement technology',
    'Compact design with USB Type-C',
    'Duty cycle: 7,000 scans/day',
    'Auto colour detection & deskew',
  ].join('\n'),

  'canon-imageformula-dr-f120-document-scanner': [
    '10ppm colour | 20ppm mono',
    'Auto colour, size & orientation detection',
    'Max paper size: A4',
    'Flatbed + ADF combination',
    'ENERGY STAR, RoHS & WEEE compliant',
    'EMC Captiva Cloud Capture RunTime included',
    'One-year Advanced Exchange Service',
  ].join('\n'),

  'canon-imageformula-dr-g2090-document-scanner': [
    '90ppm | 300 sheets ADF',
    'Max paper size: A3',
    'Optical resolution: 600 dpi',
    'Duty cycle: 30,000 scans/day',
    'USB 3.1 & LAN connectivity',
    'Ultrasonic double-feed detection',
    'Compatible with CaptureOnTouch Pro',
  ].join('\n'),

  'canon-imageformula-dr-g2110-document-scanner': [
    '110ppm | 500 sheets ADF',
    'Duty cycle: 50,000 pages/day',
    'Max paper size: A3, 12" × 17"',
    'Optical resolution: 600 dpi, 24-bit colour',
    'USB 3.1 & LAN connectivity',
    'TWAIN & ISIS drivers included',
    'ENERGY STAR compliant',
  ].join('\n'),

  'canon-imageformula-dr-m1060-office-document-scanner': [
    'Daily volume: 7,500 scans',
    'MultiStream output: PDF, TIFF, JPEG, PPTX',
    'Max paper size: A4',
    'MultiStream technology for multiple outputs per scan',
    'Scan to Microsoft SharePoint',
    'Full Auto Mode with one-click setup',
    'Kofax VRS & CapturePerfect included',
  ].join('\n'),

  'canon-imageformula-dr-m140-scanner': [
    'Handles cards, passports & embossed docs',
    'Daily volume: 4,000 scans',
    'Max paper size: A4',
    'USB powered, no external adapter needed',
    'CaptureOnTouch & CapturePerfect included',
    'Auto colour detection & deskew',
    'ENERGY STAR compliant',
  ].join('\n'),

  'canon-imageformula-dr-m160ii-document-scanner': [
    'Colour, greyscale & B&W scanning modes',
    'PDF/A output with ISIS/TWAIN drivers',
    'Max paper size: A4',
    'Duty cycle: 4,000 scans/day',
    'RGB LED light source, CMOS CIS sensor',
    'Auto colour, page size & resolution detection',
    'ENERGY STAR, RoHS & WEEE compliant',
  ].join('\n'),

  'canon-imageformula-dr-m260-document-scanner': [
    '60ppm | 80 sheets ADF',
    'Max paper size: A4',
    'USB 3.1 connectivity',
    'Duty cycle: 7,500 scans/day',
    'Ultrasonic double-feed detection',
    'Auto colour & page size detection',
    'CaptureOnTouch included',
  ].join('\n'),

  'canon-imageformula-dr-s350nw': [
    '50ppm | 60 sheets ADF',
    'USB, LAN & Wi-Fi connectivity',
    'Max paper size: A4',
    'Duty cycle: 6,000–9,000 scans/day',
    'Scans plastic cards & long documents',
    'Ultrasonic double-feed detection',
    'CaptureOnTouch included',
  ].join('\n'),
}

export async function GET() {
  await connectDB()
  const results = []

  for (const [slug, shortDescription] of Object.entries(updates)) {
    const res = await Product.updateOne(
      { brandSlug: 'canon', slug },
      { $set: { shortDescription } }
    )
    results.push({ slug, updated: res.modifiedCount > 0 })
  }

  return NextResponse.json({ total: results.length, results })
}

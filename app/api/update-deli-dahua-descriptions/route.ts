import { NextResponse } from 'next/server'
import { connectDB } from '@/src/lib/mongodb'
import { Product } from '@/src/lib/models/Products'

const updates = [
  // Deli — titles say brand, model, "Monochrome Laser Printer/MFP"
  {
    slug: 'deli-m1820w',
    shortDescription: 'Print, Copy and Scan (MFP)\nPrint speed 20ppm\nToner cartridge yield 1600 sheets\nUSB, WiFi and Bluetooth connectivity',
  },
  {
    slug: 'deli-m3100adnw',
    shortDescription: 'Print, Copy and Scan (MFP)\nPrint speed 31ppm\nToner cartridge yield 3500 sheets\nPrint resolution 1200 x 1200dpi\nAutomatic duplex printing\nAuto document feeder\nUSB, WiFi and LAN connectivity',
  },
  {
    slug: 'deli-p1820w',
    shortDescription: 'Print only\nPrint speed 20ppm\nToner cartridge yield 1600 sheets\nPrint resolution 1200 x 600dpi\nControlled via Deli Print app\nUSB, WiFi and Bluetooth connectivity',
  },

  // Dahua — titles say screen size + type (flat panel / whiteboard)
  // MC420 series — same size variants, drop size and "interactive flat panel"
  {
    slug: 'dahua-lph65-mc420-c-s2',
    shortDescription: 'Built-in DeepHub Meeting software\n2.0-channel 40W audio\n90% NTSC high gamut screen\nSplit screen and screen sharing\nHandwriting recognition',
  },
  {
    slug: 'dahua-lph75-mc420-c-s2',
    shortDescription: 'Built-in DeepHub Meeting software\n2.0-channel 40W audio\n90% NTSC high gamut screen\nSplit screen and screen sharing\nHandwriting recognition',
  },
  {
    slug: 'dahua-lph75-mc420-c-s2-project',
    shortDescription: 'Built-in DeepHub Meeting software\n2.0-channel 40W audio\n90% NTSC high gamut screen\nSplit screen and screen sharing\nHandwriting recognition\nProject variant',
  },
  {
    slug: 'dahua-lph86-mc420-c-s2',
    shortDescription: 'Built-in DeepHub Meeting software\n2.0-channel 40W audio\n90% NTSC high gamut screen\nSplit screen and screen sharing\nHandwriting recognition',
  },
  // MC470 series
  {
    slug: 'dahua-lph65-mc470-p-s2',
    shortDescription: 'Built-in DeepHub Meeting software (1-year license)\n2.1-channel 60W audio\n90% NTSC high gamut screen\nColor accuracy ΔE≤1.5\nSplit screen and screen sharing',
  },
  {
    slug: 'dahua-lph75-mc470-p-s2',
    shortDescription: 'Built-in DeepHub Meeting software (1-year license)\n2.1-channel 60W audio\n90% NTSC high gamut screen\nColor accuracy ΔE≤1.5\nSplit screen and screen sharing',
  },
  {
    slug: 'dahua-lph86-mc470-p-s2',
    shortDescription: 'Built-in DeepHub Meeting software (1-year license)\n2.1-channel 60W audio\n90% NTSC high gamut screen\nColor accuracy ΔE≤1.5\nSplit screen and screen sharing',
  },
  {
    slug: 'dahua-lph98-mc470-p-s2',
    shortDescription: 'Built-in DeepHub Meeting software (1-year license)\n2.1-channel 60W audio\n90% NTSC high gamut screen\nColor accuracy ΔE≤1.5\nSplit screen and screen sharing',
  },
  // ST420 series
  {
    slug: 'dahua-lph65-st420-s3',
    shortDescription: 'Zero Air Gap DLED display technology\n8 physical front buttons\nAI recognition of drawings\nWireless screen sharing\nQR code file sharing\nAndroid and Windows dual system',
  },
  {
    slug: 'dahua-lph75-st420-s3',
    shortDescription: 'Zero Air Gap DLED display technology\n8 physical front buttons\nAI recognition of drawings\nWireless screen sharing\nQR code file sharing\nAndroid and Windows dual system',
  },
  {
    slug: 'dahua-lph86-st420-s3',
    shortDescription: 'Zero Air Gap DLED display technology\n8 physical front buttons\nAI recognition of drawings\nWireless screen sharing\nQR code file sharing\nAndroid and Windows dual system',
  },
  // 98" DeepHub Pro — has unique features
  {
    slug: 'dahua-lph98-mc470-p',
    shortDescription: 'Built-in AI 4K camera and 8-array microphone\nZero Air Gap full lamination technology\nWireless screen sharing\nHandwriting recognition\nFingerprint lock security\nOPS module optional',
  },
]

export async function GET() {
  await connectDB()
  const results: { slug: string; status: string }[] = []

  for (const { slug, shortDescription } of updates) {
    const res = await Product.updateOne({ slug }, { $set: { shortDescription } })
    results.push({ slug, status: res.modifiedCount > 0 ? 'updated' : 'not found' })
  }

  return NextResponse.json({ ok: true, results })
}

import { NextResponse } from 'next/server'
import { connectDB } from '@/src/lib/mongodb'
import { Product } from '@/src/lib/models/Products'

const updates = [
  {
    slug: 'nova-650w-white-non-modular-power-supply-unit-psu',
    shortDescription: '650W Power Output\nWhite colour\nNon-modular design\nLarger cooling fan for improved airflow\nATX form factor\nMultiple connector types included',
  },
  {
    slug: 'aztech-32-smart-movable-screen-4k',
    shortDescription: '32-inch 4K Ultra HD display\nMovable design with smooth mobility\nResponsive touch screen\nBuilt-in speakers and camera\nSmart functionality with app support\nMultiple input options (HDMI, USB, etc.)',
  },
  {
    slug: 'aztech-32-smart-movable-screen',
    shortDescription: '32-inch Full HD display\nMovable design with smooth mobility\nResponsive touch screen\nBuilt-in speakers and camera\nSmart functionality with app support\nMultiple input options (HDMI, USB, etc.)',
  },
  {
    slug: 'aztech-heavy-duty-trolley-stand-pro-62-120',
    shortDescription: 'Compatible with 62" to 120" displays\nMax load capacity 200kg\nMax VESA 1200x600\nLockable wheels for secure positioning\nSturdy heavy-duty steel construction\nAdjustable height and viewing angle',
  },
  {
    slug: 'aztech-portable-trolley-stand-lite-32-75',
    shortDescription: 'Compatible with 32" to 75" displays\nMax load capacity 50kg\nMax VESA 600x400\n15° tilt adjustment\nLockable wheels for smooth mobility\nLightweight portable design',
  },
  {
    slug: 'aztech-heavy-duty-trolley-stand-55-100',
    shortDescription: 'Compatible with 55" to 100" displays\nMax load capacity 120kg\nMax VESA 940x600\nLockable wheels for secure positioning\nAdjustable viewing angle\nHeavy-duty steel construction',
  },
  {
    slug: 'aztech-heavy-duty-trolley-stand-pro-42-100',
    shortDescription: 'Compatible with 42" to 100" displays\nMax load capacity 200kg\nMax VESA 900x600\nLockable wheels for smooth mobility\nSturdy heavy-duty steel frame\nAdjustable height and angle',
  },
  {
    slug: 'aztech-wall-mount-bracket-lite-14-24',
    shortDescription: 'Compatible with 14" to 24" screens\nMax load capacity 15kg\nVESA 75x75 to 100x100\n360° rotation\n180° tilt adjustment\nLeft and right swivel',
  },
  {
    slug: 'aztech-fixed-wall-mount-pro-75-120',
    shortDescription: 'Compatible with 75" to 120" TVs\nMax load capacity 220kg\nMax VESA 1100x600\nFixed heavy-duty wall mount\nDurable steel construction\nSimple and secure installation',
  },
  {
    slug: 'aztech-heavy-duty-trolley-stand-pro-55-120',
    shortDescription: 'Compatible with 55" to 120" displays\nMax load capacity 240kg\nMax VESA 1150x600\nLockable wheels for smooth mobility\nSturdy heavy-duty steel frame\nAdjustable viewing height',
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

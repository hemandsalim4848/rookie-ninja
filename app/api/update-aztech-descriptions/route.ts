import { NextResponse } from 'next/server'
import { connectDB } from '@/src/lib/mongodb'
import { Product } from '@/src/lib/models/Products'

const updates = [
  // Alpha series — 80Plus Gold, Fully-modular
  {
    slug: 'alpha-650w-80plus-gold-fully-modular-power-supply-unit',
    shortDescription: '650W Power Output\n80Plus Gold certified\nFully-modular design\nLarger cooling fan for improved airflow\nATX form factor\nMultiple connector types included',
  },
  {
    slug: 'alpha-750w-80plus-gold-fully-modular-power-supply-unit',
    shortDescription: '750W Power Output\n80Plus Gold certified\nFully-modular design\nLarger cooling fan for improved airflow\nATX form factor\nMultiple connector types included',
  },
  {
    slug: 'alpha-850w-80plus-gold-fully-modular-power-supply-unit',
    shortDescription: '850W Power Output\n80Plus Gold certified\nFully-modular design\nLarger cooling fan for improved airflow\nATX form factor\nMultiple connector types included',
  },
  {
    slug: 'alpha-1000w-80plus-gold-fully-modular-power-supply-unit-psu',
    shortDescription: '1000W Power Output\n80Plus Gold certified\nFully-modular design\nLarger cooling fan for improved airflow\nATX form factor\nMultiple connector types included',
  },
  {
    slug: 'alpha-1050w-80plus-gold-fully-modular-power-supply-unit',
    shortDescription: '1050W Power Output\n80Plus Gold certified\nFully-modular design\nLarger cooling fan for improved airflow\nATX form factor\nMultiple connector types included',
  },
  // Nova series — White, Non-modular / Fully-modular
  {
    slug: 'nova-650w-white-non-modular-power-supply-unit-psu',
    shortDescription: '650W Power Output\nWhite colour\nNon-modular design\nLarger cooling fan for improved airflow\nATX form factor\nMultiple connector types included',
  },
  {
    slug: 'nova-650w-80plus-white-non-modular-power-supply-unit-psu',
    shortDescription: '650W Power Output\n80Plus White certified\nNon-modular design\nLarger cooling fan for improved airflow\nATX form factor\nMultiple connector types included',
  },
  {
    slug: 'nova-750w-white-non-modular-power-supply-unit-psu',
    shortDescription: '750W Power Output\nWhite colour\nNon-modular design\nLarger cooling fan for improved airflow\nATX form factor\nMultiple connector types included',
  },
  {
    slug: 'nova-750w-80plus-white-non-modular-power-supply-unit-psu',
    shortDescription: '750W Power Output\n80Plus White certified\nNon-modular design\nLarger cooling fan for improved airflow\nATX form factor\nMultiple connector types included',
  },
  {
    slug: 'nova-850w-white-fully-modular-power-supply-unit-psu',
    shortDescription: '850W Power Output\nWhite colour\nFully-modular design\nLarger cooling fan for improved airflow\nATX form factor\nMultiple connector types included',
  },
  {
    slug: 'nova-850w-80plus-white-non-modular-power-supply-unit-psu',
    shortDescription: '850W Power Output\n80Plus White certified\nNon-modular design\nLarger cooling fan for improved airflow\nATX form factor\nMultiple connector types included',
  },
  // Omega series — 80Plus Platinum, Fully-modular
  {
    slug: 'omega-1050w-80plus-platinum-fully-modular-power-supply-unit-psu',
    shortDescription: '1050W Power Output\n80Plus Platinum certified\nFully-modular design\nLarger cooling fan for improved airflow\nATX form factor\nMultiple connector types included',
  },
  {
    slug: 'omega-1200w-80plus-platinum-fully-modular-power-supply-unit-psu',
    shortDescription: '1200W Power Output\n80Plus Platinum certified\nFully-modular design\nLarger cooling fan for improved airflow\nATX form factor\nMultiple connector types included',
  },
  {
    slug: 'omega-1250w-80plus-platinum-fully-modular-power-supply-unit-psu',
    shortDescription: '1250W Power Output\n80Plus Platinum certified\nFully-modular design\nLarger cooling fan for improved airflow\nATX form factor\nMultiple connector types included',
  },
  // Prime series — 80Plus Bronze, Fully-modular & Non-modular
  {
    slug: 'prime-650w-80plus-bronze-fully-modular-power-supply-unit',
    shortDescription: '650W Power Output\n80Plus Bronze certified\nFully-modular design\nLarger cooling fan for improved airflow\nATX form factor\nMultiple connector types included',
  },
  {
    slug: 'prime-650w-80plus-bronze-non-modular-power-supply-unit',
    shortDescription: '650W Power Output\n80Plus Bronze certified\nNon-modular design\nLarger cooling fan for improved airflow\nATX form factor\nMultiple connector types included',
  },
  {
    slug: 'prime-750w-80plus-bronze-fully-modular-power-supply-unit',
    shortDescription: '750W Power Output\n80Plus Bronze certified\nFully-modular design\nLarger cooling fan for improved airflow\nATX form factor\nMultiple connector types included',
  },
  {
    slug: 'prime-750w-80plus-bronze-non-modular-power-supply-unit',
    shortDescription: '750W Power Output\n80Plus Bronze certified\nNon-modular design\nLarger cooling fan for improved airflow\nATX form factor\nMultiple connector types included',
  },
  {
    slug: 'prime-850w-80plus-bronze-fully-modular-power-supply-unit',
    shortDescription: '850W Power Output\n80Plus Bronze certified\nFully-modular design\nLarger cooling fan for improved airflow\nATX form factor\nMultiple connector types included',
  },
  {
    slug: 'prime-850w-80plus-bronze-non-modular-power-supply-unit',
    shortDescription: '850W Power Output\n80Plus Bronze certified\nNon-modular design\nLarger cooling fan for improved airflow\nATX form factor\nMultiple connector types included',
  },
  {
    slug: 'prime-1000w-80plus-bronze-fully-modular-power-supply-unit',
    shortDescription: '1000W Power Output\n80Plus Bronze certified\nFully-modular design\nLarger cooling fan for improved airflow\nATX form factor\nMultiple connector types included',
  },
  {
    slug: 'prime-1000w-80plus-bronze-non-modular-power-supply-unit',
    shortDescription: '1000W Power Output\n80Plus Bronze certified\nNon-modular design\nLarger cooling fan for improved airflow\nATX form factor\nMultiple connector types included',
  },
  {
    slug: 'prime-1050w-80plus-bronze-fully-modular-power-supply-unit',
    shortDescription: '1050W Power Output\n80Plus Bronze certified\nFully-modular design\nLarger cooling fan for improved airflow\nATX form factor\nMultiple connector types included',
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

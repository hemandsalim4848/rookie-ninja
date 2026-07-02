import { NextResponse } from 'next/server'
import { connectDB } from '@/src/lib/mongodb'
import { Product } from '@/src/lib/models/Products'

const updates = [
  // IFP — Ideaflow series
  // Title has: screen size, 4K, Interactive Display — don't repeat size or resolution
  {
    slug: 'ideaflow-65-4k-interactive-display',
    shortDescription: 'UltraTouch multi-touch display\nBuilt-in 48MP AI camera and microphone\nSeamless screen mirroring\nFluent writing experience\nScan to transfer files\nBYOM (Bring Your Own Meeting)',
  },
  {
    slug: 'ideaflow-75-4k-interactive-display',
    shortDescription: 'UltraTouch multi-touch display\nBuilt-in 48MP AI camera and microphone\nSeamless screen mirroring\nFluent writing experience\nScan to transfer files\nBYOM (Bring Your Own Meeting)',
  },
  {
    slug: 'ideaflow-86-4k-interactive-display',
    shortDescription: 'UltraTouch multi-touch display\nBuilt-in 48MP AI camera and microphone\nSeamless screen mirroring\nFluent writing experience\nScan to transfer files\nBYOM (Bring Your Own Meeting)',
  },
  {
    slug: 'ideaflow-110-4k-interactive-display',
    shortDescription: 'UltraTouch multi-touch display\nBuilt-in 48MP AI camera and microphone\nSeamless screen mirroring\nFluent writing experience\nScan to transfer files\nBYOM (Bring Your Own Meeting)',
  },
  {
    slug: 'ideaflow-pro-65-4k-interactive-display',
    shortDescription: 'UltraTouch multi-touch display\nBuilt-in 48MP AI camera and microphone\nSeamless screen mirroring\nFluent writing experience\nScan to transfer files\nBYOM (Bring Your Own Meeting)',
  },
  {
    slug: 'ideaflow-pro-75-4k-interactive-display',
    shortDescription: 'UltraTouch multi-touch display\nBuilt-in AI camera\nAndroid 13 operating system\nSeamless connectivity\nAspect ratio 16:9\nFluent writing experience',
  },
  {
    slug: 'ideaflow-pro-86-4k-interactive-display',
    shortDescription: 'UltraTouch multi-touch display\nBuilt-in 48MP AI camera and microphone\nSeamless screen mirroring\nFluent writing experience\nScan to transfer files\nBYOM (Bring Your Own Meeting)',
  },
  {
    slug: 'ideaflow-pro-98-4k-interactive-display',
    shortDescription: 'UltraTouch multi-touch display\nBuilt-in 48MP AI camera and microphone\nSeamless screen mirroring\nFluent writing experience\nScan to transfer files\nBYOM (Bring Your Own Meeting)',
  },
  // Alpha series — 80Plus Gold, Fully-modular
  // Title has: wattage, 80Plus Gold, Fully Modular — describe what title doesn't say
  {
    slug: 'alpha-650w-80plus-gold-fully-modular-power-supply-unit',
    shortDescription: 'Up to 90% energy efficiency\nATX 3.1 standard\nActive PFC + DC to DC conversion\n12cm silent cooling fan\nBlack flat cable set\nDual EMI protection',
  },
  {
    slug: 'alpha-750w-80plus-gold-fully-modular-power-supply-unit',
    shortDescription: 'Up to 90% energy efficiency\nATX 3.1 standard\nActive PFC + DC to DC conversion\n12cm silent cooling fan\nBlack flat cable set\nDual EMI protection',
  },
  {
    slug: 'alpha-850w-80plus-gold-fully-modular-power-supply-unit',
    shortDescription: 'Up to 90% energy efficiency\nATX 3.1 standard\nActive PFC + DC to DC conversion\n12cm silent cooling fan\nBlack flat cable set\nDual EMI protection',
  },
  {
    slug: 'alpha-1000w-80plus-gold-fully-modular-power-supply-unit-psu',
    shortDescription: 'Up to 90% energy efficiency\nATX 3.1 standard\nActive PFC + DC to DC conversion\n12cm silent cooling fan\nBlack flat cable set\nDual EMI protection',
  },
  {
    slug: 'alpha-1050w-80plus-gold-fully-modular-power-supply-unit',
    shortDescription: 'Up to 90% energy efficiency\nATX 3.1 standard\nActive PFC + DC to DC conversion\n12cm silent cooling fan\nBlack flat cable set\nDual EMI protection',
  },
  // Nova series — White finish, Non-modular / Fully-modular
  // Title has: wattage, White, Non/Fully Modular
  {
    slug: 'nova-650w-white-non-modular-power-supply-unit-psu',
    shortDescription: 'Reliable power for everyday builds\nLarger cooling fan for stable thermals\nStable voltage output under load\nMultiple protection circuits\nATX form factor\n1.5m input power cord',
  },
  {
    slug: 'nova-650w-80plus-white-non-modular-power-supply-unit-psu',
    shortDescription: 'Up to 80% energy efficiency\nLarger cooling fan for stable thermals\nStable voltage output under load\nMultiple protection circuits\nATX form factor\n1.5m input power cord',
  },
  {
    slug: 'nova-750w-white-non-modular-power-supply-unit-psu',
    shortDescription: 'Reliable power for everyday builds\nLarger cooling fan for stable thermals\nStable voltage output under load\nMultiple protection circuits\nATX form factor\n1.5m input power cord',
  },
  {
    slug: 'nova-750w-80plus-white-non-modular-power-supply-unit-psu',
    shortDescription: 'Up to 80% energy efficiency\nLarger cooling fan for stable thermals\nStable voltage output under load\nMultiple protection circuits\nATX form factor\n1.5m input power cord',
  },
  {
    slug: 'nova-850w-white-fully-modular-power-supply-unit-psu',
    shortDescription: 'Reliable power for everyday builds\nDetachable cables for a cleaner build\nLarger cooling fan for stable thermals\nStable voltage output under load\nMultiple protection circuits\nATX form factor',
  },
  {
    slug: 'nova-850w-80plus-white-non-modular-power-supply-unit-psu',
    shortDescription: 'Up to 80% energy efficiency\nLarger cooling fan for stable thermals\nStable voltage output under load\nMultiple protection circuits\nATX form factor\n1.5m input power cord',
  },
  // Omega series — 80Plus Platinum, Fully-modular
  // Title has: wattage, 80Plus Platinum, Fully Modular
  {
    slug: 'omega-1050w-80plus-platinum-fully-modular-power-supply-unit-psu',
    shortDescription: 'Up to 92% energy efficiency\nUltra-quiet operation for silent builds\nAdvanced multi-protection circuits\nATX 3.1 standard\nHigh-quality Japanese capacitors\n1.5m input power cord',
  },
  {
    slug: 'omega-1200w-80plus-platinum-fully-modular-power-supply-unit-psu',
    shortDescription: 'Up to 92% energy efficiency\nUltra-quiet operation for silent builds\nAdvanced multi-protection circuits\nATX 3.1 standard\nHigh-quality Japanese capacitors\n1.5m input power cord',
  },
  {
    slug: 'omega-1250w-80plus-platinum-fully-modular-power-supply-unit-psu',
    shortDescription: 'Up to 92% energy efficiency\nUltra-quiet operation for silent builds\nAdvanced multi-protection circuits\nATX 3.1 standard\nHigh-quality Japanese capacitors\n1.5m input power cord',
  },
  // Prime series — 80Plus Bronze, Fully-modular & Non-modular
  // Title has: wattage, 80Plus Bronze, Fully/Non Modular
  {
    slug: 'prime-650w-80plus-bronze-fully-modular-power-supply-unit',
    shortDescription: 'Up to 85% energy efficiency\nDetachable cables for a cleaner build\nStable power delivery for gaming PCs\n12cm quiet cooling fan\nMultiple protection circuits\nATX form factor',
  },
  {
    slug: 'prime-650w-80plus-bronze-non-modular-power-supply-unit',
    shortDescription: 'Up to 85% energy efficiency\nStable power delivery for gaming PCs\n12cm quiet cooling fan\nMultiple protection circuits\nATX form factor\n1.5m input power cord',
  },
  {
    slug: 'prime-750w-80plus-bronze-fully-modular-power-supply-unit',
    shortDescription: 'Up to 85% energy efficiency\nDetachable cables for a cleaner build\nStable power delivery for gaming PCs\n12cm quiet cooling fan\nMultiple protection circuits\nATX form factor',
  },
  {
    slug: 'prime-750w-80plus-bronze-non-modular-power-supply-unit',
    shortDescription: 'Up to 85% energy efficiency\nStable power delivery for gaming PCs\n12cm quiet cooling fan\nMultiple protection circuits\nATX form factor\n1.5m input power cord',
  },
  {
    slug: 'prime-850w-80plus-bronze-fully-modular-power-supply-unit',
    shortDescription: 'Up to 85% energy efficiency\nDetachable cables for a cleaner build\nStable power delivery for gaming PCs\n12cm quiet cooling fan\nMultiple protection circuits\nATX form factor',
  },
  {
    slug: 'prime-850w-80plus-bronze-non-modular-power-supply-unit',
    shortDescription: 'Up to 85% energy efficiency\nStable power delivery for gaming PCs\n12cm quiet cooling fan\nMultiple protection circuits\nATX form factor\n1.5m input power cord',
  },
  {
    slug: 'prime-1000w-80plus-bronze-fully-modular-power-supply-unit',
    shortDescription: 'Up to 85% energy efficiency\nDetachable cables for a cleaner build\nStable power delivery for gaming PCs\n12cm quiet cooling fan\nMultiple protection circuits\nATX form factor',
  },
  {
    slug: 'prime-1000w-80plus-bronze-non-modular-power-supply-unit',
    shortDescription: 'Up to 85% energy efficiency\nStable power delivery for gaming PCs\n12cm quiet cooling fan\nMultiple protection circuits\nATX form factor\n1.5m input power cord',
  },
  {
    slug: 'prime-1050w-80plus-bronze-fully-modular-power-supply-unit',
    shortDescription: 'Up to 85% energy efficiency\nDetachable cables for a cleaner build\nStable power delivery for gaming PCs\n12cm quiet cooling fan\nMultiple protection circuits\nATX form factor',
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

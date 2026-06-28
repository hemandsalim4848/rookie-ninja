import { NextResponse } from 'next/server'
import { connectDB } from '@/src/lib/mongodb'
import { Product } from '@/src/lib/models/Products'

const updates: Record<string, string> = {

  // ── Cases ─────────────────────────────────────────────────────────────────

  'aerocool-b508a-flow-g-bk-v1': [
    'ATX mid-tower | Tempered glass side panel (Black)',
    '5 fan slots | GPU up to 340mm | CPU cooler up to 158mm',
    'Compatible with ATX, mATX & mini-ITX motherboards',
    'Stylish front panel with air ventilation',
    'Supports up to four 140mm fans',
    'Magnetic top & bottom dust filters',
    'Tempered glass side panel to showcase components',
  ].join('\n'),

  'aerocool-b508a-flow-g-wt-v1': [
    'ATX mid-tower | Tempered glass side panel (White)',
    '5 fan slots | GPU up to 340mm | CPU cooler up to 158mm',
    'Compatible with ATX, mATX & mini-ITX motherboards',
    'Stylish front panel with air ventilation',
    'Supports up to four 140mm fans',
    'Magnetic top & bottom dust filters',
    'Tempered glass side panel to showcase components',
  ].join('\n'),

  'aerocool-b509a-flow-g-bk-v1': [
    'ATX mid-tower | Full mesh front panel (Black)',
    '8 fan slots | GPU up to 340mm | 360mm liquid cooler support',
    'Compatible with ATX, mATX & mini-ITX motherboards',
    'Full mesh front for maximum airflow',
    'Supports up to five 140mm fans',
    'Magnetic top & bottom dust filters',
    'Tempered glass side panel to showcase components',
  ].join('\n'),

  'aerocool-b509a-flow-g-wt-v1': [
    'ATX mid-tower | Full mesh front panel (White)',
    '8 fan slots | GPU up to 340mm | 360mm liquid cooler support',
    'Compatible with ATX, mATX & mini-ITX motherboards',
    'Full mesh front for maximum airflow',
    'Supports up to five 140mm fans',
    'Magnetic top & bottom dust filters',
    'Tempered glass side panel to showcase components',
  ].join('\n'),

  'aerocool-case-b507f-g-argb-4-atx-micro-mini-atx-type-c': [
    'ATX mid-tower | Panoramic tempered glass front & side',
    '4 pre-installed ARGB fans | 360mm liquid cooler support',
    'Compatible with ATX, Micro-ATX & mini-ITX motherboards',
    '10 total fan slots for maximum airflow',
    'Integrated ventilation with dust cover',
    'Durable SPCC steel construction',
    'USB Type-C front I/O port',
  ].join('\n'),

  'aerocool-case-beam-g-bk-v2-atx': [
    'ATX mid-tower | Full tempered glass side panel',
    'GPU up to 343mm | CPU cooler up to 160mm | 360mm AIO support',
    'Front air vents with LED fan viewing',
    'Two vertical GPU expansion slots',
    'PSU shroud supports up to two 12cm fans for VGA cooling',
    'Liquid cooling support at front, top & rear',
    'Supports full ATX motherboards',
  ].join('\n'),

  'aerocool-case-designer-g-bk-v2-argb-4-atx-micro-mini-atx': [
    'ATX mid-tower | Mesh front with ARGB lighting (All-Black)',
    '4 pre-installed fans | GPU up to 345mm | 360mm AIO support',
    'Supports up to 8 fans total',
    'Compatible with ATX, Micro-ATX & mini-ITX motherboards',
    'CPU cooler up to 158mm',
    'Sliding tempered glass side panel for easy access',
    'Clean all-black coating for a sleek appearance',
  ].join('\n'),

  'aerocool-case-dryft-g-bk-v2-atx-micro-mini-itx': [
    'ATX mid-tower | 6 pre-installed RGB fans',
    'GPU up to 419mm | CPU cooler up to 162mm | AIO ready',
    'Compatible with ATX, Micro-ATX & mini-ITX motherboards',
    'Dual chamber design for clean cable management',
    '2× SSD slots & 1× 3.5" HDD bay',
    'USB 3.0, USB 2.0 & HD audio front I/O',
    'Customisable RGB lighting effects',
  ].join('\n'),

  'aerocool-case-p500c-g-bk-v1': [
    'ATX mid-tower | Full tempered glass front & side (Black)',
    '4 pre-installed ARGB fans with "mirage" infinity mirror effect',
    'GPU up to 450mm | CPU cooler up to 162mm',
    'Radiator support: 360mm top/bottom, 280mm side, 120mm rear',
    'Dual chamber design for improved cable management',
    '3× SSD slots & 2× HDD bays',
    'Magnetic top & bottom dust filters',
  ].join('\n'),

  'aerocool-case-p500c-g-wt-v1': [
    'ATX mid-tower | Full tempered glass front & side (White)',
    '4 pre-installed ARGB fans with "mirage" infinity mirror effect',
    'GPU up to 450mm | CPU cooler up to 162mm',
    'Radiator support: 360mm top/bottom, 280mm side, 120mm rear',
    'Dual chamber design for improved cable management',
    '3× SSD slots & 2× HDD bays',
    'Magnetic top & bottom dust filters',
  ].join('\n'),

  // ── CPU Coolers ───────────────────────────────────────────────────────────

  'aerocool-air-cooler-cylon-4f-argb-pwm-4p-black': [
    'ARGB CPU air cooler | TDP up to 145W (Black)',
    '4 heat pipes | 12cm ARGB PWM fan',
    'ARGB LED on front and side for stylish rig lighting',
    'Compatible with ARGB motherboards or hubs',
    'Heat Core Touch Technology for efficient heat transfer',
    'Side cover for unidirectional airflow & improved dissipation',
    'Black-coated high-efficiency fins for better heat dissipation',
  ].join('\n'),

  'aerocool-air-cooler-cylon-4f-argb-pwm-4p-white': [
    'ARGB CPU air cooler | TDP up to 145W (White)',
    '4 heat pipes | 12cm ARGB PWM fan',
    'ARGB LED on front and side for stylish rig lighting',
    'Compatible with ARGB motherboards or hubs',
    'Heat Core Touch Technology for efficient heat transfer',
    'Side cover for unidirectional airflow & improved dissipation',
    'Black-coated high-efficiency fins for better heat dissipation',
  ].join('\n'),

  // ── Power Supplies ────────────────────────────────────────────────────────

  'aerocool-powersupply-integrator-gold-750w-fully-modular': [
    '750W fully modular | 80 Plus Gold certified (90%+ efficiency)',
    'ATX12V v3.0 & PCIe 5.0 compatible',
    'Japanese brand capacitors for high reliability',
    '12cm silent black fan with 0RPM mode at low load',
    'Four PCIe 6+2-pin connectors for high-end GPUs',
    'Optimised thermal fan speed control',
    'CE & UKCA certified for safe operation',
  ].join('\n'),

  'aerocool-powersupply-lux-750w-230v-apfc': [
    '750W semi-modular | 80 Plus Bronze certified (88%+ efficiency)',
    'Built-in APFC for stable power delivery',
    '80 Plus 230V EU Bronze certified',
    'Active Power Factor Correction (APFC)',
    'Reliable power delivery for mid-range builds',
    'Quiet cooling fan with thermal control',
    'Standard ATX form factor',
  ].join('\n'),

  'aerocool-powersupply-mirage-gold-850w-fully-modular': [
    '850W fully modular | 80 Plus Gold certified (90%+ efficiency)',
    'Infinity Mirror ARGB design | ARGB motherboard compatible',
    'Japanese 105°C main capacitors for high durability',
    'DC-to-DC conversion for tight voltage regulation',
    'Fully modular for clean cable management',
    '12cm high-pressure fan with thermal speed control',
    'Dual CPU connectors for high-end Intel & AMD Ryzen CPUs',
  ].join('\n'),
}

export async function GET() {
  await connectDB()
  const results = []

  for (const [slug, shortDescription] of Object.entries(updates)) {
    const res = await Product.updateOne(
      { brandSlug: 'aerocool', slug },
      { $set: { shortDescription } }
    )
    results.push({ slug, updated: res.modifiedCount > 0 })
  }

  return NextResponse.json({ total: results.length, results })
}

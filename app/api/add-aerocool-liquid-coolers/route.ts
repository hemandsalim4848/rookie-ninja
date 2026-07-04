import { NextResponse } from 'next/server'
import { connectDB } from '@/src/lib/mongodb'
import { Brand } from '@/src/lib/models/Brands'
import { Product } from '@/src/lib/models/Products'

const CLOUD = 'df52xzi3y'
const cf = (url: string) =>
  `https://res.cloudinary.com/${CLOUD}/image/fetch/f_auto,q_auto/${url}`

const coolers = [
  {
    name: 'Aerocool Abyss L240R Digi',
    slug: 'aerocool-liquid-cooler-abyss-l240r-digi',
    shortDescription: [
      '240mm radiator with real-time temperature display on pump head',
      'Copper water block for maximum heat transfer efficiency',
      '280W TDP — handles high-end Intel and AMD CPUs',
      'ARGB pump + fans with 3-pin 5V connector for sync',
      'Fan speed: 660–1800 RPM with PWM 4-pin control',
      'Ceramic bearing pump rated 30,000 hrs MTBF',
      'Compatible with Intel LGA1851/1700/1200/115X and AMD AM5/AM4',
    ].join('\n'),
    images: [
      'https://aerocool.io/wp-content/uploads/2025/10/abyssL240R-digi_product-gallery_bk_1.png',
      'https://aerocool.io/wp-content/uploads/2025/10/abyssL240R-digi_product-gallery_bk_2.png',
      'https://aerocool.io/wp-content/uploads/2025/10/abyssL240R-digi_product-image_2-700x700.jpg',
      'https://aerocool.io/wp-content/uploads/2025/10/abyssL360R_product-image_3-1-700x700.jpg',
    ].map(cf),
    specs: [
      { key: 'Radiator Size', value: '240mm' },
      { key: 'Radiator Dimension', value: '277 × 120 × 27 mm' },
      { key: 'TDP', value: '280W' },
      { key: 'Block Material', value: 'Copper' },
      { key: 'Pump Speed', value: '600 ~ 3000 RPM ± 10%' },
      { key: 'Pump Bearing', value: 'Ceramic bearing' },
      { key: 'Fan Speed', value: '660 ~ 1800 RPM ± 10%' },
      { key: 'Fan Noise', value: '36.0 dB(A) Max' },
      { key: 'LED Type', value: 'Addressable RGB (ARGB) — 3-pin 5V' },
      { key: 'Socket', value: 'Intel LGA1851/1700/1200/115X | AMD AM5/AM4' },
    ],
  },
  {
    name: 'Aerocool Abyss L360R Digi',
    slug: 'aerocool-liquid-cooler-abyss-l360r-digi',
    shortDescription: [
      '360mm radiator with real-time CPU & GPU temperature display on pump head',
      'Copper water block for maximum heat transfer efficiency',
      '320W TDP — elite cooling for high-end Intel and AMD builds',
      'ARGB pump + fans with 3-pin 5V connector for system sync',
      'Fan speed: 660–1800 RPM with PWM 4-pin control',
      'Ceramic bearing pump rated 30,000 hrs MTBF',
      'Compatible with Intel LGA1851/1700/1200/115X and AMD AM5/AM4',
    ].join('\n'),
    images: [
      'https://aerocool.io/wp-content/uploads/2025/10/abyssL360R-digi_product-gallery_bk_1.png',
      'https://aerocool.io/wp-content/uploads/2025/10/abyssL360R-digi_product-gallery_bk_2.png',
      'https://aerocool.io/wp-content/uploads/2025/10/abyssL360R-digi_product-gallery_bk_3.png',
      'https://aerocool.io/wp-content/uploads/2025/10/abyssL360R-digi_product-gallery_wt_1-1.png',
    ].map(cf),
    specs: [
      { key: 'Radiator Size', value: '360mm' },
      { key: 'Radiator Dimension', value: '394 × 120 × 27 mm' },
      { key: 'TDP', value: '320W' },
      { key: 'Block Material', value: 'Copper' },
      { key: 'Pump Speed', value: '600 ~ 3000 RPM ± 10%' },
      { key: 'Pump Bearing', value: 'Ceramic bearing' },
      { key: 'Fan Speed', value: '660 ~ 1800 RPM ± 10%' },
      { key: 'Fan Noise', value: '36.0 dB(A) Max' },
      { key: 'LED Type', value: 'Addressable RGB (ARGB) — 3-pin 5V' },
      { key: 'Socket', value: 'Intel LGA1851/1700/1200/115X | AMD AM5/AM4' },
    ],
  },
  {
    name: 'Aerocool Abyss L240R',
    slug: 'aerocool-liquid-cooler-abyss-l240r',
    shortDescription: [
      '240mm ARGB liquid cooler with copper water block',
      'Available in Black and White — designed to match any build',
      '280W TDP for mid-to-high-end Intel and AMD processors',
      'ARGB pump and fans with addressable 3-pin 5V connector',
      'PWM 4-pin fan control: 660–1800 RPM',
      'Ceramic bearing pump rated 30,000 hrs MTBF',
      'Compatible with Intel LGA1851/1700/1200/115X and AMD AM5/AM4',
    ].join('\n'),
    images: [
      'https://aerocool.io/wp-content/uploads/2025/10/abyssL240R_product-image_bk_1-23.png',
      'https://aerocool.io/wp-content/uploads/2025/10/abyssL240R_product-image_bk_2-24.png',
      'https://aerocool.io/wp-content/uploads/2025/10/abyssL240R_product-image_bk_3-25.png',
      'https://aerocool.io/wp-content/uploads/2025/10/abyssL240R_product-image_wt_1-27-1.png',
    ].map(cf),
    specs: [
      { key: 'Radiator Size', value: '240mm' },
      { key: 'Radiator Dimension', value: '277 × 120 × 27 mm' },
      { key: 'TDP', value: '280W' },
      { key: 'Block Material', value: 'Copper' },
      { key: 'Pump Speed', value: '600 ~ 3000 RPM ± 10%' },
      { key: 'Pump Bearing', value: 'Ceramic bearing' },
      { key: 'Fan Speed', value: '660 ~ 1800 RPM ± 10%' },
      { key: 'Fan Noise', value: '36.0 dB(A) Max' },
      { key: 'LED Type', value: 'Addressable RGB (ARGB) — 3-pin 5V' },
      { key: 'Socket', value: 'Intel LGA1851/1700/1200/115X | AMD AM5/AM4' },
    ],
  },
  {
    name: 'Aerocool Abyss L360R',
    slug: 'aerocool-liquid-cooler-abyss-l360r',
    shortDescription: [
      '360mm ARGB liquid cooler with copper water block',
      'Available in Black and White — designed to match any build',
      '320W TDP for high-end Intel and AMD processors',
      'ARGB pump and fans with addressable 3-pin 5V connector',
      'PWM 4-pin fan control: 660–1800 RPM',
      'Ceramic bearing pump rated 30,000 hrs MTBF',
      'Compatible with Intel LGA1851/1700/1200/115X and AMD AM5/AM4',
    ].join('\n'),
    images: [
      'https://aerocool.io/wp-content/uploads/2025/10/abyssL360R_product-image_bk_1-1.png',
      'https://aerocool.io/wp-content/uploads/2025/10/abyssL360R_product-image_bk_2-1.png',
      'https://aerocool.io/wp-content/uploads/2025/10/abyssL360R_product-image_bk_3-1.png',
      'https://aerocool.io/wp-content/uploads/2025/10/abyssL360R_product-image_wt_1-2.png',
    ].map(cf),
    specs: [
      { key: 'Radiator Size', value: '360mm' },
      { key: 'Radiator Dimension', value: '394 × 120 × 27 mm' },
      { key: 'TDP', value: '320W' },
      { key: 'Block Material', value: 'Copper' },
      { key: 'Pump Speed', value: '600 ~ 3000 RPM ± 10%' },
      { key: 'Pump Bearing', value: 'Ceramic bearing' },
      { key: 'Fan Speed', value: '660 ~ 1800 RPM ± 10%' },
      { key: 'Fan Noise', value: '36.0 dB(A) Max' },
      { key: 'LED Type', value: 'Addressable RGB (ARGB) — 3-pin 5V' },
      { key: 'Socket', value: 'Intel LGA1851/1700/1200/115X | AMD AM5/AM4' },
    ],
  },
  {
    name: 'Aerocool Oasis L360',
    slug: 'aerocool-liquid-cooler-oasis-l360',
    shortDescription: [
      '360mm liquid cooler with mirage-design ARGB pump head',
      'Available in Black and White with full ARGB lighting',
      '300W TDP — handles demanding modern CPUs',
      'Copper water block and corrosion-resistant aluminium radiator',
      'High-airflow fans: 500–2200 RPM with hydraulic bearing',
      'Wide socket support: Intel LGA1851/1700/1200/115X/1366 and AMD AM5/AM4/AM3',
    ].join('\n'),
    images: [
      'https://aerocool.io/wp-content/uploads/2024/08/OasisL360-BK-Product-Gallery-1.jpg',
      'https://aerocool.io/wp-content/uploads/2024/08/OasisL360-BK-Product-Gallery-2.jpg',
      'https://aerocool.io/wp-content/uploads/2024/08/OasisL360-BK-Product-Gallery-3.jpg',
      'https://aerocool.io/wp-content/uploads/2024/08/OasisL360-WH-Product-Gallery-1.jpg',
    ].map(cf),
    specs: [
      { key: 'Radiator Size', value: '360mm' },
      { key: 'Radiator Dimension', value: '392 × 121 × 27 mm' },
      { key: 'TDP', value: '300W' },
      { key: 'Block Material', value: 'Copper' },
      { key: 'Pump Speed', value: '2700 RPM' },
      { key: 'Pump Bearing', value: 'Stainless Steel Bearing' },
      { key: 'Fan Speed', value: '500–2200 RPM (PWM)' },
      { key: 'Fan Noise', value: '36.0 dB(A) Max' },
      { key: 'Fan Bearing', value: 'Hydraulic Bearing' },
      { key: 'Socket', value: 'Intel LGA1851/1700/1200/115X/1366 | AMD AM5/AM4/AM3/AM2/FM2/FM1' },
    ],
  },
  {
    name: 'Aerocool Mirage L120',
    slug: 'aerocool-liquid-cooler-mirage-l120',
    shortDescription: [
      '120mm liquid cooler with Infinity Mirror ARGB pump head',
      'Copper water block and aluminium radiator construction',
      '200W TDP — ideal for mainstream Intel and AMD builds',
      'PWM fan control: 600–1800 RPM with hydraulic bearing',
      'Fan MTBF: 60,000 hrs for long-term reliability',
      'Compatible with Intel LGA2066/2011/1700/1200/115X and AMD AM5/AM4/AM3',
    ].join('\n'),
    images: [
      'https://aerocool.io/wp-content/uploads/2020/08/Mirage-L120-Product-Photo-Gallery-1042x589-01.jpg',
      'https://aerocool.io/wp-content/uploads/2020/08/Mirage-L120-Product-Photo-Gallery-1042x589-02.jpg',
      'https://aerocool.io/wp-content/uploads/2020/08/Mirage-L120-Product-Photo-Gallery-1042x589-06.jpg',
      'https://aerocool.io/wp-content/uploads/2020/08/Mirage-L120-Product-Photo-Gallery-1042x589-04.jpg',
    ].map(cf),
    specs: [
      { key: 'Radiator Size', value: '120mm' },
      { key: 'Radiator Dimension', value: '154 × 120 × 27 mm' },
      { key: 'TDP', value: '200W' },
      { key: 'Block Material', value: 'Copper' },
      { key: 'Pump Speed', value: '2300 RPM' },
      { key: 'Pump Bearing', value: 'Stainless Steel Bearing' },
      { key: 'Fan Speed', value: '600–1800 RPM (PWM)' },
      { key: 'Fan Noise', value: '26.8 dB(A) Max' },
      { key: 'Fan MTBF', value: '60,000 hrs' },
      { key: 'Socket', value: 'LGA2066/2011/1700/1200/115X | AM5/AM4/AM3/AM2/FM2/FM1' },
    ],
  },
  {
    name: 'Aerocool Mirage L240',
    slug: 'aerocool-liquid-cooler-mirage-l240',
    shortDescription: [
      '240mm liquid cooler with Infinity Mirror ARGB pump head',
      'Copper water block and aluminium radiator construction',
      '400W TDP — suited for high-performance Intel and AMD CPUs',
      'PWM fan control: 600–1800 RPM with hydraulic bearing',
      'Fan MTBF: 60,000 hrs for long-term reliability',
      'Compatible with Intel LGA2066/2011/1700/1200/115X and AMD AM5/AM4/AM3',
    ].join('\n'),
    images: [
      'https://aerocool.io/wp-content/uploads/2020/08/Mirage-L240-Product-Photo-Gallery-1042x589-01.jpg',
      'https://aerocool.io/wp-content/uploads/2020/08/Mirage-L240-Product-Photo-Gallery-1042x589-02.jpg',
      'https://aerocool.io/wp-content/uploads/2020/08/Mirage-L240-Product-Photo-Gallery-1042x589-04.jpg',
      'https://aerocool.io/wp-content/uploads/2020/08/Mirage-L240-Product-Photo-Gallery-1042x589-03.jpg',
    ].map(cf),
    specs: [
      { key: 'Radiator Size', value: '240mm' },
      { key: 'Radiator Dimension', value: '274 × 120 × 27 mm' },
      { key: 'TDP', value: '400W' },
      { key: 'Block Material', value: 'Copper' },
      { key: 'Pump Speed', value: '2300 RPM' },
      { key: 'Pump Bearing', value: 'Stainless Steel Bearing' },
      { key: 'Fan Speed', value: '600–1800 RPM (PWM)' },
      { key: 'Fan Noise', value: '26.8 dB(A) Max' },
      { key: 'Fan MTBF', value: '60,000 hrs' },
      { key: 'Socket', value: 'LGA2066/2011/1700/1200/115X | AM5/AM4/AM3/AM2/FM2/FM1' },
    ],
  },
  {
    name: 'Aerocool Mirage L360',
    slug: 'aerocool-liquid-cooler-mirage-l360',
    shortDescription: [
      '360mm liquid cooler with Infinity Mirror ARGB pump head',
      'Copper water block and aluminium radiator construction',
      '550W TDP — exceptional performance for extreme builds',
      'PWM fan control: 600–2000 RPM with hydraulic bearing',
      'Fan MTBF: 60,000 hrs for long-term reliability',
      'Compatible with Intel LGA2066/2011/1700/1200/115X and AMD AM5/AM4/AM3',
    ].join('\n'),
    images: [
      'https://aerocool.io/wp-content/uploads/2020/08/Mirage-L360-Product-Photo-Gallery-1042x589-02-1.jpg',
      'https://aerocool.io/wp-content/uploads/2020/08/Mirage-L360-Product-Photo-Gallery-1042x589-01-1.jpg',
      'https://aerocool.io/wp-content/uploads/2020/08/Mirage-L360-Product-Photo-Gallery-1042x589-06.jpg',
      'https://aerocool.io/wp-content/uploads/2020/08/Mirage-L360-Product-Photo-Gallery-1042x589-05.jpg',
    ].map(cf),
    specs: [
      { key: 'Radiator Size', value: '360mm' },
      { key: 'Radiator Dimension', value: '394 × 120 × 27 mm' },
      { key: 'TDP', value: '550W' },
      { key: 'Block Material', value: 'Copper' },
      { key: 'Pump Speed', value: '2300 RPM' },
      { key: 'Pump Bearing', value: 'Stainless Steel Bearing' },
      { key: 'Fan Speed', value: '600–2000 RPM (PWM)' },
      { key: 'Fan Noise', value: '26.8 dB(A) Max' },
      { key: 'Fan MTBF', value: '60,000 hrs' },
      { key: 'Socket', value: 'LGA2066/2011/1700/1200/115X | AM5/AM4/AM3/AM2/FM2/FM1' },
    ],
  },
  {
    name: 'Aerocool Pulse L240F',
    slug: 'aerocool-liquid-cooler-pulse-l240f',
    shortDescription: [
      '240mm liquid cooler with Halo LED pump head and ARGB fans',
      'Copper water block for efficient heat dissipation',
      '400W TDP — suited for gaming and workstation CPUs',
      'Ceramics bearing pump rated 80,000 hrs MTBF',
      'PWM fan control: 600–1800 RPM with hydraulic bearing',
      'Compatible with Intel LGA2066/2011-V3/115X/1200 and AMD AM4/AM3+',
    ].join('\n'),
    images: [
      'https://aerocool.io/wp-content/uploads/2019/04/Pulse-L240-F-Product-Photo-Gallery-1042x589-06.png',
      'https://aerocool.io/wp-content/uploads/2019/04/Pulse-L240-F-Product-Photo-Gallery-1042x589-05.png',
      'https://aerocool.io/wp-content/uploads/2019/04/Pulse-L240-F-Product-Photo-Gallery-1042x589-04.png',
      'https://aerocool.io/wp-content/uploads/2019/04/Pulse-L240-F-Product-Photo-Gallery-1042x589-03.png',
    ].map(cf),
    specs: [
      { key: 'Radiator Size', value: '240mm' },
      { key: 'Radiator Dimension', value: '296 × 123.5 × 40.5 mm' },
      { key: 'TDP', value: '400W' },
      { key: 'Block Material', value: 'Copper' },
      { key: 'Pump Speed', value: '2800 RPM' },
      { key: 'Pump Bearing', value: 'Ceramics Bearing — 80,000 hrs MTBF' },
      { key: 'Fan Speed', value: '600–1800 RPM (PWM)' },
      { key: 'Fan Noise', value: '31.8 dB(A) Max' },
      { key: 'Fan Bearing', value: 'Hydraulic Bearing — 60,000 hrs' },
      { key: 'Socket', value: 'LGA2066/2011-V3/115X/775/1200 | FM1/FM2/AM4/AM3+/AM2' },
    ],
  },
  {
    name: 'Aerocool Pulse L120F',
    slug: 'aerocool-liquid-cooler-pulse-l120f',
    shortDescription: [
      '120mm liquid cooler with Halo LED pump head and ARGB fan',
      'Copper water block for efficient heat dissipation',
      '200W TDP — suited for compact and mid-range builds',
      'Ceramics bearing pump rated 80,000 hrs MTBF',
      'PWM fan control: 600–1800 RPM with hydraulic bearing',
      'Compatible with Intel LGA2066/2011-V3/115X/1200 and AMD AM4/AM3+',
    ].join('\n'),
    images: [
      'https://aerocool.io/wp-content/uploads/2019/04/Pulse-L120F-Product-Photo-Gallery-1042x589-05.png',
      'https://aerocool.io/wp-content/uploads/2019/04/Pulse-L120F-Product-Photo-Gallery-1042x589-04.png',
      'https://aerocool.io/wp-content/uploads/2019/04/Pulse-L120F-Product-Photo-Gallery-1042x589-03.png',
      'https://aerocool.io/wp-content/uploads/2019/04/Pulse-L120F-Product-Photo-Gallery-1042x589-02.png',
    ].map(cf),
    specs: [
      { key: 'Radiator Size', value: '120mm' },
      { key: 'Radiator Dimension', value: '176 × 123.5 × 40.5 mm' },
      { key: 'TDP', value: '200W' },
      { key: 'Block Material', value: 'Copper' },
      { key: 'Pump Speed', value: '2800 RPM' },
      { key: 'Pump Bearing', value: 'Ceramics Bearing — 80,000 hrs MTBF' },
      { key: 'Fan Speed', value: '600–1800 RPM (PWM)' },
      { key: 'Fan Noise', value: '31.8 dB(A) Max' },
      { key: 'Fan Bearing', value: 'Hydraulic Bearing — 60,000 hrs' },
      { key: 'Socket', value: 'LGA2066/2011-V3/115X/775/1200 | FM1/FM2/AM4/AM3+/AM2' },
    ],
  },
  {
    name: 'Aerocool Pulse L240',
    slug: 'aerocool-liquid-cooler-pulse-l240',
    shortDescription: [
      '240mm liquid cooler with Halo LED pump head and 8 RGB modes',
      'Copper water block for efficient heat dissipation',
      '400W TDP — suitable for gaming and productivity CPUs',
      'Ceramics bearing pump rated 80,000 hrs MTBF',
      'PWM fan control: 600–1800 RPM with hydraulic bearing',
      'Compatible with Intel LGA2066/2011-V3/115X/1200 and AMD AM4/AM3+',
    ].join('\n'),
    images: [
      'https://aerocool.io/wp-content/uploads/2018/12/Pulse-L240-Product-Photo-Gallery-1042x589-06.png',
      'https://aerocool.io/wp-content/uploads/2018/12/Pulse-L240-Product-Photo-Gallery-1042x589-05.png',
      'https://aerocool.io/wp-content/uploads/2018/12/Pulse-L240-Product-Photo-Gallery-1042x589-04.png',
      'https://aerocool.io/wp-content/uploads/2018/12/Pulse-L240-Product-Photo-Gallery-1042x589-03.png',
    ].map(cf),
    specs: [
      { key: 'Radiator Size', value: '240mm' },
      { key: 'Radiator Dimension', value: '296 × 123.5 × 40.5 mm' },
      { key: 'TDP', value: '400W' },
      { key: 'Block Material', value: 'Copper' },
      { key: 'Pump Speed', value: '2800 RPM' },
      { key: 'Pump Bearing', value: 'Ceramics Bearing — 80,000 hrs MTBF' },
      { key: 'Fan Speed', value: '600–1800 RPM (PWM)' },
      { key: 'Fan Noise', value: '31.8 dB(A) Max' },
      { key: 'Fan Bearing', value: 'Hydraulic Bearing — 60,000 hrs' },
      { key: 'Socket', value: 'LGA2066/2011-V3/115X/775/1200 | FM1/FM2/AM4/AM3+/AM2' },
    ],
  },
  {
    name: 'Aerocool Pulse L120',
    slug: 'aerocool-liquid-cooler-pulse-l120',
    shortDescription: [
      '120mm liquid cooler with Halo LED pump head and 8 RGB modes',
      'Copper water block for efficient heat dissipation',
      '200W TDP — ideal for compact and budget-friendly builds',
      'Ceramics bearing pump rated 80,000 hrs MTBF',
      'PWM fan control: 600–1800 RPM with hydraulic bearing',
      'Compatible with Intel LGA2066/2011-V3/115X/1200 and AMD AM4/AM3+',
    ].join('\n'),
    images: [
      'https://aerocool.io/wp-content/uploads/2018/12/Pulse-L120-Product-Photo-Gallery-1042x589-06.png',
      'https://aerocool.io/wp-content/uploads/2018/12/Pulse-L120-Product-Photo-Gallery-1042x589-05.png',
      'https://aerocool.io/wp-content/uploads/2018/12/Pulse-L120-Product-Photo-Gallery-1042x589-04.png',
      'https://aerocool.io/wp-content/uploads/2018/12/Pulse-L120-Product-Photo-Gallery-1042x589-03.png',
    ].map(cf),
    specs: [
      { key: 'Radiator Size', value: '120mm' },
      { key: 'Radiator Dimension', value: '176 × 123.5 × 40.5 mm' },
      { key: 'TDP', value: '200W' },
      { key: 'Block Material', value: 'Copper' },
      { key: 'Pump Speed', value: '2800 RPM' },
      { key: 'Pump Bearing', value: 'Ceramics Bearing — 80,000 hrs MTBF' },
      { key: 'Fan Speed', value: '600–1800 RPM (PWM)' },
      { key: 'Fan Noise', value: '31.8 dB(A) Max' },
      { key: 'Fan Bearing', value: 'Hydraulic Bearing — 60,000 hrs' },
      { key: 'Socket', value: 'LGA2066/2011-V3/115X/775/1200 | FM1/FM2/AM4/AM3+/AM2' },
    ],
  },
  {
    name: 'Aerocool P7-L240',
    slug: 'aerocool-liquid-cooler-p7-l240',
    shortDescription: [
      '240mm liquid cooler with 16.8M color RGB translucent pump head',
      'Part of the premium P7 series with striking visual design',
      '380W TDP — closed-loop cooling for high-performance builds',
      'Ceramics bearing pump rated 80,000 hrs MTBF',
      'Dual 120mm PWM fans: 600–1800 RPM',
      'Compatible with Intel LGA2066/2011-V3/115X/1366/1200 and AMD AM4/AM3+',
    ].join('\n'),
    images: [
      'https://aerocool.io/wp-content/uploads/2018/05/Aerocool-P7-L240-Infographic700x700px-5-1.jpg',
      'https://aerocool.io/wp-content/uploads/2018/05/Aerocool-P7-L240-Infographic700x700px-1-1.jpg',
      'https://aerocool.io/wp-content/uploads/2018/05/Aerocool-P7-L240-Infographic700x700px-2-1.jpg',
      'https://aerocool.io/wp-content/uploads/2018/05/Aerocool-P7-L240-Infographic700x700px-4-1.jpg',
    ].map(cf),
    specs: [
      { key: 'Radiator Size', value: '240mm' },
      { key: 'Radiator Dimension', value: '280 × 120 × 53 mm' },
      { key: 'TDP', value: '380W' },
      { key: 'Block Material', value: 'Copper' },
      { key: 'Pump Speed', value: '2500 RPM' },
      { key: 'Pump Bearing', value: 'Ceramics Bearing — 80,000 hrs MTBF' },
      { key: 'Fan Speed', value: '600–1800 RPM (PWM)' },
      { key: 'Fan Noise', value: '31.8 dB(A) Max' },
      { key: 'Fan Bearing', value: 'Hydraulic Bearing — 60,000 hrs' },
      { key: 'Socket', value: 'Intel LGA2066/2011-V3/115X/1366/775/1200 | AMD FM2/FM1/AM4/AM3+/AM2' },
    ],
  },
]

export async function GET() {
  await connectDB()

  const brand = await Brand.findOne({ slug: 'aerocool' })
  if (!brand) return NextResponse.json({ error: 'Aerocool brand not found' }, { status: 404 })

  let inserted = 0
  let skipped = 0
  let updated = 0

  for (const c of coolers) {
    const exists = await Product.findOne({ brandSlug: 'aerocool', slug: c.slug })
    if (exists) {
      await Product.updateOne(
        { brandSlug: 'aerocool', slug: c.slug },
        { $set: { images: c.images, shortDescription: c.shortDescription, specs: c.specs } }
      )
      updated++
      continue
    }

    await Product.create({
      brand: brand._id,
      brandSlug: 'aerocool',
      name: c.name,
      slug: c.slug,
      shortDescription: c.shortDescription,
      images: c.images,
      specs: c.specs,
      category: 'Liquid Coolers',
      featured: false,
    })
    inserted++
  }

  return NextResponse.json({ success: true, inserted, updated, skipped })
}

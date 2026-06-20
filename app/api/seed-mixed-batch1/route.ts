import { NextResponse } from 'next/server'
import { connectDB } from '@/src/lib/mongodb'
import { Product } from '@/src/lib/models/Products'
import mongoose from 'mongoose'

const Brand = mongoose.models.Brand || mongoose.model('Brand', new mongoose.Schema({ name: String, slug: String }))

const products = [
  {
    brandSlug: 'aztech',
    name: '55-inch Digital Signage Display',
    slug: '55-inch-digital-signage-display',
    sku: 'AZ-FDS-55',
    category: 'Digital Signage',
    images: ['https://products.rookie-ninja.com/wp-content/uploads/2025/07/Digital-signage-05.jpg'],
    shortDescription: `55-inch DLED Display
4GB RAM & 64GB ROM
Android 11 Operating System
Multiple Connectivity Options
High Brightness & Wide Viewing Angle
Remote Management`,
    description: `The AZTECH Digital Signage 55-inch Display is a premium solution designed for businesses requiring high-quality, dynamic visual communication. Its sleek, modern design offers an exceptional visual experience for showcasing advertisements, promotions, menus, and information in retail stores, corporate settings, or public venues.

Powered by Android 11, this smart digital signage solution enables easy content management, while its 4GB RAM and 64GB ROM provide ample processing power and storage for smooth playback and multitasking with high-resolution media files. Featuring DLED (Direct LED) technology, it delivers bright, crisp images with enhanced color accuracy and energy efficiency, making it ideal for both low-light and well-lit environments. With a 400 nits brightness level, the display ensures excellent visibility and clarity, even in areas with high ambient lighting.

The intuitive Android OS allows seamless integration of custom applications and content management software, empowering users to personalize the display for their specific needs.`,
    specs: [],
    downloads: [],
    featured: false,
  },
  {
    brandSlug: 'aztech',
    name: '55-inch Digital Signage Display with Touch Capability',
    slug: '55-inch-digital-signage-display-with-touch-capability',
    sku: 'AZ-FDS-55T',
    category: 'Digital Signage',
    images: ['https://products.rookie-ninja.com/wp-content/uploads/2025/07/Digital-signage-06.jpg'],
    shortDescription: `55-inch DLED Display
Touchscreen Capabilities
4GB RAM & 64GB ROM
Android 11 Operating System
Multiple Connectivity Options
High Brightness & Wide Viewing Angle
Remote Management`,
    description: `The AZTECH Digital Signage 55-inch Display with Touch is a premium solution designed for businesses requiring high-quality, dynamic visual communication. Its sleek, modern design offers an exceptional visual experience for showcasing advertisements, promotions, menus, and information in retail stores, corporate settings, or public venues.

Powered by Android 11, this smart digital signage solution enables easy content management, while its 4GB RAM and 64GB ROM provide ample processing power and storage for smooth playback and multitasking with high-resolution media files. Featuring DLED technology, it delivers bright, crisp images with enhanced color accuracy and energy efficiency. With a brightness level of 400 nits, it ensures clear, vivid visuals even in well-lit environments.

The intuitive Android OS allows seamless integration of custom applications and content management software. Additionally, the built-in touchscreen functionality enables customers and visitors to engage directly with your content for a more dynamic and interactive experience.`,
    specs: [],
    downloads: [],
    featured: false,
  },
  {
    brandSlug: 'viewsonic',
    name: 'Viewsonic EP5542',
    slug: 'viewsonic-ep5542',
    sku: '',
    category: 'Digital Signage',
    images: [
      'https://products.rookie-ninja.com/wp-content/uploads/2025/07/lg_1000p_538c3040-dd51-40a0-aa43-e97aaa169112.webp',
      'https://products.rookie-ninja.com/wp-content/uploads/2025/07/lg_1000p_15bcc254-4b59-4938-8827-8bc0b4477544.webp',
      'https://products.rookie-ninja.com/wp-content/uploads/2025/07/lg_1000p_be9cebac-431e-48c2-8888-c1180065dece.webp',
      'https://products.rookie-ninja.com/wp-content/uploads/2025/07/lg_1000p_621cfc21-0683-4ad2-8ae8-937deb27027d.webp',
      'https://products.rookie-ninja.com/wp-content/uploads/2025/07/lg_1000p_2f15fa18-a72d-42b2-8822-2ac0e02d8f0e.webp',
      'https://products.rookie-ninja.com/wp-content/uploads/2025/07/lg_1000p_95f3c9b6-2efb-4c1a-8c60-30deb3b94183.webp',
      'https://products.rookie-ninja.com/wp-content/uploads/2025/07/lg_1000p_f6a5ca74-1ac8-4753-8494-8abbe1a48615.webp',
      'https://products.rookie-ninja.com/wp-content/uploads/2025/07/lg_1000p_9461fd02-389a-442d-a36d-c82758a13335.webp',
      'https://products.rookie-ninja.com/wp-content/uploads/2025/07/lg_1000p_adc23406-3f80-4258-927f-a90f25e41325.webp',
      'https://products.rookie-ninja.com/wp-content/uploads/2025/07/lg_1000p_f1704245-2c68-436a-9c35-76960a5081e5.webp',
      'https://products.rookie-ninja.com/wp-content/uploads/2025/07/lg_1000p_cef86c99-780d-4b58-a1c0-3be7f0841add.webp',
    ],
    shortDescription: `55" All-in-One Digital ePoster
Slim, freestanding design for modern settings
Exceptional picture quality
Superb processing power with built-in quad-core media player
Total remote control with RS232 commands within Local Area Network
Effortless integrated device and content management`,
    description: `Uber-sleek and slim, the freestanding ViewSonic EP5542 is the ideal digital ePoster kiosk for high-impact visual messaging. Designed with a scratch-proof glass faceplate for added durability, it delivers unsurpassable visibility regardless of dust or ambient light. The 4K UHD IPS panel is equipped with dual 10W stereo speakers, 178° wide-angle viewing, and 450 nits of brightness, projecting crisp, vivid images and videos to engage the crowd. The EP5542 allows seamless multimedia playback with its embedded Quad-core media player and 16GB worth of internal memory. Made for effortless remote control, manage settings of multiple devices wherever via the vController app integrated with RS232 and LAN command.`,
    specs: [],
    downloads: [],
    featured: false,
  },
  {
    brandSlug: 'viewsonic',
    name: 'Viewsonic EP5542T',
    slug: 'viewsonic-ep5542t',
    sku: '',
    category: 'Digital Signage',
    images: [
      'https://products.rookie-ninja.com/wp-content/uploads/2025/07/lg_1000p_15bcc254-4b59-4938-8827-8bc0b4477544.webp',
      'https://products.rookie-ninja.com/wp-content/uploads/2025/07/lg_1000p_538c3040-dd51-40a0-aa43-e97aaa169112.webp',
      'https://products.rookie-ninja.com/wp-content/uploads/2025/07/lg_1000p_be9cebac-431e-48c2-8888-c1180065dece.webp',
      'https://products.rookie-ninja.com/wp-content/uploads/2025/07/lg_1000p_621cfc21-0683-4ad2-8ae8-937deb27027d.webp',
      'https://products.rookie-ninja.com/wp-content/uploads/2025/07/lg_1000p_9461fd02-389a-442d-a36d-c82758a13335.webp',
      'https://products.rookie-ninja.com/wp-content/uploads/2025/07/lg_1000p_adc23406-3f80-4258-927f-a90f25e41325.webp',
      'https://products.rookie-ninja.com/wp-content/uploads/2025/07/lg_1000p_f1704245-2c68-436a-9c35-76960a5081e5.webp',
      'https://products.rookie-ninja.com/wp-content/uploads/2025/07/lg_1000p_cef86c99-780d-4b58-a1c0-3be7f0841add.webp',
      'https://products.rookie-ninja.com/wp-content/uploads/2025/07/lg_1000p_2f15fa18-a72d-42b2-8822-2ac0e02d8f0e.webp',
      'https://products.rookie-ninja.com/wp-content/uploads/2025/07/lg_1000p_95f3c9b6-2efb-4c1a-8c60-30deb3b94183.webp',
      'https://products.rookie-ninja.com/wp-content/uploads/2025/07/lg_1000p_f6a5ca74-1ac8-4753-8494-8abbe1a48615.webp',
    ],
    shortDescription: `55 inch Multi-touch Digital ePoster
3840 x 2160 4K resolution
Infrared 10-point touch
Embedded media player and 16GB storage
USB multimedia playback
Remote settings`,
    description: `The ViewSonic EP5542T is a 10-point interactive 55" all-in-one free-standing digital ePoster kiosk with a sleek, slim design. Great for grabbing attention in busy, high-traffic areas, the EP5542T comes with a scratch-proof tempered glass faceplate for added durability. Featuring 4K resolution, 178°/178° wide-angle viewing, and dual 10W stereo speakers, the EP5542T delivers customized multimedia messaging with vivid clarity. Photo and video files can be played back using the embedded ARM media player and 16GB of internal memory, or add your own media player using the convenient media player cradle inside the lockable security door.`,
    specs: [],
    downloads: [],
    featured: false,
  },
  {
    brandSlug: 'viewsonic',
    name: 'ViewSonic EP5540',
    slug: 'viewsonic-ep5540',
    sku: '',
    category: 'Digital Signage',
    images: [
      'https://products.rookie-ninja.com/wp-content/uploads/2025/07/lg_1000p_c79f6b6a-445a-4bd9-bb96-9501672f84cb.webp',
      'https://products.rookie-ninja.com/wp-content/uploads/2025/07/lg_1000p_066aa1c0-d148-4075-8444-e0c98ccda1cf.webp',
      'https://products.rookie-ninja.com/wp-content/uploads/2025/07/lg_1000p_1e11ab8b-56f4-4239-9b1c-3a4d5d08e52b.webp',
      'https://products.rookie-ninja.com/wp-content/uploads/2025/07/lg_1000p_fe0f19d6-4fb4-4c76-b87a-aa7aa0f88771.webp',
    ],
    shortDescription: `3840 x 2160 4K resolution
Embedded media player and 16GB storage
USB multimedia playback
Expandable external media player holder
LAN function to access to web`,
    description: `The ViewSonic EP5540 is a 55" all-in-one free-standing digital ePoster kiosk with a sleek, slim design. Great for grabbing attention in busy, high-traffic areas, the EP5540 comes with a scratch-proof tempered glass faceplate for added durability. Featuring 4K resolution, 178°/178° wide-angle viewing, and dual 10W stereo speakers, the EP5540 delivers customised multimedia messaging with vivid clarity. Photo and video files can be played back using the embedded Quad-core media player and 16GB of internal memory, or add your own media player using the convenient media player cradle inside the lockable security door.`,
    specs: [],
    downloads: [],
    featured: false,
  },
]

export async function GET() {
  await connectDB()
  const results = []

  for (const p of products) {
    const brand = await Brand.findOne({ slug: p.brandSlug })
    if (!brand) { results.push({ slug: p.slug, status: 'brand not found' }); continue }

    const existing = await Product.findOne({ brandSlug: p.brandSlug, slug: p.slug })
    if (existing) {
      await Product.findByIdAndUpdate(existing._id, { images: p.images })
      results.push({ slug: p.slug, status: 'updated images' })
      continue
    }

    await Product.create({ ...p, brand: brand._id })
    results.push({ slug: p.slug, status: 'created' })
  }

  return NextResponse.json({ total: results.length, results })
}

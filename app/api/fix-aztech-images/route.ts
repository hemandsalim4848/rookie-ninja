import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI!);
}

const imageUpdates: { slug: string; images: string[] }[] = [
  {
    slug: 'aztech-hypercable-usb-c-60w-1m-black',
    images: ['https://res.cloudinary.com/df52xzi3y/image/upload/v1783682017/aztech-aztech-hypercable-usb-c-60w-1m-black-0-Product-images_Cable-01-76.jpg'],
  },
  {
    slug: 'aztech-gan-hypercharger-3-ports-70w',
    images: ['https://res.cloudinary.com/df52xzi3y/image/upload/v1783682020/aztech-aztech-gan-hypercharger-3-ports-70w-0-Product-images_Gan3-01.jpg'],
  },
  {
    slug: 'aztech-gan-ii-hypercharger-dual-ports-45w',
    images: ['https://res.cloudinary.com/df52xzi3y/image/upload/v1783682027/aztech-aztech-gan-ii-hypercharger-dual-ports-45w-0-Product-images_Gan2-01.jpg'],
  },
  {
    slug: 'aztech-gan-car-hypercharger-3-ports-95w',
    images: ['https://res.cloudinary.com/df52xzi3y/image/upload/v1783682032/aztech-aztech-gan-car-hypercharger-3-ports-95w-0-Product-images_Car-Charger2-02-.jpg'],
  },
  {
    slug: 'aztech-gan-car-hypercharger-dual-ports-95w',
    images: ['https://res.cloudinary.com/df52xzi3y/image/upload/v1783682038/aztech-aztech-gan-car-hypercharger-dual-ports-95w-0-Product-images_Car-Charger-0.jpg'],
  },
  {
    slug: 'aztech-hypercable-usb-c-240w-1m-black',
    images: ['https://res.cloudinary.com/df52xzi3y/image/upload/v1783682039/aztech-aztech-hypercable-usb-c-240w-1m-black-0-WhatsApp-Image-2024-12-17-at-12-4.jpg'],
  },
  {
    slug: 'aztech-hypercable-usb-c-240w-2m-titanium',
    images: ['https://res.cloudinary.com/df52xzi3y/image/upload/v1783682040/aztech-aztech-hypercable-usb-c-240w-2m-titanium-0-WhatsApp-Image-2024-12-17-at-1.jpg'],
  },
  {
    slug: 'aztech-supersonic-wired-earphone-type-c-1m',
    images: ['https://res.cloudinary.com/df52xzi3y/image/upload/v1783682043/aztech-aztech-supersonic-wired-earphone-type-c-1m-0-Product-images_Earphone-Wire.jpg'],
  },
  {
    slug: 'aztech-waterproof-portable-speaker',
    images: ['https://res.cloudinary.com/df52xzi3y/image/upload/v1783682053/aztech-aztech-waterproof-portable-speaker-0-Product-images_Speaker-01.jpg'],
  },
  {
    slug: 'aztech-wireless-earbuds-led-display-charging-case',
    images: ['https://res.cloudinary.com/df52xzi3y/image/upload/v1783682058/aztech-aztech-wireless-earbuds-led-display-charging-case-0-Product-images_TWS-01.jpg'],
  },
  {
    slug: 'aztech-powerflow-3-way-3m-universal-extension',
    images: ['https://res.cloudinary.com/df52xzi3y/image/upload/v1783682063/aztech-aztech-powerflow-3-way-3m-universal-extension-0-Product-images_Powerflow-3.jpg'],
  },
  {
    slug: 'aztech-powerflow-5-way-3m-universal-extension',
    images: ['https://res.cloudinary.com/df52xzi3y/image/upload/v1783682067/aztech-aztech-powerflow-5-way-3m-universal-extension-0-Product-images_Powerflow-5.jpg'],
  },
  {
    slug: 'aztech-powerflow-4-way-5m-universal-extension',
    images: ['https://res.cloudinary.com/df52xzi3y/image/upload/v1783682072/aztech-aztech-powerflow-4-way-5m-universal-extension-0-Product-images_Powerflow-4.jpg'],
  },
  {
    slug: 'aztech-powerflow-5-way-5m-universal-extension',
    images: ['https://res.cloudinary.com/df52xzi3y/image/upload/v1783682078/aztech-aztech-powerflow-5-way-5m-universal-extension-0-Product-images_Powerflow-5.jpg'],
  },
  {
    slug: 'aztech-wireless-gaming-headset-with-led',
    images: ['https://res.cloudinary.com/df52xzi3y/image/upload/v1783682089/aztech-aztech-wireless-gaming-headset-with-led-0-Product-images_Headphone-01.jpg'],
  },
  {
    slug: 'aztech-wired-gaming-headset-with-microphone',
    images: ['https://res.cloudinary.com/df52xzi3y/image/upload/v1783682102/aztech-aztech-wired-gaming-headset-with-microphone-0-headset-side-view.jpg'],
  },
  {
    slug: 'aztech-gaming-mouse-infrared-micro-switch-laser',
    images: ['https://res.cloudinary.com/df52xzi3y/image/upload/v1783682109/aztech-aztech-gaming-mouse-infrared-micro-switch-laser-0-mouse-top-view.jpg'],
  },
  {
    slug: 'aztech-gaming-mouse-pad-black',
    images: ['https://res.cloudinary.com/df52xzi3y/image/upload/v1783682117/aztech-aztech-gaming-mouse-pad-black-0-mouse-pad-front-view.jpg'],
  },
  {
    slug: 'aztech-mechanical-gaming-keyboard-rgb',
    images: ['https://res.cloudinary.com/df52xzi3y/image/upload/v1783682126/aztech-aztech-mechanical-gaming-keyboard-rgb-0-rcb-keyboard-view.jpg'],
  },
  {
    slug: 'aztech-extra-large-led-gaming-mouse-pad',
    images: ['https://res.cloudinary.com/df52xzi3y/image/upload/v1783682134/aztech-aztech-extra-large-led-gaming-mouse-pad-0-mouse-pad-side-view-1.jpg'],
  },
  {
    slug: 'aztech-360mm-black-liquid-cooler',
    images: ['https://res.cloudinary.com/df52xzi3y/image/upload/v1783682137/aztech-aztech-360mm-black-liquid-cooler-0-360black2.webp'],
  },
  {
    slug: 'aztech-360mm-white-liquid-cooler',
    images: ['https://res.cloudinary.com/df52xzi3y/image/upload/v1783682141/aztech-aztech-360mm-white-liquid-cooler-0-360white2.webp'],
  },
  {
    slug: 'aztech-240mm-black-liquid-cooler',
    images: ['https://res.cloudinary.com/df52xzi3y/image/upload/v1783682145/aztech-aztech-240mm-black-liquid-cooler-0-240black2.webp'],
  },
  {
    slug: 'aztech-240mm-white-liquid-cooler',
    images: ['https://res.cloudinary.com/df52xzi3y/image/upload/v1783682149/aztech-aztech-240mm-white-liquid-cooler-0-240white2.webp'],
  },
  // Soundbars
  {
    slug: 'aztech-201-soundbar-with-wired-subwoofer',
    images: ['https://res.cloudinary.com/df52xzi3y/image/upload/v1783680083/aztech-aztech-201-soundbar-with-wired-subwoofer-0-Product-images_Soundbar-2-1-01.jpg'],
  },
  {
    slug: 'aztech-501-soundbar-with-wired-subwoofer',
    images: ['https://res.cloudinary.com/df52xzi3y/image/upload/v1783680092/aztech-aztech-501-soundbar-with-wired-subwoofer-0-Product-images_Soundbar-5-1-01.jpg'],
  },
  // IFP
  {
    slug: 'aztech-ideaflow-bright-55-4k-interactive-display',
    images: ['https://res.cloudinary.com/df52xzi3y/image/upload/v1783680051/aztech-aztech-ideaflow-bright-55-4k-interactive-display-0-AZTECH-Smart-Interacti.jpg'],
  },
  {
    slug: 'aztech-ideaflow-bright-65-4k-interactive-display',
    images: ['https://res.cloudinary.com/df52xzi3y/image/upload/v1783680058/aztech-aztech-ideaflow-bright-65-4k-interactive-display-0-AZTECH-Smart-Interacti.jpg'],
  },
  {
    slug: 'aztech-ideaflow-bright-75-4k-interactive-display',
    images: ['https://res.cloudinary.com/df52xzi3y/image/upload/v1783680061/aztech-aztech-ideaflow-bright-75-4k-interactive-display-0-AZTECH-Smart-Interacti.jpg'],
  },
  {
    slug: 'aztech-ideaflow-bright-86-4k-interactive-display',
    images: ['https://res.cloudinary.com/df52xzi3y/image/upload/v1783680064/aztech-aztech-ideaflow-bright-86-4k-interactive-display-0-AZTECH-Smart-Interacti.jpg'],
  },
  {
    slug: 'aztech-ideaflow-98-4k-interactive-display',
    images: ['https://res.cloudinary.com/df52xzi3y/image/upload/v1783680066/aztech-aztech-ideaflow-98-4k-interactive-display-0-Ideaflow.png'],
  },
  {
    slug: 'aztech-ideaflow-elite-110-4k-interactive-display',
    images: ['https://res.cloudinary.com/df52xzi3y/image/upload/v1783680076/aztech-aztech-ideaflow-elite-110-4k-interactive-display-0-Ideaflow.png'],
  },
];

export async function GET() {
  try {
    await connectDB();
    const db = mongoose.connection.db!;
    const results = [];

    for (const { slug, images } of imageUpdates) {
      const r = await db.collection('products').updateOne(
        { slug },
        { $set: { images } }
      );
      results.push({ slug, matched: r.matchedCount, modified: r.modifiedCount });
    }

    return NextResponse.json({ ok: true, total: imageUpdates.length, results });
  } catch (err: unknown) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

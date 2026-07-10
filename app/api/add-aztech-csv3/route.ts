import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

const BrandSchema   = new mongoose.Schema({ name: String, slug: String }, { timestamps: true });
const ProductSchema = new mongoose.Schema({
  brand: mongoose.Schema.Types.ObjectId,
  brandSlug: String, name: String, slug: String,
  images: [String], description: String,
  shortDescription: String,
  specs: [{ key: String, value: String }],
  category: String, tags: [String], featured: Boolean,
}, { timestamps: true, strict: false });

const Brand   = mongoose.models.Brand   || mongoose.model('Brand',   BrandSchema);
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(MONGODB_URI);
}

const products = [
  // ── Cables & Chargers ──────────────────────────────────────────────────────
  {
    name: 'HyperCable USB-C to USB-C 60W 1m Black',
    slug: 'aztech-hypercable-usb-c-60w-1m-black',
    category: 'Cables & Chargers',
    tags: ['cable', 'usb-c', '60w', 'braided', 'aztech'],
    featured: false,
    images: ['https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Cable-01-76.jpg'],
    description: 'This 1-meter braided USB-C charging cable is designed for efficient charging, with USB-C connectors on both ends. It supports up to 60 watts of power, ensuring fast and reliable charging. Combine it with a compatible USB-C power adapter to conveniently charge your devices from a wall outlet and take full advantage of quick-charging capabilities.',
    shortDescription: [
      'Fast Charging Capabilities',
      'Durable Braided Design',
      'Universal USB-C Compatibility',
      'Safe & Reliable Charging',
      'Lightweight & Portable',
      'Compact 1-Meter Length',
    ].join('\n'),
    specs: [
      { key: 'Color',          value: 'Black' },
      { key: 'Cable Length',   value: '1 Meter' },
      { key: 'Connector Type', value: 'USB Type C' },
      { key: 'Watts',          value: '60W' },
      { key: 'Material',       value: 'Braided' },
    ],
  },
  {
    name: 'GaN HyperCharger 3 Ports 70W',
    slug: 'aztech-gan-hypercharger-3-ports-70w',
    category: 'Cables & Chargers',
    tags: ['charger', 'gan', '70w', 'triple port', 'usb-c', 'usb-a', 'aztech'],
    featured: false,
    images: [
      'https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Gan3-01.jpg',
      'https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Gan3-01-1.jpg',
      'https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Gan3-02.jpg',
    ],
    description: 'The AZTECH GaN HyperCharger Adapter 70W is an ultra-compact and efficient charging solution designed for fast and reliable power delivery to multiple devices. With the innovative GaN (Gallium Nitride) technology, it delivers fast and reliable charging while consuming less energy. This adapter features triple ports: two USB-C and one USB-A, offering flexible charging options for a wide range of devices.',
    shortDescription: [
      'Powerful 70W Output',
      'Triple Charging Ports (2× USB-C + 1× USB-A)',
      'GaN Technology for Efficiency',
      'Less Power Consumption',
      'Light Indicators',
      'Safe & Reliable',
      'Compact & Travel-Friendly',
    ].join('\n'),
    specs: [
      { key: 'Input',              value: 'AC 100~240V, 50/60Hz' },
      { key: 'USB-C1/C2 Output',  value: '5V/3A, 9V/3A, 12V/3A, 15V/3A, 20V/3.5A (70W Max)' },
      { key: 'USB-A Output',       value: '5V/3A, 9V/2A, 12V/1.5A' },
      { key: 'Total Power',        value: '70W Max' },
    ],
  },
  {
    name: 'GaN II HyperCharger Dual Ports 45W',
    slug: 'aztech-gan-ii-hypercharger-dual-ports-45w',
    category: 'Cables & Chargers',
    tags: ['charger', 'gan', '45w', 'dual port', 'quick charge', 'aztech'],
    featured: false,
    images: [
      'https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Gan2-01.jpg',
      'https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Gan2-02.jpg',
    ],
    description: 'The AZTECH GaN II Hypercharger Adapter 45W is an ultra-compact and efficient charging solution designed for fast and reliable power delivery to multiple devices. Featuring advanced GaN (Gallium Nitride) technology, this adapter provides high-power charging experience while maintaining less energy consumption. This adapter features dual port, one USB-C and one USB-A, offering flexible charging options for a wide range of devices.',
    shortDescription: [
      '45W Power Output',
      'Dual Ports (USB-C + USB-A)',
      'GaN Technology',
      'Quick Charge 3.0 Support',
      'Less Power Consumption',
      'Safe and Efficient',
      'Compact and Portable',
    ].join('\n'),
    specs: [
      { key: 'Input',        value: '200-240V, 50/60Hz, 1.5A max' },
      { key: 'USB-C Output', value: 'PDO: 5V3A, 9V3A, 12V3A, 15V3A, 20V2.25A' },
      { key: 'USB-A Output', value: '5V3A, 9V3A, 12V3A, 20V2.25A' },
      { key: 'Total Output', value: '45W Max' },
    ],
  },
  {
    name: 'GaN Car HyperCharger 3 Ports 95W',
    slug: 'aztech-gan-car-hypercharger-3-ports-95w',
    category: 'Cables & Chargers',
    tags: ['car charger', 'gan', '95w', 'triple port', 'aztech'],
    featured: false,
    images: [
      'https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Car-Charger2-02-1.jpg',
      'https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Car-Charger2-01.jpg',
      'https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Car-Charger-03.jpg',
    ],
    description: 'The AZTECH GaN Car Hypercharger 95W is an advanced, high-performance car charger designed to power up your devices quickly and efficiently while on the go. With triple ports (2 USB-C and 1 USB-A), it offers versatile charging options for multiple devices simultaneously. Featuring GaN technology, it delivers a powerful 95W output with less energy consumption.',
    shortDescription: [
      '95W Power Output',
      'Triple Ports (2× USB-C + 1× USB-A)',
      'GaN Technology',
      'Light Indicator',
      'Less Power Consumption',
      'Safe & Efficient',
      'Fast Charging',
    ].join('\n'),
    specs: [
      { key: 'Input',        value: '12V-24V' },
      { key: 'USB-C1 Output', value: '5V⎓3A, 9V⎓3A, 12V⎓3A, 15V⎓3A, 20V⎓3.25A' },
      { key: 'USB-C2 Output', value: '5V⎓3A, 9V⎓3A, 12V⎓2.5A' },
      { key: 'USB-A Output',  value: '5V⎓3A, 9V⎓3A, 12V⎓2.5A' },
      { key: 'Total Output',  value: '95W' },
    ],
  },
  {
    name: 'GaN Car HyperCharger Dual Ports 95W',
    slug: 'aztech-gan-car-hypercharger-dual-ports-95w',
    category: 'Cables & Chargers',
    tags: ['car charger', 'gan', '95w', 'dual port', 'aztech'],
    featured: false,
    images: [
      'https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Car-Charger-01-1.jpg',
      'https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Car-Charger2-02-1.jpg',
    ],
    description: 'The AZTECH GaN Car Hypercharger 95W is an advanced, high-performance car charger designed to power up your devices quickly and efficiently while on the go. With dual ports (1 USB-C and 1 USB-A), it offers versatile charging options for multiple devices simultaneously. Featuring GaN technology, it delivers powerful 95W output with less energy consumption.',
    shortDescription: [
      '95W Power Output',
      'Dual Ports (1× USB-C + 1× USB-A)',
      'GaN Technology',
      'Light Indicator',
      'Less Power Consumption',
      'Safe & Efficient',
      'Fast Charging',
    ].join('\n'),
    specs: [
      { key: 'Input',        value: '12V-24V' },
      { key: 'Total Output', value: '95W' },
    ],
  },
  {
    name: 'HyperCable USB-C to USB-C 240W 1m Black',
    slug: 'aztech-hypercable-usb-c-240w-1m-black',
    category: 'Cables & Chargers',
    tags: ['cable', 'usb-c', '240w', 'braided', 'aztech'],
    featured: false,
    images: ['https://aztechmea.com/wp-content/uploads/2025/12/WhatsApp-Image-2024-12-17-at-12.43.42_ec6db62e.jpg'],
    description: 'This 1-meter braided USB-C charging cable is designed for efficient charging, with USB-C connectors on both ends. It supports up to 240 watts of power, ensuring fast and reliable charging.',
    shortDescription: [
      'Fast Charging Capabilities',
      'Durable Braided Design',
      'Universal USB-C Compatibility',
      'Safe & Reliable Charging',
      'Lightweight & Portable',
      'Compact 1-Meter Length',
    ].join('\n'),
    specs: [
      { key: 'Color',          value: 'Black' },
      { key: 'Cable Length',   value: '1 Meter' },
      { key: 'Connector Type', value: 'USB Type C' },
      { key: 'Watts',          value: '240W' },
      { key: 'Material',       value: 'Braided' },
    ],
  },
  {
    name: 'HyperCable USB-C to USB-C 240W 2m Titanium',
    slug: 'aztech-hypercable-usb-c-240w-2m-titanium',
    category: 'Cables & Chargers',
    tags: ['cable', 'usb-c', '240w', 'braided', 'titanium', 'aztech'],
    featured: false,
    images: ['https://aztechmea.com/wp-content/uploads/2025/12/WhatsApp-Image-2024-12-17-at-12.43.43_6e7a404f.jpg'],
    description: 'This 2-meter braided USB-C charging cable is designed for efficient charging, with USB-C connectors on both ends. It supports up to 240 watts of power, ensuring fast and reliable charging.',
    shortDescription: [
      'Fast Charging Capabilities',
      'Durable Braided Design',
      'Universal USB-C Compatibility',
      'Safe & Reliable Charging',
      'Lightweight & Portable',
      'Compact 2-Meter Length',
    ].join('\n'),
    specs: [
      { key: 'Color',          value: 'Titanium' },
      { key: 'Cable Length',   value: '2 Meter' },
      { key: 'Connector Type', value: 'USB Type C' },
      { key: 'Watts',          value: '240W' },
      { key: 'Material',       value: 'Braided' },
    ],
  },

  // ── Audio ──────────────────────────────────────────────────────────────────
  {
    name: 'SuperSonic Wired Earphone Type-C 1Meter',
    slug: 'aztech-supersonic-wired-earphone-type-c-1m',
    category: 'Audio',
    tags: ['earphone', 'wired', 'type-c', 'hifi', 'aztech'],
    featured: false,
    images: [
      'https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Earphone-Wired-01.jpg',
      'https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Earphone-Wired-01-1.jpg',
      'https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Earphone-Wired-02.jpg',
      'https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Earphone-Wired-03.jpg',
    ],
    description: 'The AZTECH SuperSonic Wired Earphone Type-C (1 meter) delivers rich, HiFi sound with deep bass and clear audio for music, gaming, and movies. Its Type-C plug ensures seamless connectivity with modern devices, while the 1-meter cable offers flexibility and convenience. The easy-to-use design provides a comfortable, secure fit for long listening sessions.',
    shortDescription: [
      'HD Sound Quality',
      'Bass-Enhanced Sound',
      'Type-C Audio Plug',
      'Comfortable Wearing',
      'Universal Compatibility (Type-C)',
      '1 Meter Cable Length',
    ].join('\n'),
    specs: [
      { key: 'Color',                  value: 'White' },
      { key: 'Ear Placement',          value: 'Over ear' },
      { key: 'Cable Length',           value: '1 meter' },
      { key: 'Universal Compatibility', value: 'Type-C' },
    ],
  },
  {
    name: 'AZTECH Waterproof Portable Speaker',
    slug: 'aztech-waterproof-portable-speaker',
    category: 'Audio',
    tags: ['speaker', 'portable', 'bluetooth', 'waterproof', 'ipx7', 'aztech'],
    featured: false,
    images: [
      'https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Speaker-01.jpg',
      'https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Speaker-02.jpg',
    ],
    description: 'The AZTECH Portable Speaker is a powerful, wireless speaker designed for outdoor fun and parties. With 40W of audio power, it delivers loud, immersive sound, enhanced by deep bass and 360° sound thanks to the dual voice coil. Featuring a customizable EQ through the mobile app, IPX-7 water resistance, and Bluetooth 5.3 connectivity.',
    shortDescription: [
      'Deep Bass Sound',
      'Dual Voice Coil — 360° Sound',
      'EQ App Control',
      'Built-in Lights',
      'Bluetooth 5.3',
      'IPX-7 Waterproof',
      'Multiple Connectivity Options',
    ].join('\n'),
    specs: [
      { key: 'Maximum Output Power',   value: '40 Watts' },
      { key: 'Connectivity',           value: 'Bluetooth 5.3, AUX, TF Card' },
      { key: 'Audio Output Mode',      value: 'Stereo Surround Sound' },
      { key: 'Water Resistance',       value: 'IPX-7' },
    ],
  },
  {
    name: 'Wireless Earbuds with LED Digital Display Charging Case',
    slug: 'aztech-wireless-earbuds-led-display-charging-case',
    category: 'Audio',
    tags: ['earbuds', 'wireless', 'tws', 'bluetooth', 'led display', 'aztech'],
    featured: false,
    images: [
      'https://aztechmea.com/wp-content/uploads/2025/12/Product-images_TWS-01.jpg',
      'https://aztechmea.com/wp-content/uploads/2025/12/Product-images_TWS-01-1.jpg',
      'https://aztechmea.com/wp-content/uploads/2025/12/Product-images_TWS-04.jpg',
      'https://aztechmea.com/wp-content/uploads/2025/12/Product-images_TWS-02.jpg',
    ],
    description: 'The AZTECH Wireless Earbuds offer crystal-clear sound quality, making them the perfect companion for music, calls, and gaming. Equipped with two premium built-in microphones, they provide exceptional call clarity, while Bluetooth 5.3 ensures a stable and fast connection for uninterrupted audio. The sleek LED digital display charging case shows the battery status at a glance, with up to 60 hours of total playtime.',
    shortDescription: [
      'Crystal Clear Sound Quality',
      'Built-in 2 Premium Mics',
      'Advanced Bluetooth 5.3',
      'LED Digital Display Charging Case',
      '60 Hours Total Playtime',
      'In-Ear Comfort',
    ].join('\n'),
    specs: [
      { key: 'Color',              value: 'Black' },
      { key: 'Ear Placement',      value: 'In ear' },
      { key: 'Wireless',           value: 'Bluetooth 5.3' },
      { key: 'Playtime Per Charge', value: '5H' },
      { key: 'Playtime with Case', value: '50H' },
    ],
  },

  // ── Power Extensions ───────────────────────────────────────────────────────
  {
    name: 'PowerFlow 3 Way 3m Universal Extension',
    slug: 'aztech-powerflow-3-way-3m-universal-extension',
    category: 'Power Extensions',
    tags: ['extension', 'power', 'surge protection', '3 socket', 'copper', 'aztech'],
    featured: false,
    images: [
      'https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Extenstion-3W-01.jpg',
      'https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Extenstion-3W-01-1.jpg',
      'https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Extenstion-3W-02.jpg',
      'https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Extenstion-3W-03.jpg',
    ],
    description: 'The AZTECH PowerFlow Supreme High-Quality Universal Extension 3 Way 3 Meter is designed to provide reliable and safe power distribution. Built with 100% copper wires, it ensures optimal conductivity. Features three universal sockets, 13A surge protection, built-in light indicators and safety shutters.',
    shortDescription: [
      '3 Universal Sockets',
      '3 Meter Cord Length',
      '100% Copper Wires',
      '13A Surge Protection',
      'Light Indicators',
      'Shielded Safety Shutter',
      '3250 Watts Maximum Power',
    ].join('\n'),
    specs: [
      { key: 'Color',             value: 'White & Teal' },
      { key: 'Voltage',           value: '250 AC' },
      { key: 'Current',           value: '13Amp' },
      { key: 'Total Power',       value: '3250 Watts' },
      { key: 'Cable Length',      value: '3 meters' },
      { key: 'Sockets',          value: '3' },
      { key: 'Hardware Material', value: 'Copper' },
    ],
  },
  {
    name: 'PowerFlow 5 Way 3m Universal Extension',
    slug: 'aztech-powerflow-5-way-3m-universal-extension',
    category: 'Power Extensions',
    tags: ['extension', 'power', 'surge protection', '5 socket', 'copper', 'aztech'],
    featured: false,
    images: [
      'https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Extenstion-5W-01.jpg',
      'https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Extenstion-3W-03-1.jpg',
      'https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Extenstion-5W-04.jpg',
    ],
    description: 'The AZTECH PowerFlow Supreme High-Quality Universal Extension 5 Way 3 Meter is designed to provide reliable and safe power distribution. Built with 100% copper wires and five universal sockets, it features 13A surge protection, light indicators and safety shutters.',
    shortDescription: [
      '5 Universal Sockets',
      '3 Meter Cord Length',
      '100% Copper Wires',
      '13A Surge Protection',
      'Light Indicators',
      'Shielded Safety Shutter',
      '3250 Watts Maximum Power',
    ].join('\n'),
    specs: [
      { key: 'Color',             value: 'White & Teal' },
      { key: 'Voltage',           value: '250 AC' },
      { key: 'Current',           value: '13Amp' },
      { key: 'Total Power',       value: '3250 Watts' },
      { key: 'Cable Length',      value: '3 meters' },
      { key: 'Sockets',          value: '5' },
      { key: 'Hardware Material', value: 'Copper' },
    ],
  },
  {
    name: 'PowerFlow 4 Way 5m Universal Extension',
    slug: 'aztech-powerflow-4-way-5m-universal-extension',
    category: 'Power Extensions',
    tags: ['extension', 'power', 'surge protection', '4 socket', 'copper', 'aztech'],
    featured: false,
    images: [
      'https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Extenstion-4W-01.jpg',
      'https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Extenstion-3W-03-1.jpg',
      'https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Extenstion-4W-04.jpg',
    ],
    description: 'The AZTECH PowerFlow Supreme High-Quality Universal Extension 4 Way 5 Meter is designed to provide reliable and safe power distribution. Built with 100% copper wires and four universal sockets, it features 13A surge protection, light indicators and safety shutters, with an extended 5-meter cord.',
    shortDescription: [
      '4 Universal Sockets',
      '5 Meter Cord Length',
      '100% Copper Wires',
      '13A Surge Protection',
      'Light Indicators',
      'Shielded Safety Shutter',
      '3250 Watts Maximum Power',
    ].join('\n'),
    specs: [
      { key: 'Color',             value: 'White & Teal' },
      { key: 'Voltage',           value: '250 AC' },
      { key: 'Current',           value: '13Amp' },
      { key: 'Total Power',       value: '3250 Watts' },
      { key: 'Cable Length',      value: '5 meters' },
      { key: 'Sockets',          value: '4' },
      { key: 'Hardware Material', value: 'Copper' },
    ],
  },
  {
    name: 'Powerflow 5 Way 5m Universal Extension',
    slug: 'aztech-powerflow-5-way-5m-universal-extension',
    category: 'Power Extensions',
    tags: ['extension', 'power', 'surge protection', '5 socket', 'copper', 'aztech'],
    featured: false,
    images: [
      'https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Extenstion-5W-01-1.jpg',
      'https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Extenstion-3W-03-1.jpg',
      'https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Extenstion-5W-04.jpg',
    ],
    description: 'The AZTECH PowerFlow Supreme High-Quality Universal Extension 5 Way 5 Meter is designed to provide reliable and safe power distribution. Built with 100% copper wires and five universal sockets, it features 13A surge protection, light indicators and safety shutters, with an extended 5-meter cord.',
    shortDescription: [
      '5 Universal Sockets',
      '5 Meter Cord Length',
      '100% Copper Wires',
      '13A Surge Protection',
      'Light Indicators',
      'Shielded Safety Shutter',
      '3250 Watts Maximum Power',
    ].join('\n'),
    specs: [
      { key: 'Color',             value: 'White & Teal' },
      { key: 'Voltage',           value: '250 AC' },
      { key: 'Current',           value: '13Amp' },
      { key: 'Total Power',       value: '3250 Watts' },
      { key: 'Cable Length',      value: '5 meters' },
      { key: 'Sockets',          value: '5' },
      { key: 'Hardware Material', value: 'Copper' },
    ],
  },

  // ── Gaming Peripherals ─────────────────────────────────────────────────────
  {
    name: 'Wireless Gaming Headset with LED',
    slug: 'aztech-wireless-gaming-headset-with-led',
    category: 'Gaming Peripherals',
    tags: ['headset', 'wireless', 'gaming', 'led', 'anc', 'bluetooth', 'aztech'],
    featured: false,
    images: [
      'https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Headphone-01.jpg',
      'https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Headphone-01-1.jpg',
      'https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Headphone-02.jpg',
      'https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Headphone-03.jpg',
      'https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Headphone-04.jpg',
    ],
    description: 'The AZTECH Wireless Gaming Headset is designed to elevate your gaming and audio experience with cutting-edge features. Featuring 20dB active noise cancellation, an impressive 50-hour battery life, dual device connection, 40mm immersive stereo sound, and an LED display that shows your battery and connection status at a glance.',
    shortDescription: [
      '20dB Active Noise Cancellation',
      '50-Hour Battery Life',
      'Dual Device Connection',
      '40mm Immersive Stereo Sound',
      'LED Display',
      'Bluetooth 5.0',
    ].join('\n'),
    specs: [
      { key: 'Color',                value: 'Black' },
      { key: 'Ear Placement',        value: 'Over ear' },
      { key: 'Wireless',             value: 'Bluetooth 5.0' },
      { key: 'Bluetooth Range',      value: '≥10m' },
      { key: 'Battery Capacity',     value: '350mAh' },
      { key: 'Play Time',            value: 'Up to 10 hours (60% volume)' },
    ],
  },
  {
    name: 'Wired Gaming Headset with Microphone',
    slug: 'aztech-wired-gaming-headset-with-microphone',
    category: 'Gaming Peripherals',
    tags: ['headset', 'wired', 'gaming', 'microphone', '7.1 surround', 'aztech'],
    featured: false,
    images: [
      'https://aztechmea.com/wp-content/uploads/2025/12/headset-side-view.jpg',
      'https://aztechmea.com/wp-content/uploads/2025/12/headset-front-side.jpg',
      'https://aztechmea.com/wp-content/uploads/2025/12/headset-full-side-view.jpg',
    ],
    description: 'AZTECH Gaming Headset featuring a built-in noise-canceling microphone, ideal for gaming and everyday use. With 53mm drivers and neodymium magnets for rich, high-quality sound with enhanced bass. Equipped with a USB Audio Sound Card for immersive virtual 7.1 surround sound, and compatible with PCs and gaming consoles.',
    shortDescription: [
      '53mm Immersive Stereo Sound',
      'Built-in Noise-Canceling Microphone',
      'Virtual 7.1 Surround Sound',
      'USB + 3.5mm Dual Connectivity',
      'Wide Frequency Range (15Hz–25,000Hz)',
      'Thick Cushion for Noise Isolation',
    ].join('\n'),
    specs: [
      { key: 'Color',         value: 'Black, Red' },
      { key: 'Ear Placement', value: 'Over ear' },
      { key: 'Driver',        value: '53mm Neodymium' },
      { key: 'Connectivity',  value: 'USB + 3.5mm' },
      { key: 'Surround',      value: 'Virtual 7.1' },
    ],
  },
  {
    name: 'Gaming Mouse Infrared-Micro-Switch Laser',
    slug: 'aztech-gaming-mouse-infrared-micro-switch-laser',
    category: 'Gaming Peripherals',
    tags: ['mouse', 'gaming', 'laser', 'infrared', 'high dpi', 'aztech'],
    featured: false,
    images: [
      'https://aztechmea.com/wp-content/uploads/2025/12/mouse-top-view.jpg',
      'https://aztechmea.com/wp-content/uploads/2025/12/mouse-front-view-1.jpg',
      'https://aztechmea.com/wp-content/uploads/2025/12/mouse-bottom-view.jpg',
    ],
    description: 'AZTECH Gaming Mouse with Infrared-Micro-Switch Laser technology is a high-performance device designed for gamers who demand speed, precision, and durability. Features the AVAGO A9800 Gaming Laser Engine, 0.2ms response time, up to 82,000 CPI, and Metal X\' Glide Armor Boot for over 300 kilometers of use.',
    shortDescription: [
      'Infrared-Micro-Switch (20M+ clicks)',
      '0.2ms Response Time',
      '82,000 CPI Adjustable',
      'AVAGO A9800 Laser Engine',
      'Metal X\' Glide Armor Boot',
      'Braided Cable',
      'Windows / macOS / Linux',
    ].join('\n'),
    specs: [
      { key: 'Type',          value: 'Laser Gaming Mouse' },
      { key: 'Response Time', value: '0.2ms (Zero Bouncing)' },
      { key: 'Resolution',    value: '100-82,000 CPI, 5-Level Adjustable' },
      { key: 'Sensor',        value: 'AVAGO A9800 Gaming Laser Engine' },
      { key: 'Switches',      value: 'Infrared-Micro-Switch (Over 20 million clicks)' },
      { key: 'Compatibility', value: 'Windows, macOS, and Linux' },
    ],
  },
  {
    name: 'Gaming Mouse Pad Black',
    slug: 'aztech-gaming-mouse-pad-black',
    category: 'Gaming Peripherals',
    tags: ['mouse pad', 'gaming', 'anti-slip', 'stitched edges', 'aztech'],
    featured: false,
    images: [
      'https://aztechmea.com/wp-content/uploads/2025/12/mouse-pad-front-view.jpg',
      'https://aztechmea.com/wp-content/uploads/2025/12/mouse-pad-front-ful-view.jpg',
      'https://aztechmea.com/wp-content/uploads/2025/12/mouse-pad-side-view.jpg',
    ],
    description: 'AZTECH Mouse pad provides a unique blend of speed and control making it ideal for any situation. Features stitched edges which prevent fraying while greatly increasing aesthetic and lifespan. High-quality construction makes these mousepads machine washable.',
    shortDescription: [
      'Perfect Micro-Woven Cloth',
      'Never-Slip Base',
      'Pinpoint Mouse Accuracy',
      'Stitched Edges for Durability',
      'Machine Washable',
    ].join('\n'),
    specs: [
      { key: 'Color',           value: 'Black' },
      { key: 'Material',        value: 'Rubber' },
      { key: 'Special Feature', value: 'Anti-slip' },
    ],
  },
  {
    name: 'Mechanical Gaming Keyboard RGB',
    slug: 'aztech-mechanical-gaming-keyboard-rgb',
    category: 'Gaming Peripherals',
    tags: ['keyboard', 'mechanical', 'rgb', 'gaming', 'anti-ghosting', 'aztech'],
    featured: false,
    images: [
      'https://aztechmea.com/wp-content/uploads/2025/12/rcb-keyboard-view.jpg',
      'https://aztechmea.com/wp-content/uploads/2025/12/rcb-keyboard-front-view.jpg',
      'https://aztechmea.com/wp-content/uploads/2025/12/rcb-keyboard-side-view.jpg',
    ],
    description: 'Upgrade your game with the AZTECH Mechanical Gaming Keyboard RGB. Featuring customizable RGB lighting, responsive mechanical key switches, anti-ghosting technology, and up to 50 million key clicks of durability.',
    shortDescription: [
      'Stunning RGB Lighting',
      'Responsive Mechanical Keys',
      'Anti-Ghosting 87 Keys',
      'Ergonomically Designed',
      '50 Million Clicks Key Durability',
    ].join('\n'),
    specs: [
      { key: 'Color',           value: 'Black' },
      { key: 'USB Type',        value: 'USB Type A (corded)' },
      { key: 'N-Key Rollover',  value: 'Anti-ghosting 87 keys' },
      { key: 'Key Durability',  value: 'Up to 50 million clicks' },
      { key: 'OS',              value: 'Windows 10' },
    ],
  },
  {
    name: 'Extra Large LED Gaming Mouse Pad',
    slug: 'aztech-extra-large-led-gaming-mouse-pad',
    category: 'Gaming Peripherals',
    tags: ['mouse pad', 'gaming', 'led', 'rgb', 'xl', 'aztech'],
    featured: false,
    images: ['https://aztechmea.com/wp-content/uploads/2025/12/mouse-pad-side-view-1.jpg'],
    description: 'AZTECH Extra Large LED Gaming Mouse Pad, designed for gamers and professionals alike. Made from natural rubber material with a firm, non-slip surface. Water-resistant design and RGB LED lighting adds a vibrant, customizable glow to your desk.',
    shortDescription: [
      'Extra Large Surface (35.4" × 15.7")',
      'Natural Rubber — Anti-Slip',
      'Water-Resistant & Smooth',
      'RGB LED Lighting',
      'USB Powered',
      '1.5m Cable Length',
    ].join('\n'),
    specs: [
      { key: 'Material',     value: 'Smooth Fabric Surface' },
      { key: 'Size',         value: '35.4" x 15.7"' },
      { key: 'LED Lighting', value: 'RGB LED Lights' },
      { key: 'Connectivity', value: 'USB Powered' },
      { key: 'Cable Length', value: '1.5 meters' },
    ],
  },

  // ── Air Coolers ────────────────────────────────────────────────────────────
  {
    name: 'AZTECH 360mm Black Liquid Cooler',
    slug: 'aztech-360mm-black-liquid-cooler',
    category: 'Air Coolers',
    tags: ['liquid cooler', 'aio', '360mm', 'black', 'argb', 'intel', 'amd', 'aztech'],
    featured: false,
    images: [
      'https://aztechmea.com/wp-content/uploads/2026/02/360black2.webp',
      'https://aztechmea.com/wp-content/uploads/2026/02/360black1-scaled.webp',
      'https://aztechmea.com/wp-content/uploads/2026/02/360black-3.webp',
    ],
    description: 'The Aztech RGB 360mm Liquid Cooler is built for users who demand powerful cooling and clean aesthetics. Designed to keep temperatures under control during intense gaming or heavy workloads, it delivers stable performance with quiet operation. The sleek black finish blends perfectly into modern setups, while vibrant ARGB lighting adds a dynamic visual touch.',
    shortDescription: [
      'Powerful 360mm Liquid Cooling',
      'Handles High-Performance CPUs',
      'Three High-Speed Cooling Fans',
      'Quiet & Smooth Operation',
      'Bright Customizable ARGB Lighting',
      'Compatible with Intel and AMD',
    ].join('\n'),
    specs: [
      { key: 'TDP',           value: '280W' },
      { key: 'Product Size',  value: '393 × 120 × 27 mm' },
      { key: 'Materials',     value: 'Copper + Aluminum' },
      { key: 'Fan Quantity',  value: '3 Pcs' },
      { key: 'Fan Speed',     value: '800–1800RPM ±10%' },
      { key: 'Pump Speed',    value: '2700RPM ±10%' },
      { key: 'Intel Support', value: 'LGA1700 / 1200 / 1150 / 1151 / 1155 / 1156 / 1366' },
      { key: 'AMD Support',   value: 'AM5 / AM4 / AM3 / AM2 / FM2 / FM1' },
    ],
  },
  {
    name: 'AZTECH 360mm White Liquid Cooler',
    slug: 'aztech-360mm-white-liquid-cooler',
    category: 'Air Coolers',
    tags: ['liquid cooler', 'aio', '360mm', 'white', 'argb', 'intel', 'amd', 'aztech'],
    featured: false,
    images: ['https://aztechmea.com/wp-content/uploads/2026/02/360white-2.webp'],
    description: 'The Aztech RGB 360mm White Liquid Cooler is built for users who demand powerful cooling and clean aesthetics. Delivering stable performance with quiet operation, vibrant ARGB lighting, and broad compatibility across major Intel and AMD platforms.',
    shortDescription: [
      'Powerful 360mm Liquid Cooling',
      'Handles High-Performance CPUs',
      'Three High-Speed Cooling Fans',
      'Quiet & Smooth Operation',
      'Bright Customizable ARGB Lighting',
      'Compatible with Intel and AMD',
    ].join('\n'),
    specs: [
      { key: 'TDP',           value: '280W' },
      { key: 'Product Size',  value: '393 × 120 × 27 mm' },
      { key: 'Materials',     value: 'Copper + Aluminum' },
      { key: 'Fan Quantity',  value: '3 Pcs' },
      { key: 'Fan Speed',     value: '800–1800RPM ±10%' },
      { key: 'Pump Speed',    value: '2700RPM ±10%' },
      { key: 'Intel Support', value: 'LGA1700 / 1200 / 1150 / 1151 / 1155 / 1156 / 1366' },
      { key: 'AMD Support',   value: 'AM5 / AM4 / AM3 / AM2 / FM2 / FM1' },
    ],
  },
  {
    name: 'AZTECH 240mm White Liquid Cooler',
    slug: 'aztech-240mm-white-liquid-cooler',
    category: 'Air Coolers',
    tags: ['liquid cooler', 'aio', '240mm', 'white', 'argb', 'intel', 'amd', 'aztech'],
    featured: false,
    images: [
      'https://aztechmea.com/wp-content/uploads/2026/02/240white-3.webp',
      'https://aztechmea.com/wp-content/uploads/2026/02/240white-2.webp',
      'https://aztechmea.com/wp-content/uploads/2026/02/240white1-scaled.webp',
    ],
    description: 'The Aztech RGB 240mm White Liquid Cooler is built for users who demand powerful cooling and clean aesthetics. Designed to keep temperatures under control during intense gaming or heavy workloads, it delivers stable performance with quiet operation.',
    shortDescription: [
      'Powerful 240mm Liquid Cooling',
      'Handles High-Performance CPUs',
      'Two High-Speed Cooling Fans',
      'Quiet & Smooth Operation',
      'Bright Customizable ARGB Lighting',
      'Compatible with Intel and AMD',
    ].join('\n'),
    specs: [
      { key: 'TDP',           value: '280W' },
      { key: 'Materials',     value: 'Copper + Aluminum' },
      { key: 'Fan Quantity',  value: '2 Pcs' },
      { key: 'Fan Speed',     value: '800–1800RPM ±10%' },
      { key: 'Pump Speed',    value: '2700RPM ±10%' },
      { key: 'Intel Support', value: 'LGA1700 / 1200 / 1150 / 1151 / 1155 / 1156 / 1366' },
      { key: 'AMD Support',   value: 'AM5 / AM4 / AM3 / AM2 / FM2 / FM1' },
    ],
  },
  {
    name: 'AZTECH 240mm Black Liquid Cooler',
    slug: 'aztech-240mm-black-liquid-cooler',
    category: 'Air Coolers',
    tags: ['liquid cooler', 'aio', '240mm', 'black', 'argb', 'intel', 'amd', 'aztech'],
    featured: false,
    images: [
      'https://aztechmea.com/wp-content/uploads/2026/02/240black-3.webp',
      'https://aztechmea.com/wp-content/uploads/2026/02/240（black1）-scaled.webp',
      'https://aztechmea.com/wp-content/uploads/2026/02/240black-2.webp',
    ],
    description: 'The Aztech RGB 240mm Black Liquid Cooler is built for users who demand powerful cooling and clean aesthetics. Designed to keep temperatures under control during intense gaming or heavy workloads, it delivers stable performance with quiet operation.',
    shortDescription: [
      'Powerful 240mm Liquid Cooling',
      'Handles High-Performance CPUs',
      'Two High-Speed Cooling Fans',
      'Quiet & Smooth Operation',
      'Bright Customizable ARGB Lighting',
      'Compatible with Intel and AMD',
    ].join('\n'),
    specs: [
      { key: 'TDP',           value: '280W' },
      { key: 'Materials',     value: 'Copper + Aluminum' },
      { key: 'Fan Quantity',  value: '2 Pcs' },
      { key: 'Fan Speed',     value: '800–1800RPM ±10%' },
      { key: 'Pump Speed',    value: '2700RPM ±10%' },
      { key: 'Intel Support', value: 'LGA1700 / 1200 / 1150 / 1151 / 1155 / 1156 / 1366' },
      { key: 'AMD Support',   value: 'AM5 / AM4 / AM3 / AM2 / FM2 / FM1' },
    ],
  },
];

export async function GET() {
  try {
    await connectDB();

    const brand = await Brand.findOne({ slug: 'aztech' });
    if (!brand) return NextResponse.json({ error: 'aztech brand not found' }, { status: 404 });

    // Ensure Gaming Peripherals category exists
    const db = mongoose.connection.db!;
    const existingCat = await db.collection('categories').findOne({ name: 'Gaming Peripherals' });
    if (!existingCat) {
      await db.collection('categories').insertOne({
        name: 'Gaming Peripherals',
        slug: 'gaming-peripherals',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    const results = [];
    for (const p of products) {
      const doc = { ...p, brand: brand._id, brandSlug: 'aztech' };
      const result = await Product.findOneAndUpdate(
        { slug: p.slug },
        { $set: doc, $unset: { sku: '' } },
        { upsert: true, returnDocument: 'after' }
      );
      results.push({ slug: result.slug, name: result.name, category: result.category });
    }

    return NextResponse.json({ ok: true, inserted: results.length, products: results });
  } catch (err: unknown) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

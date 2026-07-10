import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({ name: String, slug: String, shortDescription: String }, { strict: false });
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

const updates = [
  {
    slug: 'aztech-hypercable-usb-c-60w-1m-black',
    shortDescription: [
      'Fast Charging Capabilities',
      'Durable Braided Design',
      'Universal USB-C Compatibility',
      'Safe & Reliable Charging',
      'Lightweight & Portable',
      'Compact 1-Meter Length',
    ].join('\n'),
  },
  {
    slug: 'aztech-gan-hypercharger-3-ports-70w',
    shortDescription: [
      'Powerful 70W Output',
      'Triple Charging Ports (2× USB-C + 1× USB-A)',
      'GaN Technology for Efficiency',
      'Less Power Consumption',
      'Light Indicators',
      'Safe & Reliable',
      'Compact & Travel-Friendly',
    ].join('\n'),
  },
  {
    slug: 'aztech-gan-ii-hypercharger-dual-ports-45w',
    shortDescription: [
      '45W Power Output',
      'Dual Ports (USB-C + USB-A)',
      'GaN Technology',
      'Quick Charge 3.0 Support',
      'Less Power Consumption',
      'Safe and Efficient',
      'Compact and Portable',
    ].join('\n'),
  },
  {
    slug: 'aztech-gan-car-hypercharger-3-ports-95w',
    shortDescription: [
      '95W Power Output',
      'Triple Ports (2× USB-C + 1× USB-A)',
      'GaN Technology',
      'Light Indicator',
      'Less Power Consumption',
      'Safe & Efficient',
      'Fast Charging',
    ].join('\n'),
  },
  {
    slug: 'aztech-gan-car-hypercharger-dual-ports-95w',
    shortDescription: [
      '95W Power Output',
      'Dual Ports (1× USB-C + 1× USB-A)',
      'GaN Technology',
      'Light Indicator',
      'Less Power Consumption',
      'Safe & Efficient',
      'Fast Charging',
    ].join('\n'),
  },
  {
    slug: 'aztech-hypercable-usb-c-240w-1m-black',
    shortDescription: [
      'Fast Charging Capabilities',
      'Durable Braided Design',
      'Universal USB-C Compatibility',
      'Safe & Reliable Charging',
      'Lightweight & Portable',
      'Compact 1-Meter Length',
    ].join('\n'),
  },
  {
    slug: 'aztech-hypercable-usb-c-240w-2m-titanium',
    shortDescription: [
      'Fast Charging Capabilities',
      'Durable Braided Design',
      'Universal USB-C Compatibility',
      'Safe & Reliable Charging',
      'Lightweight & Portable',
      'Compact 2-Meter Length',
    ].join('\n'),
  },
  {
    slug: 'aztech-supersonic-wired-earphone-type-c-1m',
    shortDescription: [
      'HD Sound Quality',
      'Bass-Enhanced Sound',
      'Type-C Audio Plug',
      'Comfortable Wearing',
      'Universal Compatibility (Type-C)',
      '1 Meter Cable Length',
    ].join('\n'),
  },
  {
    slug: 'aztech-waterproof-portable-speaker',
    shortDescription: [
      'Deep Bass Sound',
      'Dual Voice Coil — 360° Sound',
      'EQ App Control',
      'Built-in Lights',
      'Bluetooth 5.3',
      'IPX-7 Waterproof',
      'Multiple Connectivity Options',
    ].join('\n'),
  },
  {
    slug: 'aztech-wireless-earbuds-led-display-charging-case',
    shortDescription: [
      'Crystal Clear Sound Quality',
      'Built-in 2 Premium Mics',
      'Advanced Bluetooth 5.3',
      'LED Digital Display Charging Case',
      '60 Hours Total Playtime',
      'In-Ear Comfort',
    ].join('\n'),
  },
  {
    slug: 'aztech-powerflow-3-way-3m-universal-extension',
    shortDescription: [
      '3 Universal Sockets',
      '3 Meter Cord Length',
      '100% Copper Wires',
      '13A Surge Protection',
      'Light Indicators',
      'Shielded Safety Shutter',
      '3250 Watts Maximum Power',
    ].join('\n'),
  },
  {
    slug: 'aztech-powerflow-5-way-3m-universal-extension',
    shortDescription: [
      '5 Universal Sockets',
      '3 Meter Cord Length',
      '100% Copper Wires',
      '13A Surge Protection',
      'Light Indicators',
      'Shielded Safety Shutter',
      '3250 Watts Maximum Power',
    ].join('\n'),
  },
  {
    slug: 'aztech-powerflow-4-way-5m-universal-extension',
    shortDescription: [
      '4 Universal Sockets',
      '5 Meter Cord Length',
      '100% Copper Wires',
      '13A Surge Protection',
      'Light Indicators',
      'Shielded Safety Shutter',
      '3250 Watts Maximum Power',
    ].join('\n'),
  },
  {
    slug: 'aztech-powerflow-5-way-5m-universal-extension',
    shortDescription: [
      '5 Universal Sockets',
      '5 Meter Cord Length',
      '100% Copper Wires',
      '13A Surge Protection',
      'Light Indicators',
      'Shielded Safety Shutter',
      '3250 Watts Maximum Power',
    ].join('\n'),
  },
  {
    slug: 'aztech-wireless-gaming-headset-with-led',
    shortDescription: [
      '20dB Active Noise Cancellation',
      '50-Hour Battery Life',
      'Dual Device Connection',
      '40mm Immersive Stereo Sound',
      'LED Display',
      'Bluetooth 5.0',
    ].join('\n'),
  },
  {
    slug: 'aztech-wired-gaming-headset-with-microphone',
    shortDescription: [
      '53mm Immersive Stereo Sound',
      'Built-in Noise-Canceling Microphone',
      'Virtual 7.1 Surround Sound',
      'USB + 3.5mm Dual Connectivity',
      'Wide Frequency Range (15Hz–25,000Hz)',
      'Thick Cushion for Noise Isolation',
    ].join('\n'),
  },
  {
    slug: 'aztech-gaming-mouse-infrared-micro-switch-laser',
    shortDescription: [
      'Infrared-Micro-Switch (20M+ clicks)',
      '0.2ms Response Time',
      '82,000 CPI Adjustable',
      'AVAGO A9800 Laser Engine',
      "Metal X' Glide Armor Boot",
      'Braided Cable',
      'Windows / macOS / Linux',
    ].join('\n'),
  },
  {
    slug: 'aztech-gaming-mouse-pad-black',
    shortDescription: [
      'Perfect Micro-Woven Cloth',
      'Never-Slip Base',
      'Pinpoint Mouse Accuracy',
      'Stitched Edges for Durability',
      'Machine Washable',
    ].join('\n'),
  },
  {
    slug: 'aztech-mechanical-gaming-keyboard-rgb',
    shortDescription: [
      'Stunning RGB Lighting',
      'Responsive Mechanical Keys',
      'Anti-Ghosting 87 Keys',
      'Ergonomically Designed',
      '50 Million Clicks Key Durability',
    ].join('\n'),
  },
  {
    slug: 'aztech-extra-large-led-gaming-mouse-pad',
    shortDescription: [
      'Extra Large Surface (35.4" × 15.7")',
      'Natural Rubber — Anti-Slip',
      'Water-Resistant & Smooth',
      'RGB LED Lighting',
      'USB Powered',
    ].join('\n'),
  },
  {
    slug: 'aztech-360mm-black-liquid-cooler',
    shortDescription: [
      'Powerful 360mm Liquid Cooling',
      'Handles High-Performance CPUs',
      'Three High-Speed Cooling Fans',
      'Quiet & Smooth Operation',
      'Bright Customizable ARGB Lighting',
      'Compatible with Intel and AMD',
    ].join('\n'),
  },
  {
    slug: 'aztech-360mm-white-liquid-cooler',
    shortDescription: [
      'Powerful 360mm Liquid Cooling',
      'Handles High-Performance CPUs',
      'Three High-Speed Cooling Fans',
      'Quiet & Smooth Operation',
      'Bright Customizable ARGB Lighting',
      'Compatible with Intel and AMD',
    ].join('\n'),
  },
  {
    slug: 'aztech-240mm-white-liquid-cooler',
    shortDescription: [
      'Powerful 240mm Liquid Cooling',
      'Handles High-Performance CPUs',
      'Two High-Speed Cooling Fans',
      'Quiet & Smooth Operation',
      'Bright Customizable ARGB Lighting',
      'Compatible with Intel and AMD',
    ].join('\n'),
  },
  {
    slug: 'aztech-240mm-black-liquid-cooler',
    shortDescription: [
      'Powerful 240mm Liquid Cooling',
      'Handles High-Performance CPUs',
      'Two High-Speed Cooling Fans',
      'Quiet & Smooth Operation',
      'Bright Customizable ARGB Lighting',
      'Compatible with Intel and AMD',
    ].join('\n'),
  },
];

await mongoose.connect(process.env.MONGODB_URI);

for (const u of updates) {
  const r = await Product.updateOne({ slug: u.slug }, { $set: { shortDescription: u.shortDescription } });
  console.log(u.slug, '— matched:', r.matchedCount, 'modified:', r.modifiedCount);
}

await mongoose.disconnect();
console.log('\nDone.');

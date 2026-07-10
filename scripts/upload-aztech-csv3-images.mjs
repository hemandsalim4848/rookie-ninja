import { v2 as cloudinary } from 'cloudinary';
import mongoose from 'mongoose';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const ProductSchema = new mongoose.Schema({ name: String, slug: String, images: [String] }, { strict: false });
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

const slugs = [
  'aztech-hypercable-usb-c-60w-1m-black',
  'aztech-gan-hypercharger-3-ports-70w',
  'aztech-gan-ii-hypercharger-dual-ports-45w',
  'aztech-gan-car-hypercharger-3-ports-95w',
  'aztech-gan-car-hypercharger-dual-ports-95w',
  'aztech-hypercable-usb-c-240w-1m-black',
  'aztech-hypercable-usb-c-240w-2m-titanium',
  'aztech-supersonic-wired-earphone-type-c-1m',
  'aztech-waterproof-portable-speaker',
  'aztech-wireless-earbuds-led-display-charging-case',
  'aztech-powerflow-3-way-3m-universal-extension',
  'aztech-powerflow-5-way-3m-universal-extension',
  'aztech-powerflow-4-way-5m-universal-extension',
  'aztech-powerflow-5-way-5m-universal-extension',
  'aztech-wireless-gaming-headset-with-led',
  'aztech-wired-gaming-headset-with-microphone',
  'aztech-gaming-mouse-infrared-micro-switch-laser',
  'aztech-gaming-mouse-pad-black',
  'aztech-mechanical-gaming-keyboard-rgb',
  'aztech-extra-large-led-gaming-mouse-pad',
  'aztech-360mm-black-liquid-cooler',
  'aztech-360mm-white-liquid-cooler',
  'aztech-240mm-white-liquid-cooler',
  'aztech-240mm-black-liquid-cooler',
];

async function uploadIfNeeded(url, publicId) {
  if (url.includes('cloudinary.com')) return url;
  try {
    const result = await cloudinary.uploader.upload(url, {
      public_id: publicId,
      overwrite: false,
      resource_type: 'image',
    });
    console.log('  uploaded:', result.secure_url);
    return result.secure_url;
  } catch (err) {
    console.warn('  upload failed for', url, err.message);
    return url;
  }
}

await mongoose.connect(process.env.MONGODB_URI);

for (const slug of slugs) {
  const product = await Product.findOne({ slug });
  if (!product) { console.log('not found:', slug); continue; }

  console.log('\n' + product.name);
  const newImages = [];
  for (let i = 0; i < product.images.length; i++) {
    const url = product.images[i];
    const filename = url.split('/').pop().replace(/\.[^.]+$/, '').replace(/[^a-z0-9_-]/gi, '-');
    const publicId = `aztech-${slug}-${i}-${filename}`.substring(0, 80);
    const newUrl = await uploadIfNeeded(url, publicId);
    newImages.push(newUrl);
  }

  await Product.updateOne({ slug }, { $set: { images: newImages } });
  console.log('  saved', newImages.length, 'images');
}

await mongoose.disconnect();
console.log('\nDone.');

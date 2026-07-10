import { v2 as cloudinary } from 'cloudinary';
import mongoose from 'mongoose';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const ProductSchema = new mongoose.Schema({ name: String, slug: String, images: [String] }, { strict: false });
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

const slugsToUpdate = [
  'aztech-ideaflow-bright-55-4k-interactive-display',
  'aztech-ideaflow-bright-65-4k-interactive-display',
  'aztech-ideaflow-bright-75-4k-interactive-display',
  'aztech-ideaflow-bright-86-4k-interactive-display',
  'aztech-ideaflow-98-4k-interactive-display',
  'aztech-ideaflow-elite-110-4k-interactive-display',
  'aztech-201-soundbar-with-wired-subwoofer',
  'aztech-501-soundbar-with-wired-subwoofer',
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

for (const slug of slugsToUpdate) {
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

import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({ name: String, slug: String, images: [String] }, { strict: false });
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

const imageMap = {
  'aztech-hypercable-usb-c-60w-1m-black': ['https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Cable-01-76.jpg'],
  'aztech-gan-hypercharger-3-ports-70w': ['https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Gan3-01.jpg','https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Gan3-01-1.jpg','https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Gan3-02.jpg'],
  'aztech-gan-ii-hypercharger-dual-ports-45w': ['https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Gan2-01.jpg','https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Gan2-02.jpg'],
  'aztech-gan-car-hypercharger-3-ports-95w': ['https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Car-Charger2-02-1.jpg','https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Car-Charger2-01.jpg','https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Car-Charger-03.jpg'],
  'aztech-gan-car-hypercharger-dual-ports-95w': ['https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Car-Charger-01-1.jpg','https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Car-Charger2-02-1.jpg'],
  'aztech-hypercable-usb-c-240w-1m-black': ['https://aztechmea.com/wp-content/uploads/2025/12/WhatsApp-Image-2024-12-17-at-12.43.42_ec6db62e.jpg'],
  'aztech-hypercable-usb-c-240w-2m-titanium': ['https://aztechmea.com/wp-content/uploads/2025/12/WhatsApp-Image-2024-12-17-at-12.43.43_6e7a404f.jpg'],
  'aztech-supersonic-wired-earphone-type-c-1m': ['https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Earphone-Wired-01.jpg','https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Earphone-Wired-01-1.jpg','https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Earphone-Wired-02.jpg','https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Earphone-Wired-03.jpg'],
  'aztech-waterproof-portable-speaker': ['https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Speaker-01.jpg','https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Speaker-02.jpg'],
  'aztech-wireless-earbuds-led-display-charging-case': ['https://aztechmea.com/wp-content/uploads/2025/12/Product-images_TWS-01.jpg','https://aztechmea.com/wp-content/uploads/2025/12/Product-images_TWS-01-1.jpg','https://aztechmea.com/wp-content/uploads/2025/12/Product-images_TWS-04.jpg','https://aztechmea.com/wp-content/uploads/2025/12/Product-images_TWS-02.jpg'],
  'aztech-powerflow-3-way-3m-universal-extension': ['https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Extenstion-3W-01.jpg','https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Extenstion-3W-01-1.jpg','https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Extenstion-3W-02.jpg','https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Extenstion-3W-03.jpg'],
  'aztech-powerflow-5-way-3m-universal-extension': ['https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Extenstion-5W-01.jpg','https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Extenstion-3W-03-1.jpg','https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Extenstion-5W-04.jpg'],
  'aztech-powerflow-4-way-5m-universal-extension': ['https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Extenstion-4W-01.jpg','https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Extenstion-3W-03-1.jpg','https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Extenstion-4W-04.jpg'],
  'aztech-powerflow-5-way-5m-universal-extension': ['https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Extenstion-5W-01-1.jpg','https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Extenstion-3W-03-1.jpg','https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Extenstion-5W-04.jpg'],
  'aztech-wireless-gaming-headset-with-led': ['https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Headphone-01.jpg','https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Headphone-01-1.jpg','https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Headphone-02.jpg','https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Headphone-03.jpg','https://aztechmea.com/wp-content/uploads/2025/12/Product-images_Headphone-04.jpg'],
  'aztech-wired-gaming-headset-with-microphone': ['https://aztechmea.com/wp-content/uploads/2025/12/headset-side-view.jpg','https://aztechmea.com/wp-content/uploads/2025/12/headset-front-side.jpg','https://aztechmea.com/wp-content/uploads/2025/12/headset-full-side-view.jpg'],
  'aztech-gaming-mouse-infrared-micro-switch-laser': ['https://aztechmea.com/wp-content/uploads/2025/12/mouse-top-view.jpg','https://aztechmea.com/wp-content/uploads/2025/12/mouse-front-view-1.jpg','https://aztechmea.com/wp-content/uploads/2025/12/mouse-bottom-view.jpg'],
  'aztech-gaming-mouse-pad-black': ['https://aztechmea.com/wp-content/uploads/2025/12/mouse-pad-front-view.jpg','https://aztechmea.com/wp-content/uploads/2025/12/mouse-pad-front-ful-view.jpg','https://aztechmea.com/wp-content/uploads/2025/12/mouse-pad-side-view.jpg'],
  'aztech-mechanical-gaming-keyboard-rgb': ['https://aztechmea.com/wp-content/uploads/2025/12/rcb-keyboard-view.jpg','https://aztechmea.com/wp-content/uploads/2025/12/rcb-keyboard-front-view.jpg','https://aztechmea.com/wp-content/uploads/2025/12/rcb-keyboard-side-view.jpg'],
  'aztech-extra-large-led-gaming-mouse-pad': ['https://aztechmea.com/wp-content/uploads/2025/12/mouse-pad-side-view-1.jpg'],
  'aztech-360mm-black-liquid-cooler': ['https://aztechmea.com/wp-content/uploads/2026/02/360black2.webp','https://aztechmea.com/wp-content/uploads/2026/02/360black1-scaled.webp','https://aztechmea.com/wp-content/uploads/2026/02/360black-3.webp'],
  'aztech-360mm-white-liquid-cooler': ['https://aztechmea.com/wp-content/uploads/2026/02/360white-2.webp'],
  'aztech-240mm-white-liquid-cooler': ['https://aztechmea.com/wp-content/uploads/2026/02/240white-3.webp','https://aztechmea.com/wp-content/uploads/2026/02/240white-2.webp','https://aztechmea.com/wp-content/uploads/2026/02/240white1-scaled.webp'],
  'aztech-240mm-black-liquid-cooler': ['https://aztechmea.com/wp-content/uploads/2026/02/240black-3.webp','https://aztechmea.com/wp-content/uploads/2026/02/240（black1）-scaled.webp','https://aztechmea.com/wp-content/uploads/2026/02/240black-2.webp'],
};

await mongoose.connect(process.env.MONGODB_URI);

for (const [slug, images] of Object.entries(imageMap)) {
  await Product.updateOne({ slug }, { $set: { images } });
  console.log('Updated:', slug, `(${images.length} images)`);
}

await mongoose.disconnect();
console.log('\nDone.');

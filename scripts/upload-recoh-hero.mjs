import { v2 as cloudinary } from 'cloudinary';
import { readFileSync } from 'fs';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const DIR = 'C:\\Users\\heman\\AppData\\Local\\Temp\\claude\\D--Workspace-Workspace-Coding-rookie-ninja-rookie-ninja\\a5346597-21c3-4802-8964-5ca969d5ec85\\scratchpad\\ricoh_html\\images';

const files = [
  ['hero-bg1.jpg', 'recoh-hero-office'],
  ['hero-bg3.png', 'recoh-hero-fi8170-desk'],
];

for (const [filename, publicId] of files) {
  const buffer = readFileSync(`${DIR}\\${filename}`);
  const ext = filename.endsWith('.png') ? 'png' : 'jpeg';
  const b64 = `data:image/${ext};base64,${buffer.toString('base64')}`;
  const result = await cloudinary.uploader.upload(b64, {
    public_id: publicId,
    overwrite: true,
    resource_type: 'image',
  });
  console.log(`${publicId}: ${result.secure_url}`);
}

import { v2 as cloudinary } from 'cloudinary';
import { readFileSync } from 'fs';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const DIR = 'C:\\Users\\heman\\AppData\\Local\\Temp\\claude\\D--Workspace-Workspace-Coding-rookie-ninja-rookie-ninja\\a5346597-21c3-4802-8964-5ca969d5ec85\\scratchpad\\ricoh_html\\images';

const files = [
  ['ix2500', 'ix2500.png'],
  ['ix2400', 'ix2400.jpg'],
  ['fi7300nx', 'fi7300nx.jpg'],
  ['fi7600', 'fi7600.jpg'],
  ['fi7700', 'fi7700.jpg'],
  ['fi7300nx-edge', 'fi7300nx-edge.jpg'],
  ['fi8170', 'fi8170.jpg'],
  ['fi8040', 'fi8040.jpg'],
  ['fi8950', 'fi8950.jpg'],
  ['fi8930', 'fi8930.jpg'],
  ['fi8820', 'fi8820.jpg'],
  ['fi8190', 'fi8190.jpg'],
];

const results = {};

for (const [key, filename] of files) {
  const path = `${DIR}\\${filename}`;
  const buffer = readFileSync(path);
  const b64 = `data:image/${filename.endsWith('.png') ? 'png' : 'jpeg'};base64,${buffer.toString('base64')}`;
  const publicId = `recoh-${key}`;
  const result = await cloudinary.uploader.upload(b64, {
    public_id: publicId,
    overwrite: true,
    resource_type: 'image',
  });
  results[key] = result.secure_url;
  console.log(`${key}: ${result.secure_url}`);
}

console.log('\n\n' + JSON.stringify(results, null, 2));

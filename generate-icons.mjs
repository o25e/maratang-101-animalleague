import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const src = resolve(__dirname, 'public/Favicon2.png');

const sizes = [
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'favicon-96x96.png', size: 96 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'icon-192x192.png', size: 192 },
  { name: 'icon-512x512.png', size: 512 },
];

for (const { name, size } of sizes) {
  await sharp(src)
    .trim({ threshold: 5 })
    .resize(size, size)
    .png()
    .toFile(resolve(__dirname, `public/${name}`));
  console.log(`Generated public/${name}`);
}

// Generate favicon.ico (32x32 PNG embedded as ICO)
// ICO format: header + directory + image data
const png32 = await sharp(src).trim({ threshold: 5 }).resize(96, 96).png().toBuffer();

// Build minimal single-image ICO file
const width = 96, height = 96, bpp = 32;
const imgDataOffset = 6 + 16; // header(6) + 1 directory entry(16)

const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);  // reserved
header.writeUInt16LE(1, 2);  // type: ICO
header.writeUInt16LE(1, 4);  // count: 1

const dirEntry = Buffer.alloc(16);
dirEntry.writeUInt8(width, 0);
dirEntry.writeUInt8(height, 1);
dirEntry.writeUInt8(0, 2);   // color count
dirEntry.writeUInt8(0, 3);   // reserved
dirEntry.writeUInt16LE(1, 4); // color planes
dirEntry.writeUInt16LE(bpp, 6); // bits per pixel
dirEntry.writeUInt32LE(png32.length, 8);  // size of image data
dirEntry.writeUInt32LE(imgDataOffset, 12); // offset

writeFileSync(resolve(__dirname, 'public/favicon.ico'), Buffer.concat([header, dirEntry, png32]));
console.log('Generated public/favicon.ico');

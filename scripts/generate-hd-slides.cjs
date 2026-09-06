const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function createSlides() {
  const outDir = path.join(__dirname, '../public/images/hero');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const width = 1600;
  const height = 900;
  const mobWidth = 800;
  const mobHeight = 1060;

  // Seamless white gradient overlay on the left for crisp text contrast
  const desktopOverlaySvg = Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="whiteFade" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#FFFFFF" stop-opacity="1" />
          <stop offset="36%" stop-color="#FFFFFF" stop-opacity="1" />
          <stop offset="50%" stop-color="#FFFFFF" stop-opacity="0.9" />
          <stop offset="66%" stop-color="#FFFFFF" stop-opacity="0.4" />
          <stop offset="85%" stop-color="#FFFFFF" stop-opacity="0" />
        </linearGradient>
        <linearGradient id="topFade" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.4" />
          <stop offset="15%" stop-color="#FFFFFF" stop-opacity="0" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#whiteFade)" />
      <rect width="${width}" height="${height}" fill="url(#topFade)" />
    </svg>
  `);

  // --- SLIDE 1: Chemical & Industrial Trigger Bottles (chemical.jpg) ---
  console.log('Processing Slide 1 (chemical.jpg)...');
  await sharp(path.join(__dirname, '../chemical.jpg'))
    .extract({ left: 100, top: 1200, width: 3380, height: 4170 })
    .resize(mobWidth, mobHeight, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 95 })
    .toFile(path.join(outDir, 'hero-slide-1-mobile.jpg'));

  const chemRight = await sharp(path.join(__dirname, '../chemical.jpg'))
    .extract({ left: 100, top: 1000, width: 3380, height: 4300 })
    .resize(1050, height, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 95 })
    .toBuffer();

  await sharp({
    create: { width, height, channels: 3, background: { r: 255, g: 255, b: 255 } }
  })
  .composite([
    { input: chemRight, left: width - 1050, top: 0 },
    { input: desktopOverlaySvg, left: 0, top: 0 }
  ])
  .jpeg({ quality: 95 })
  .toFile(path.join(outDir, 'hero-slide-1-desktop.jpg'));

  // --- SLIDE 2: Luxury Cosmetic Amber Droppers (cosmetics.jpg) ---
  console.log('Processing Slide 2 (cosmetics.jpg)...');
  await sharp(path.join(__dirname, '../cosmetics.jpg'))
    .resize(mobWidth, mobHeight, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 95 })
    .toFile(path.join(outDir, 'hero-slide-2-mobile.jpg'));

  const cosmRight = await sharp(path.join(__dirname, '../cosmetics.jpg'))
    .resize(1050, height, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 95 })
    .toBuffer();

  await sharp({
    create: { width, height, channels: 3, background: { r: 255, g: 255, b: 255 } }
  })
  .composite([
    { input: cosmRight, left: width - 1050, top: 0 },
    { input: desktopOverlaySvg, left: 0, top: 0 }
  ])
  .jpeg({ quality: 95 })
  .toFile(path.join(outDir, 'hero-slide-2-desktop.jpg'));

  // --- SLIDE 3: Pharmaceutical Amber Medicine Bottles (pharma.jpg) ---
  console.log('Processing Slide 3 (pharma.jpg)...');
  await sharp(path.join(__dirname, '../pharma.jpg'))
    .extract({ left: 300, top: 1200, width: 2350, height: 2780 })
    .resize(mobWidth, mobHeight, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 95 })
    .toFile(path.join(outDir, 'hero-slide-3-mobile.jpg'));

  const pharmaRight = await sharp(path.join(__dirname, '../pharma.jpg'))
    .extract({ left: 200, top: 800, width: 2450, height: 3180 })
    .resize(1050, height, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 95 })
    .toBuffer();

  await sharp({
    create: { width, height, channels: 3, background: { r: 255, g: 255, b: 255 } }
  })
  .composite([
    { input: pharmaRight, left: width - 1050, top: 0 },
    { input: desktopOverlaySvg, left: 0, top: 0 }
  ])
  .jpeg({ quality: 95 })
  .toFile(path.join(outDir, 'hero-slide-3-desktop.jpg'));

  console.log('All 3 HD slides successfully generated!');
}

createSlides().catch(console.error);

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function processSlides() {
  const rootDir = path.join(__dirname, '..');
  const outDir = path.join(rootDir, 'public/images/hero');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const width = 1600;
  const height = 900;
  const mobWidth = 800;
  const mobHeight = 1060;

  // Ultra-smooth left-to-right fade overlay for text readability
  const desktopOverlaySvg = Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="whiteFade" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#FFFFFF" stop-opacity="1" />
          <stop offset="35%" stop-color="#FFFFFF" stop-opacity="1" />
          <stop offset="50%" stop-color="#FFFFFF" stop-opacity="0.9" />
          <stop offset="65%" stop-color="#FFFFFF" stop-opacity="0.4" />
          <stop offset="82%" stop-color="#FFFFFF" stop-opacity="0" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#whiteFade)" />
    </svg>
  `);

  // =========================================================================
  // SLIDE 1: pexels-amelie-chen-243775000-12352170.jpg (4000 x 6000)
  // Empty Glass Cosmetic Jars & Dropper Treatment Bottles
  // =========================================================================
  console.log('Composing Slide 1...');
  const img1Path = path.join(rootDir, 'pexels-amelie-chen-243775000-12352170.jpg');

  // Mobile: 800 x 1060
  await sharp(img1Path)
    .extract({ left: 200, top: 700, width: 3600, height: 4770 })
    .resize(mobWidth, mobHeight)
    .jpeg({ quality: 95, mozjpeg: true })
    .toFile(path.join(outDir, 'hero-slide-1-mobile.jpg'));

  // Desktop: 1600 x 900
  const s1Buffer = await sharp(img1Path)
    .extract({ left: 100, top: 650, width: 3800, height: 4600 })
    .resize(null, 900)
    .jpeg({ quality: 95 })
    .toBuffer();

  const s1Meta = await sharp(s1Buffer).metadata();

  await sharp({
    create: { width, height, channels: 3, background: { r: 255, g: 255, b: 255 } }
  })
  .composite([
    { input: s1Buffer, left: width - s1Meta.width, top: 0 },
    { input: desktopOverlaySvg, left: 0, top: 0 }
  ])
  .jpeg({ quality: 95, mozjpeg: true })
  .toFile(path.join(outDir, 'hero-slide-1-desktop.jpg'));

  // =========================================================================
  // SLIDE 2: pexels-mearlywan-307951439-13516802.jpg (4169 x 5558)
  // Pastel Blue Cosmetic Lotion Pump Dispensers
  // =========================================================================
  console.log('Composing Slide 2...');
  const img2Path = path.join(rootDir, 'pexels-mearlywan-307951439-13516802.jpg');

  // Mobile: 800 x 1060
  await sharp(img2Path)
    .extract({ left: 200, top: 700, width: 3769, height: 4700 })
    .resize(mobWidth, mobHeight)
    .jpeg({ quality: 95, mozjpeg: true })
    .toFile(path.join(outDir, 'hero-slide-2-mobile.jpg'));

  // Desktop: 1600 x 900
  const s2Buffer = await sharp(img2Path)
    .extract({ left: 100, top: 600, width: 3969, height: 4800 })
    .resize(null, 900)
    .jpeg({ quality: 95 })
    .toBuffer();

  const s2Meta = await sharp(s2Buffer).metadata();

  await sharp({
    create: { width, height, channels: 3, background: { r: 255, g: 255, b: 255 } }
  })
  .composite([
    { input: s2Buffer, left: width - s2Meta.width, top: 0 },
    { input: desktopOverlaySvg, left: 0, top: 0 }
  ])
  .jpeg({ quality: 95, mozjpeg: true })
  .toFile(path.join(outDir, 'hero-slide-2-desktop.jpg'));

  // =========================================================================
  // SLIDE 3: pexels-daria-liudnaya-8167170.jpg (2800 x 3500)
  // Elegant White & Clear Mist Sprayer Bottles with Display Cylinder
  // =========================================================================
  console.log('Composing Slide 3...');
  const img3Path = path.join(rootDir, 'pexels-daria-liudnaya-8167170.jpg');

  // Mobile: 800 x 1060
  await sharp(img3Path)
    .extract({ left: 0, top: 100, width: 2800, height: 3400 })
    .resize(mobWidth, mobHeight)
    .jpeg({ quality: 95, mozjpeg: true })
    .toFile(path.join(outDir, 'hero-slide-3-mobile.jpg'));

  // Desktop: 1600 x 900
  const s3Buffer = await sharp(img3Path)
    .extract({ left: 0, top: 100, width: 2800, height: 3400 })
    .resize(null, 900)
    .jpeg({ quality: 95 })
    .toBuffer();

  const s3Meta = await sharp(s3Buffer).metadata();

  await sharp({
    create: { width, height, channels: 3, background: { r: 255, g: 255, b: 255 } }
  })
  .composite([
    { input: s3Buffer, left: width - s3Meta.width, top: 0 },
    { input: desktopOverlaySvg, left: 0, top: 0 }
  ])
  .jpeg({ quality: 95, mozjpeg: true })
  .toFile(path.join(outDir, 'hero-slide-3-desktop.jpg'));

  console.log('All slides seamlessly composed at full height!');
}

processSlides().catch(err => {
  console.error(err);
  process.exit(1);
});

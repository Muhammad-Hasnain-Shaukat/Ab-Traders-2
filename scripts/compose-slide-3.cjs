const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function composeSlide3() {
  const inputPath = path.join(__dirname, '../public/images/hero/hero-slide-3-desktop.jpg');
  const tempPath = path.join(__dirname, '../public/images/hero/hero-slide-3-desktop-temp.jpg');
  const finalPath = path.join(__dirname, '../public/images/hero/hero-slide-3-desktop.jpg');
  
  const width = 1600;
  const height = 900;
  
  // 1. Read input bottles from the original or current
  // Let's re-crop the original bottles portion cleanly
  const inputBuffer = fs.readFileSync(inputPath);
  
  // Extract just the bottles area (right side of current or original)
  const metaInput = await sharp(inputBuffer).metadata();
  
  // If the image was already modified, extract the right side; otherwise resize
  let bottlesBuffer;
  if (metaInput.width > 1000) {
    // Extract the bottles from X=530 to end
    bottlesBuffer = await sharp(inputBuffer)
      .extract({ left: 520, top: 0, width: metaInput.width - 520, height: metaInput.height })
      .toBuffer();
  } else {
    bottlesBuffer = inputBuffer;
  }
  
  const resizedBottles = await sharp(bottlesBuffer)
    .resize({
      height: 900,
      fit: 'cover',
      position: 'right'
    })
    .toBuffer();
    
  const meta = await sharp(resizedBottles).metadata();
  
  // Create a pure black canvas: 1600 x 900
  // Left 45% (0 to 720px) is solid black #141210
  // 720px to 1050px is a smooth blend
  // 1050px to 1600px is the bottles image
  
  const overlaySvg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="blackFade" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#14120E" stop-opacity="1" />
          <stop offset="42%" stop-color="#14120E" stop-opacity="1" />
          <stop offset="55%" stop-color="#14120E" stop-opacity="0.95" />
          <stop offset="70%" stop-color="#14120E" stop-opacity="0.5" />
          <stop offset="85%" stop-color="#14120E" stop-opacity="0.1" />
          <stop offset="95%" stop-color="#14120E" stop-opacity="0" />
        </linearGradient>
        <linearGradient id="topVignette" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#14120E" stop-opacity="0.75" />
          <stop offset="18%" stop-color="#14120E" stop-opacity="0" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#blackFade)" />
      <rect width="${width}" height="${height}" fill="url(#topVignette)" />
    </svg>
  `;
  
  const overlayBuffer = Buffer.from(overlaySvg);
  
  // Composite: Background is black, bottles on the right, then black fade overlay on top
  const baseBg = await sharp({
    create: {
      width,
      height,
      channels: 3,
      background: { r: 20, g: 18, b: 14 }
    }
  }).jpeg().toBuffer();
  
  const result = await sharp(baseBg)
    .composite([
      {
        input: resizedBottles,
        left: width - meta.width,
        top: 0
      },
      {
        input: overlayBuffer,
        left: 0,
        top: 0
      }
    ])
    .jpeg({ quality: 96 })
    .toFile(tempPath);
    
  fs.copyFileSync(tempPath, finalPath);
  fs.unlinkSync(tempPath);
  console.log('Successfully created slide 3 with flawless black left side and bottles on right!');
}

composeSlide3().catch(console.error);

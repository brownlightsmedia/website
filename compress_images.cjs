const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imagesDir = path.join(__dirname, 'public', 'assets', 'images');

async function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else if (entry.isFile() && /\.(jpg|jpeg|png|JPG|JPEG)$/.test(entry.name)) {
      try {
        const metadata = await sharp(fullPath).metadata();
        const stat = fs.statSync(fullPath);
        
        // If the image is wide (larger than 1600) or file size > 800KB, resize and compress
        if (metadata.width > 1600 || stat.size > 800000) {
          console.log(`Compressing: ${fullPath} (${(stat.size / 1024 / 1024).toFixed(2)} MB)`);
          const tmpPath = fullPath + '.tmp';
          
          await sharp(fullPath)
            .resize(1600, null, {
              withoutEnlargement: true,
              fit: 'inside'
            })
            .jpeg({ quality: 80, progressive: true })
            .toFile(tmpPath);
            
          fs.renameSync(tmpPath, fullPath);
        }
      } catch (err) {
        console.error(`Error processing ${fullPath}:`, err.message);
      }
    }
  }
}

processDirectory(imagesDir).then(() => {
  console.log('Image compression complete.');
});

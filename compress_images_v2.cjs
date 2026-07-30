const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function processDirectory(srcDir, destDir) {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const files = fs.readdirSync(srcDir);
  
  for (const file of files) {
    const srcPath = path.join(srcDir, file);
    const destPath = path.join(destDir, file);
    const stat = fs.statSync(srcPath);
    
    if (stat.isDirectory()) {
      await processDirectory(srcPath, destPath);
    } else if (file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg') || file.toLowerCase().endsWith('.png')) {
      try {
        await sharp(srcPath)
          .resize({ width: 1200, withoutEnlargement: true })
          .jpeg({ quality: 60, progressive: true })
          .toFile(destPath);
        console.log(`Compressed: ${destPath}`);
      } catch (err) {
        console.error(`Error compressing ${srcPath}:`, err.message);
        // Copy the original if compression fails
        fs.copyFileSync(srcPath, destPath);
      }
    } else {
      // Copy other files directly
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

const imagesDir = path.join(__dirname, 'public', 'assets', 'images');
const tempDir = path.join(__dirname, 'public', 'assets', 'images_compressed');

console.log('Starting compression...');
processDirectory(imagesDir, tempDir).then(() => {
  console.log('Compression complete. Replacing original folder...');
  fs.rmSync(imagesDir, { recursive: true, force: true });
  fs.renameSync(tempDir, imagesDir);
  console.log('Done.');
});

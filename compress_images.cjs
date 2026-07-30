const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      await processDirectory(fullPath);
    } else if (file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg') || file.toLowerCase().endsWith('.png')) {
      const tempPath = fullPath + '.tmp';
      try {
        await sharp(fullPath)
          .resize({ width: 1200, withoutEnlargement: true })
          .jpeg({ quality: 60, progressive: true })
          .toFile(tempPath);
          
        // Replace original with compressed version
        fs.unlinkSync(fullPath);
        fs.renameSync(tempPath, fullPath);
        console.log(`Compressed: ${fullPath}`);
      } catch (err) {
        console.error(`Error compressing ${fullPath}:`, err.message);
      }
    }
  }
}

const imagesDir = path.join(__dirname, 'public', 'assets', 'images');
console.log('Starting compression...');
processDirectory(imagesDir).then(() => {
  console.log('Compression complete.');
});

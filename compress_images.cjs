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
    } else if (file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg') || file.toLowerCase().endsWith('.png') || file.toLowerCase().endsWith('.webp')) {
      try {
        // Read file to buffer first to close the file handle instantly on Windows
        const fileBuffer = fs.readFileSync(fullPath);
        
        // Process the in-memory buffer using sharp
        const compressedBuffer = await sharp(fileBuffer)
          .resize({ width: 1200, withoutEnlargement: true })
          .jpeg({ quality: 60, progressive: true, force: false }) 
          .webp({ quality: 60, force: false })
          .toBuffer();
          
        // Overwrite the original file
        fs.writeFileSync(fullPath, compressedBuffer);
        console.log(`Compressed: ${fullPath}`);
      } catch (err) {
        console.error(`Error compressing ${fullPath}:`, err.message);
      }
    }
  }
}

const imagesDir = path.join(__dirname, 'public', 'assets', 'images');
console.log('Starting compression in memory...');
processDirectory(imagesDir).then(() => {
  console.log('Compression complete.');
});

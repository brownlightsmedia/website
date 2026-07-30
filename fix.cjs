const fs = require('fs');
const file = 'd:/kozhikode/src/components/Gallery.jsx';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/src: '([^']+)'/g, (match, url) => {
  return `src: '${decodeURIComponent(url)}'`;
});
fs.writeFileSync(file, content, 'utf8');
console.log('Fixed Gallery src URLs');

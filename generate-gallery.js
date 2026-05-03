const fs = require('fs');
const d = 'C:/Users/lenovo/.gemini/antigravity/brain/77753645-17de-475c-a1db-be69982d87f1/.tempmediaStorage';
const files = fs.readdirSync(d)
  .filter(f => f.endsWith('.png'))
  .sort((a,b) => fs.statSync(d+'/'+b).mtime - fs.statSync(d+'/'+a).mtime)
  .slice(0, 30);
let html = '<html><body style="background:#fff;">';
files.forEach(f => {
  html += `<div><h3>${f}</h3><img src="file:///${d}/${f}" style="max-width:300px"/></div>`;
});
html += '</body></html>';
fs.writeFileSync('test-images.html', html);

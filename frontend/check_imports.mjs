import fs from 'fs';
import path from 'path';

function findFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      if (!file.includes('node_modules') && !file.includes('dist')) {
        results = results.concat(findFiles(file));
      }
    } else { 
      if (file.endsWith('.js') || file.endsWith('.jsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = findFiles('src');
let hasErrors = false;

for (const file of files) {
  const content = fs.readFileSync(file, 'utf-8');
  const lines = content.split('\n');
  
  lines.forEach((line, i) => {
    const match = line.match(/import\s+.*?\s+from\s+['"]([^'"]+)['"]/);
    if (match) {
      const importPath = match[1];
      if (importPath.startsWith('.')) { 
        const dir = path.dirname(file);
        const resolvedBase = path.resolve(dir, importPath);
        
        const possibleExtensions = ['', '.js', '.jsx', '/index.js', '/index.jsx'];
        let found = false;
        
        for (const ext of possibleExtensions) {
          if (fs.existsSync(resolvedBase + ext)) {
            found = true;
            break;
          }
        }
        
        if (!found) {
          console.error(`Broken import in ${file}:${i + 1}`);
          console.error(`  Cannot resolve: ${importPath}`);
          hasErrors = true;
        }
      }
    }
  });
}

if (!hasErrors) {
  console.log("No broken relative imports found.");
}

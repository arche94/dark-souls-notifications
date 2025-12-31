const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const projectRoot = path.resolve(__dirname, '..');
const outputZip = path.join(projectRoot, 'dark-souls-notifications.zip');

// Files and folders to include in the ZIP
const filesToInclude = [
  'manifest.json',
  'dist',
  'assets'
];

// Files and folders to exclude
const excludePatterns = [
  /node_modules/,
  /\.git/,
  /src/,
  /\.pem$/,
  /\.crx$/,
  /\.zip$/,
  /\.map$/,
  /\.ts$/,
  /package\.json/,
  /package-lock\.json/,
  /tsconfig\.json/,
  /webpack\.config\.js/,
  /eslint\.config\.mts/,
  /\.gitignore/,
  /README\.md/,
  /PRODUCTION\.md/,
  /PRIVACY-POLICY\.md/,
  /LICENSE/,
  /publication/
];

function shouldExclude(filePath) {
  return excludePatterns.some(pattern => pattern.test(filePath));
}

function addToArchive(archive, filePath, basePath) {
  const fullPath = path.join(basePath, filePath);
  const stat = fs.statSync(fullPath);
  
  if (stat.isDirectory()) {
    const files = fs.readdirSync(fullPath);
    files.forEach(file => {
      const nestedPath = path.join(filePath, file);
      if (!shouldExclude(nestedPath)) {
        addToArchive(archive, nestedPath, basePath);
      }
    });
  } else {
    if (!shouldExclude(filePath)) {
      archive.file(fullPath, { name: filePath });
    }
  }
}

// Remove existing ZIP if it exists
if (fs.existsSync(outputZip)) {
  fs.unlinkSync(outputZip);
  console.log('Removed existing ZIP file');
}

// Create a file to stream archive data to
const output = fs.createWriteStream(outputZip);
const archive = archiver('zip', {
  zlib: { level: 9 } // Maximum compression
});

// Listen for all archive data to be written
output.on('close', () => {
  console.log(`✅ Extension packaged successfully!`);
  console.log(`📦 File: ${outputZip}`);
  console.log(`📊 Total size: ${(archive.pointer() / 1024).toFixed(2)} KB`);
});

archive.on('error', (err) => {
  throw err;
});

// Pipe archive data to the file
archive.pipe(output);

// Add files to the archive
console.log('📦 Packaging extension...');
filesToInclude.forEach(item => {
  const itemPath = path.join(projectRoot, item);
  if (fs.existsSync(itemPath)) {
    addToArchive(archive, item, projectRoot);
  } else {
    console.warn(`⚠️  Warning: ${item} not found, skipping...`);
  }
});

// Finalize the archive
archive.finalize();

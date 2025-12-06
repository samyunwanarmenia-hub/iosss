import fs from 'fs';
import path from 'path';

const HIGHLIGHT_SIZE = 200 * 1024;
const ROOTS = ['public', 'public/optimized'];
const CACHE_FILE = 'reports/seo-image-audit.json';

const fileList = [];

const formatBytes = bytes => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
};

const scanFolder = dir => {
  const directory = path.join(process.cwd(), dir);
  if (!fs.existsSync(directory)) return;

  fs.readdirSync(directory, { withFileTypes: true }).forEach(entry => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      scanFolder(path.relative(process.cwd(), entryPath));
      return;
    }

    const extension = path.extname(entry.name).toLowerCase();
    if (['.jpg', '.jpeg', '.png'].includes(extension)) {
      const stats = fs.statSync(entryPath);
      if (stats.size > HIGHLIGHT_SIZE) {
        fileList.push({
          path: path.relative(process.cwd(), entryPath),
          size: stats.size,
          suggestion: `Optimize to WebP/AVIF (consider ${Math.round(stats.size / 1024 / 2)} KB target).`,
        });
      }
    }
  });
};

ROOTS.forEach(scanFolder);

if (!fs.existsSync(path.dirname(CACHE_FILE))) {
  fs.mkdirSync(path.dirname(CACHE_FILE), { recursive: true });
}

fs.writeFileSync(
  CACHE_FILE,
  JSON.stringify(
    fileList.map(item => ({
      ...item,
      readableSize: formatBytes(item.size),
    })),
    null,
    2,
  ),
);

if (fileList.length === 0) {
  console.log('✅ No large images were found (all under 200 KB).');
  process.exit(0);
}

console.log(`🔎 Found ${fileList.length} heavy image(s) (>200 KB).`);
fileList.forEach(({ path: relativePath, size, suggestion }) => {
  console.log(`- ${relativePath} (${formatBytes(size)}): ${suggestion}`);
});
console.log(`Detailed report saved to ${CACHE_FILE}`);

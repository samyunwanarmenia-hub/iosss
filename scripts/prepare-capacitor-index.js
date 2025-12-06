import { existsSync, mkdirSync, writeFileSync } from 'fs';
import path from 'path';

const isCapacitor = process.env.CAPACITOR === 'true';

if (!isCapacitor) {
  process.exit(0);
}

const webDir = path.join(process.cwd(), '.next');

if (!existsSync(webDir)) {
  console.error('[capacitor] Missing .next build output. Run `CAPACITOR=true npm run build` first.');
  process.exit(1);
}

mkdirSync(webDir, { recursive: true });

const indexPath = path.join(webDir, 'index.html');
const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>MyApp (Capacitor SSR stub)</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 24px; line-height: 1.6; }
    code { background: #f2f2f2; padding: 2px 4px; border-radius: 3px; }
  </style>
</head>
<body>
  <h1>Capacitor build uses the Next.js SSR output</h1>
  <p>This placeholder lets Capacitor package the <code>.next</code> directory. Start the Next.js server (or point Capacitor to a deployed host) for real app content.</p>
</body>
</html>`;

writeFileSync(indexPath, html);
console.log(`[capacitor] Created placeholder web entry at ${indexPath}`);

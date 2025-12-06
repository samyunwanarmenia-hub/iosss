#!/usr/bin/env node
/**
 * Generate a lightweight cache map for build assets.
 * Scans `.next/static` and produces `public/cache-map.json`
 * so the service worker (or CI) can reference built asset paths if needed.
 */
import { promises as fs } from 'fs';
import path from 'path';

const root = process.cwd();
const staticDir = path.join(root, '.next', 'static');
const output = path.join(root, 'public', 'cache-map.json');

async function collectFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const results = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...(await collectFiles(full)));
    } else {
      results.push(full);
    }
  }
  return results;
}

async function main() {
  try {
    const files = await collectFiles(staticDir);
    const relative = files.map(f => f.replace(root, '').replace(/\\/g, '/'));
    const payload = {
      generatedAt: new Date().toISOString(),
      assets: relative,
    };
    await fs.writeFile(output, JSON.stringify(payload, null, 2), 'utf8');
    console.log(`[cache-map] wrote ${relative.length} entries to ${output}`);
  } catch (err) {
    console.error('[cache-map] failed:', err.message);
    process.exit(1);
  }
}

main();

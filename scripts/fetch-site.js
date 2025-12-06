#!/usr/bin/env node
/**
 * Simple fetch helper to pre-warm routes (optional for CI).
 * It requests the provided URLs (comma-separated) and prints status codes.
 */
import https from 'https';
import http from 'http';

const targets = (process.env.FETCH_URLS || '').split(',').map(s => s.trim()).filter(Boolean);

if (!targets.length) {
  console.log('[fetch-site] No FETCH_URLS provided; skipping.');
  process.exit(0);
}

const fetchUrl = url =>
  new Promise(resolve => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, res => {
      res.resume();
      res.on('end', () => resolve({ url, status: res.statusCode }));
    });
    req.on('error', err => resolve({ url, error: err.message }));
  });

(async () => {
  const results = await Promise.all(targets.map(fetchUrl));
  results.forEach(r => {
    if (r.error) {
      console.error(`[fetch-site] ${r.url} -> error: ${r.error}`);
    } else {
      console.log(`[fetch-site] ${r.url} -> ${r.status}`);
    }
  });
})();

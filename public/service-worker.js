/* global self */
const CACHE_VERSION = 'v1-capacitor';
const STATIC_CACHE = `static-${CACHE_VERSION}`;
const RUNTIME_CACHE = `runtime-${CACHE_VERSION}`;
const OFFLINE_URL = '/offline.html';

const ASSETS_TO_PRECACHE = [
  '/',
  OFFLINE_URL,
  '/manifest.json',
  '/favicon.ico',
  '/site.webmanifest',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/icon-maskable-512.png',
  '/icons/apple-touch-icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache => cache.addAll(ASSETS_TO_PRECACHE)),
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== STATIC_CACHE && key !== RUNTIME_CACHE)
          .map(key => caches.delete(key)),
      ),
    ),
  );
  self.clients.claim();
});

const isHtmlRequest = request =>
  request.mode === 'navigate' || (request.headers.get('accept') || '').includes('text/html');

const isApiRequest = url => url.pathname.startsWith('/api') || url.pathname.includes('/api/');

const isStaticAsset = url =>
  url.pathname.startsWith('/_next/') ||
  /\.(?:js|css|png|jpg|jpeg|gif|webp|svg|ico|woff2?|json)$/i.test(url.pathname);

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  const sameOrigin = url.origin === self.location.origin || url.origin.startsWith('capacitor://') || url.origin.startsWith('file://');

  // Ignore cross-origin requests except API if same origin
  if (!sameOrigin && !isApiRequest(url)) return;

  if (isHtmlRequest(event.request)) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const copy = response.clone();
          caches.open(RUNTIME_CACHE).then(cache => cache.put(event.request, copy));
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(event.request);
          if (cached) return cached;
          return caches.match(OFFLINE_URL);
        }),
    );
    return;
  }

  if (isStaticAsset(url)) {
    event.respondWith(
      caches.match(event.request).then(
        cached =>
          cached ||
          fetch(event.request)
            .then(response => {
              const copy = response.clone();
              caches.open(STATIC_CACHE).then(cache => cache.put(event.request, copy));
              return response;
            })
            .catch(() => cached || caches.match(OFFLINE_URL)),
      ),
    );
    return;
  }

  if (isApiRequest(url)) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const copy = response.clone();
          caches.open(RUNTIME_CACHE).then(cache => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match(event.request)),
    );
    return;
  }

  // Default: network-first with runtime cache fallback
  event.respondWith(
    fetch(event.request)
      .then(response => {
        const copy = response.clone();
        caches.open(RUNTIME_CACHE).then(cache => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request)),
  );
});

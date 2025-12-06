// Bump version to force-update older caches that may serve stale HTML
const CACHE_VERSION = 'v4';
const CACHE_STATIC_NAME = `samyunwan-static-${CACHE_VERSION}`;
const CACHE_DYNAMIC_NAME = `samyunwan-dynamic-${CACHE_VERSION}`;

// Keep only non-HTML assets in the precache to avoid serving stale pages
const STATIC_URLS_TO_CACHE = [
  '/favicon.ico',
  '/favicon.png',
  '/site.webmanifest',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/icon-maskable-512.png',
  '/icons/apple-touch-icon.png',
  '/loading.gif',
  '/fonts/CalSans-SemiBold.woff2',
  '/fonts/Inter-Bold.woff2',
  '/fonts/Inter-Medium.woff2',
  '/fonts/Inter-Regular.woff2',
  '/fonts/Inter-SemiBold.woff2',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME).then(cache => cache.addAll(STATIC_URLS_TO_CACHE)),
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
            return caches.delete(key);
          }
          return undefined;
        }),
      ),
    ),
  );
  self.clients.claim();
});

// Network-first for navigations (HTML) to keep SEO/content fresh
const isNavigationRequest = request =>
  request.mode === 'navigate' ||
  (request.method === 'GET' && request.headers.get('accept')?.includes('text/html'));

self.addEventListener('fetch', event => {
  const { request } = event;
  const url = request.url;
  const isStaticAsset = STATIC_URLS_TO_CACHE.some(path => url.includes(path));
  const isOptimizedImage = url.includes('/optimized/');

  if (isNavigationRequest(request)) {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Cache the latest HTML for offline fallback
          const copy = response.clone();
          caches.open(CACHE_DYNAMIC_NAME).then(cache => cache.put(request, copy));
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          return (
            cached ||
            new Response('<h1>Offline</h1>', { headers: { 'Content-Type': 'text/html' } })
          );
        }),
    );
    return;
  }

  if (isStaticAsset || isOptimizedImage) {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) return cached;
        return fetch(request)
          .then(response => {
            const copy = response.clone();
            caches.open(CACHE_DYNAMIC_NAME).then(cache => cache.put(request, copy));
            return response;
          })
          .catch(() => new Response('<h1>Offline</h1>', { headers: { 'Content-Type': 'text/html' } }));
      }),
    );
    return;
  }

  // Default: network-first with dynamic caching
  event.respondWith(
    fetch(request)
      .then(response => {
        const copy = response.clone();
        caches.open(CACHE_DYNAMIC_NAME).then(cache => cache.put(request, copy));
        return response;
      })
      .catch(async () => {
        const cached = await caches.match(request);
        return (
          cached ||
          new Response('<h1>Offline</h1>', { headers: { 'Content-Type': 'text/html' } })
        );
      }),
  );
});

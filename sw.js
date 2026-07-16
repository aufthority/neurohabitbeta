/* ═══════════════════════════════════════════════════════════
   NeuroHabit Service Worker v6
   — index.html always network-first, cache:'no-store' so it
     truly bypasses the HTTP cache, not just Cache Storage
   — Firebase/Fonts cached for offline use
   ═══════════════════════════════════════════════════════════ */

const CACHE_NAME = 'neurohabit-v67';

const PRECACHE = [
  '/neurohabitbeta/manifest.json',
  '/neurohabitbeta/icon-192.png',
  '/neurohabitbeta/icon-512.png',
  'https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth-compat.js',
  'https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics-compat.js',
  'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600&display=swap',
];

/* Install — cache everything except index.html */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE))
  );
  self.skipWaiting();
});

/* Activate — delete all old caches immediately */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

/* Fetch strategy */
self.addEventListener('fetch', event => {
  const url = event.request.url;

  /* index.html — ALWAYS network-first. cache:'no-store' forces
     a real network round-trip instead of letting the browser's
     ordinary HTTP cache silently answer the fetch() call —
     that gap was why deployed changes weren't showing up. */
  if (url.includes('/neurohabitbeta/index.html') || url.endsWith('/neurohabitbeta/') || url.endsWith('/neurohabitbeta')) {
    event.respondWith(
      fetch(event.request, { cache: 'no-store' }).catch(() => caches.match('/neurohabitbeta/index.html'))
    );
    return;
  }

  /* Firebase CDN and Google Fonts — cache-first (rarely change) */
  if (url.includes('gstatic.com/firebasejs') || url.includes('fonts.googleapis.com') || url.includes('fonts.gstatic.com')) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) return cached;
        return fetch(event.request).then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return response;
        });
      })
    );
    return;
  }

  /* Navigate requests — network-first, same no-store guarantee */
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request, { cache: 'no-store' }).catch(() => caches.match('/neurohabitbeta/index.html'))
    );
    return;
  }

  /* Everything else — network with cache fallback */
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});


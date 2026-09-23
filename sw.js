const CACHE = 'sem-simulator-v6';
const ASSETS = [
  '/', '/index.html', '/manifest.json', '/app.js',
  '/icon-192.png', '/icon-512.png', '/icon.svg', '/apple-touch-icon.png',
  '/vendor/react.production.min.js', '/vendor/react-dom.production.min.js',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).catch(() => caches.match('/index.html')))
  );
});

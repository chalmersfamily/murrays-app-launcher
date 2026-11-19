const name = 'murrays-launcher-v1';
const assets = ['./', './styles.css', './launcher.js', './manifest.webmanifest', './icon-192.png', './icon-512.png'];
const urls = new Set(assets.map(asset => new URL(asset, self.registration.scope).href));
self.addEventListener('install', event => {
  event.waitUntil(caches.open(name).then(cache => cache.addAll(assets)));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys
    .filter(key => key.startsWith('murrays-launcher-') && key !== name)
    .map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || !urls.has(event.request.url)) return;
  event.respondWith(fetch(event.request).catch(() => caches.open(name)
    .then(cache => cache.match(event.request))));
});


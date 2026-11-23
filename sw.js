const name = 'murrays-launcher-v5';
const assets = ['./', './styles.css', './launcher.js', './manifest.webmanifest', './icon-192.png', './icon-512.png',
  "./icons/biteatlas.png",
  "./icons/boat-inventory-demo.png",
  "./icons/boat-inventory.png",
  "./icons/books-i-read.png",
  "./icons/coffee-talk.svg",
  "./icons/family-recipe.png",
  "./icons/file-follow-up.png",
  "./icons/game-day-grey-cup.png",
  "./icons/idea-garden.png",
  "./icons/job-jar.png",
  "./icons/oc-performance.png",
  "./icons/paddletrack-web.png",
  "./icons/pick-the-firm.png",
  "./icons/plants-in-our-yard.png",
  "./icons/pool-stock.png",
  "./icons/project-tracker.png",
  "./icons/ski-track.png",
  "./icons/whoop-remy-walk.png",
  "./icons/winterfit.png",
  "./icons/xmas-list.png"
];
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


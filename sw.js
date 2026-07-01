const CACHE_NAME = 'clark-trip-v1';
const ASSETS = [
  './',
  './index.html',
  './app.js',
  './styles.css',
  './design-system/tokens.css',
  './assets/clark-hero.png',
  './assets/lib/pdf.min.js',
  './assets/lib/pdf.worker.min.js',
  './assets/lib/xlsx.full.min.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', (event) => {
  // 환율 API 등 외부 호출은 네트워크 우선, 실패 시 캐시 폴백
  if (event.request.url.includes('er-api.com')) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
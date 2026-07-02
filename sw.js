const CACHE_NAME = 'clark-trip-v7';
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
  self.skipWaiting(); // 새 SW 즉시 대기 해제
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;

  // 환율 API 등 외부 호출은 네트워크 우선, 실패 시 캐시 폴백
  if (req.url.includes('er-api.com')) {
    event.respondWith(fetch(req).catch(() => caches.match(req)));
    return;
  }

  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  const isCore = req.mode === 'navigate' || (sameOrigin && /\.(html|css|js)$/.test(url.pathname));

  if (isCore) {
    // HTML·CSS·JS: 네트워크 우선 → 항상 최신 반영, 오프라인 시 캐시 폴백
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then((r) => r || caches.match('./index.html')))
    );
    return;
  }

  // 라이브러리·이미지 등 무거운 정적 자원: 캐시 우선
  event.respondWith(caches.match(req).then((r) => r || fetch(req)));
});

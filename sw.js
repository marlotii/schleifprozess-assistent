const CACHE_NAME = "schleifprozess-assistent-v2";
const APP_BASE = new URL("./", self.location.href);
const INDEX_URL = new URL("./index.html", APP_BASE).href;
const PRECACHE_URLS = [
  new URL("./", APP_BASE).href,
  INDEX_URL,
  new URL("./manifest.webmanifest", APP_BASE).href,
  new URL("./mobile.css", APP_BASE).href,
  new URL("./assets/icon-192.png", APP_BASE).href,
  new URL("./assets/icon-512.png", APP_BASE).href,
  new URL("./assets/apple-touch-icon.png", APP_BASE).href
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(INDEX_URL, copy));
          }
          return response;
        })
        .catch(() => caches.match(INDEX_URL))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => cached || fetch(request).then(response => {
      if (response && response.ok) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
      }
      return response;
    }))
  );
});
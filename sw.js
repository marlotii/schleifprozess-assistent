const CACHE_NAME = "schleifprozess-assistent-v5";
const APP_BASE = new URL("./", self.location.href);
const INDEX_URL = new URL("./index.html", APP_BASE).href;
const PRECACHE_URLS = [
  new URL("./", APP_BASE).href,
  INDEX_URL,
  new URL("./manifest.webmanifest", APP_BASE).href,
  new URL("./mobile.css", APP_BASE).href,
  new URL("./mobile-setup.js", APP_BASE).href,
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

async function networkFirst(request, fallback) {
  try {
    const response = await fetch(request, { cache: "no-store" });
    if (response && response.ok) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    return (await caches.match(request)) || (fallback ? await caches.match(fallback) : Response.error());
  }
}

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request, INDEX_URL));
    return;
  }

  if (/\/(index\.html|mobile\.css|mobile-setup\.js|manifest\.webmanifest)$/.test(url.pathname)) {
    event.respondWith(networkFirst(request));
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => cached || fetch(request).then(async response => {
      if (response && response.ok) {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(request, response.clone());
      }
      return response;
    }))
  );
});

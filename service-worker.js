// init variable
const CACHE_NAME = "pwa-cache-1";
var urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/nav.html",
  "/pages/home.html",
  "/pages/contact.html",
  "/pages/work.html",
  "/pages/education.html",
  "/css/materialize.min.css",
  "/css/style.css",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/icon.png",
  "/images/egov.jpg",
  "/images/gmf.jpg",
  "/images/indosat.png",
  "/images/nody.jpg",
];

//register service worker
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

// get cache using service worker
self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request, {cacheName: CACHE_NAME})
      .then(function(response) {
        if(response) {
          console.log("Service Worker: Gunakan aset dari cache", response.url);
          return response;
        }

        console.log("Service Worker: Memuat aset dari server: ", event.request.url);
        return fetch(event.request);
      })
  );
});


// delete service worker if already exists
self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("Service Worker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

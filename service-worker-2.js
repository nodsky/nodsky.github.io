
// init variable
const CACHE_NAME = "football-data v-5";
var urlsToCache = [
  "/",
  "/manifest.json",
  "/index.html",
  "/match.html",
  "/team.html",
  "/nav.html",
  "/saved.html",
  "/css/materialize.min.css",
  "/css/style.css",
  "/js/api.js",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/js/register_sw.js",
  "/js/register_notif.js",
  "/images/logo_world_cup.png",
  "/pages/index.html",
  "/js/idb.js",
  "/js/database.js",
  "/fonts/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
  "/images/icons/icon-512x512.png",
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
  var base_url = "https://api.football-data.org/v2/";
  if (event.request.url.indexOf(base_url) > -1) {
    console.log('cache dari url');
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return fetch(event.request).then(function(response) {
          cache.put(event.request.url, response.clone());
          return response;
        })
      })
    );
  } else {
    console.log('cache dari local');
    event.respondWith(
      caches.match(event.request, { ignoreSearch: true}).then(function(response) {
        return response || fetch (event.request);
      })
    )
  }

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

self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    vibrate: [100, 50, 100],
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});

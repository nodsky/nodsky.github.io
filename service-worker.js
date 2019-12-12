importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

workbox.precaching.precacheAndRoute([
  {url: '/manifest.json', revision: '1'},
  {url: '/index.html', revision: '1'},
  {url: '/nav.html', revision: '1'},
  {url: '/css/materialize.min.css', revision: '1'},
  {url: '/css/style.css', revision: '1'},
  {url: '/js/api.js', revision: '1'},
  {url: '/js/materialize.min.js', revision: '1'},
  {url: '/js/nav.js', revision: '1'},
  {url: '/js/register_sw.js', revision: '1'},
  {url: '/js/register_notif.js', revision: '1'},
  {url: '/images/logo_world_cup.png', revision: '1'},
  {url: '/pages/index.html', revision: '1'},
  {url: '/js/idb.js', revision: '1'},
  {url: '/js/database.js', revision: '1'},
  {url: '/icon.png', revision: '1'},
  {url: '/fonts/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2', revision: '1'},
  {url: '/images/icons/icon-512x512.png', revision: '1'},
  {url: '/images/icons/icon-192x192.png', revision: '1'},
]);


workbox.routing.registerRoute(
  new RegExp('/match.html'),
  workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
  new RegExp('/team.html'),
  workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
  new RegExp('/saved.html'),
  workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'api-football',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ]
  })
);


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

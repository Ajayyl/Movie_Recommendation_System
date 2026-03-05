// No-op service worker — replaces any stale service workers from previous deployments
// This file intentionally has no fetch handler, so the browser will use normal network requests

self.addEventListener('install', function (event) {
    console.log('[SW] No-op service worker installed, replacing old one');
    self.skipWaiting();
});

self.addEventListener('activate', function (event) {
    console.log('[SW] No-op service worker activated, clearing old caches');
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    console.log('[SW] Deleting old cache:', cacheName);
                    return caches.delete(cacheName);
                })
            );
        }).then(function () {
            return self.clients.claim();
        })
    );
});

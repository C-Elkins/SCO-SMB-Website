// High-performance service worker for Real Experience Score optimization
const CACHE_NAME = 'sco-smb-v2';
const STATIC_CACHE = 'sco-smb-static-v2';
const DYNAMIC_CACHE = 'sco-smb-dynamic-v2';

// Critical resources to cache for instant loading
const CRITICAL_RESOURCES = [
  '/',
  '/trial',
  '/contact',
  '/download',
  '/manifest.webmanifest',
  '/screenshots/sco-smb-hero-dashboard.png'
];

// Static assets with long cache times
const STATIC_ASSETS = [
  '/logos/',
  '/screenshots/',
  '/patterns/',
];

// Install event - cache critical resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then((cache) => cache.addAll(CRITICAL_RESOURCES)),
      self.skipWaiting()
    ])
  );
});

// Activate event - clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              return caches.delete(cacheName);
            }
          })
        );
      })
  );
  self.clients.claim();
});

// Fetch event - serve from cache first, then network
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // Cache first strategy for static assets
  if (request.destination === 'image' || 
      request.destination === 'font' || 
      request.destination === 'style' ||
      request.url.includes('_next/static')) {
    event.respondWith(
      caches.match(request)
        .then(response => {
          if (response) {
            return response;
          }
          return fetch(request)
            .then(networkResponse => {
              return caches.open(STATIC_CACHE)
                .then(cache => {
                  cache.put(request, networkResponse.clone());
                  return networkResponse;
                });
            });
        })
        .catch(() => {
          // Fallback for images
          if (request.destination === 'image') {
            return new Response('<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f3f4f6"/><text x="50%" y="50%" text-anchor="middle" fill="#6b7280">Image not available</text></svg>', {
              headers: { 'Content-Type': 'image/svg+xml' }
            });
          }
        })
    );
    return;
  }

  // Network first strategy for pages and API calls
  event.respondWith(
    fetch(request)
      .then(networkResponse => {
        // Only cache successful responses
        if (networkResponse.status === 200) {
          return caches.open(DYNAMIC_CACHE)
            .then(cache => {
              cache.put(request, networkResponse.clone());
              return networkResponse;
            });
        }
        return networkResponse;
      })
      .catch(() => {
        // Fallback to cache if network fails
        return caches.match(request)
          .then(response => {
            if (response) {
              return response;
            }
            // Offline fallback page
            if (request.mode === 'navigate') {
              return caches.match('/');
            }
          });
      })
  );
});

// Background sync for analytics (if supported)
self.addEventListener('sync', event => {
  if (event.tag === 'analytics-sync') {
    event.waitUntil(
      // Send cached analytics data when back online
      sendCachedAnalytics()
    );
  }
});

async function sendCachedAnalytics() {
  try {
    const cache = await caches.open('analytics-cache');
    const requests = await cache.keys();
    for (const request of requests) {
      try {
        await fetch(request);
        await cache.delete(request);
      } catch (error) {
        console.log('Failed to sync analytics:', error);
      }
    }
  } catch (error) {
    console.log('Analytics sync failed:', error);
  }
}
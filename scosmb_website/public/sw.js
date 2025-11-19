const CACHE_NAME = 'sco-smb-v2';
const STATIC_CACHE = 'sco-smb-static-v2';
const DYNAMIC_CACHE = 'sco-smb-dynamic-v2';

const STATIC_ASSETS = [
  '/',
  '/manifest.webmanifest',
  '/logos/sco-smb-logo.png',
  '/logos/sco-smb-icon.png',
  '/screenshots/sco-smb-hero-dashboard.png'
];

const CACHE_STRATEGIES = {
  images: 'CacheFirst',
  scripts: 'StaleWhileRevalidate', 
  pages: 'NetworkFirst',
  static: 'CacheFirst'
};

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then((cache) => cache.addAll(STATIC_ASSETS)),
      caches.open(DYNAMIC_CACHE)
    ]).then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  const expectedCaches = [STATIC_CACHE, DYNAMIC_CACHE];
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => !expectedCaches.includes(cacheName))
            .map((cacheName) => caches.delete(cacheName))
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Skip POST requests and API routes
  if (event.request.method !== 'GET' || event.request.url.includes('/api/')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request)
          .then((fetchResponse) => {
            // Don't cache failed responses
            if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
              return fetchResponse;
            }

            // Clone the response
            const responseToCache = fetchResponse.clone();

            // Cache certain file types
            if (event.request.url.match(/\.(js|css|png|jpg|jpeg|gif|webp|svg|woff2|woff)$/)) {
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });
            }

            return fetchResponse;
          })
          .catch(() => {
            // Offline fallback
            if (event.request.destination === 'document') {
              return caches.match('/');
            }
          });
      })
  );
});

// Background sync for analytics
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Sync offline analytics data when connection is restored
  try {
    // Implementation would sync stored analytics events
    console.log('Background sync completed');
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}
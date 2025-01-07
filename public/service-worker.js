/**
 * DOCS: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
 */

const cacheName = 'v1';
const cacheAssets = ['models/the_sun.glb', 'models/the_moon.glb', 'models/van.glb'];

const isCacheableRequest = request => {
  return request.url.startsWith('http') || request.url.startsWith('https');
};

const addResourcesToCache = async resources => {
  const cache = await caches.open(cacheName);
  await cache.addAll(resources);
};

const putInCache = async (request, response) => {
  if (!isCacheableRequest(request)) return; // Avoid caching invalid schemes
  const cache = await caches.open(cacheName);
  await cache.put(request, response);
};

const cacheFirst = async ({ request, preloadResponsePromise, fallbackUrl }) => {
  // First try to get the resource from the cache
  const responseFromCache = await caches.match(request);
  if (responseFromCache) {
    return responseFromCache;
  }

  // Next try to use (and cache) the preloaded response, if it's there
  const preloadResponse = await preloadResponsePromise;
  if (preloadResponse) {
    console.info('using preload response', preloadResponse);
    putInCache(request, preloadResponse.clone());
    return preloadResponse;
  }

  // Next try to get the resource from the network
  try {
    const responseFromNetwork = await fetch(request);
    // response may be used only once
    // we need to save clone to put one copy in cache
    // and serve second one
    putInCache(request, responseFromNetwork.clone());
    return responseFromNetwork;
  } catch (error) {
    const fallbackResponse = await caches.match(fallbackUrl);
    if (fallbackResponse) {
      return fallbackResponse;
    }
    // when even the fallback response is not available,
    // there is nothing we can do, but we must always
    // return a Response object
    return new Response('Network error happened', {
      status: 408,
      headers: { 'Content-Type': 'text/plain' },
    });
  }
};

// Enable navigation preload
const enableNavigationPreload = async () => {
  if (self.registration.navigationPreload) {
    await self.registration.navigationPreload.enable();
  }
};

self.addEventListener('install', event => {
  event.waitUntil(addResourcesToCache(cacheAssets));
});

self.addEventListener('activate', event => {
  event.waitUntil(enableNavigationPreload());
});

// Handle fetch requests
self.addEventListener('fetch', event => {
  // Wait for the preload response promise to settle
  event.respondWith(
    (async () => {
      const preloadResponse = event.preloadResponse;
      const cacheableRequest = event.request;

      // Use cache-first strategy with navigation preload and fallback
      return cacheFirst({
        request: cacheableRequest,
        preloadResponsePromise: preloadResponse,
        fallbackUrl: '/gallery/myLittleVader.jpg',
      });
    })(),
  );
});

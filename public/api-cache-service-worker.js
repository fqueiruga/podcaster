/**
 * Service worker that handles the caching of the podcasts and feed data
 * 
 * Will cache up to 50 podcast feed request for 24 hours.
 * 
 * @see{@link https://github.com/GoogleChrome/sw-toolbox/blob/master/docs/recipes/cache-expiration-options/service-worker.js}
 */
(global => {
  'use strict';

  // Load the sw-toolbox library.
  importScripts('/sw-toolbox.js');

  var CACHE_AGE_APIS_SECONDS = 86400;
  var MAX_API_ENTRIES = 50;

  global.toolbox.options.debug = false;

  // Set up a handler for the iTunes API
  global.toolbox.router.get(/\.apple\.com\//, global.toolbox.cacheFirst, {
    cache: {
      name: 'podcasts',
      maxEntries: MAX_API_ENTRIES,
      maxAgeSeconds: CACHE_AGE_APIS_SECONDS
    }
  });

  // Set up a handler for the feed requests
  global.toolbox.router.get(/format=xml/, global.toolbox.cacheFirst, {
    cache: {
      name: 'feeds',
      maxEntries: MAX_API_ENTRIES,
      maxAgeSeconds: CACHE_AGE_APIS_SECONDS
    }
  });

  // By default, all requests that don't match our custom handler will use the
  // toolbox.networkFirst cache strategy
  global.toolbox.router.default = global.toolbox.networkFirst;

  // Boilerplate to ensure our service worker takes control of the page as soon
  // as possible.
  global.addEventListener('install',
      event => event.waitUntil(global.skipWaiting()));
  global.addEventListener('activate',
      event => event.waitUntil(global.clients.claim()));
})(self);
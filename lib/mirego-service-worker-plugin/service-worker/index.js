/* global workbox */

/* eslint-disable max-nested-callbacks, func-style, no-magic-numbers */

import {
  ENABLE_DEBUGGING,
  ENABLE_PAGE_CACHING,
  PRECACHE_FILES,
  APP_VERSION
} from 'mirego-service-worker-plugin/service-worker/config';

/* Warning:
    this file is compiled with Babel but doesn’t have any polyfills or
    runtime dependencies like `regeneratorRuntime` included. We should stick
    with basic JavaScript.
*/

importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js'
);

if (workbox) {
  workbox.setConfig({
    debug: ENABLE_DEBUGGING
  });

  workbox.core.setCacheNameDetails({
    prefix: 'ember-boilerplate',
    suffix: APP_VERSION
  });

  if (ENABLE_PAGE_CACHING) {
    cacheAppShell(workbox);
  }

  cacheAssets(workbox);
  cacheImages(workbox);
  cacheGoogleFonts(workbox);
  cacheExternalResources(workbox);
}

self.addEventListener('message', event => {
  switch (event.data.action) {
    case 'skipWaiting':
      self.skipWaiting();
      break;

    case 'checkForUpdates':
      self.registration.update();
      break;

    case 'unregister':
      unregister();
      break;
  }
});

function unregister() {
  self.registration
    .unregister()
    .then(() => self.clients.matchAll())
    .then(clients => {
      clients.forEach(client => {
        if (client.url && 'navigate' in client) {
          client.navigate(client.url);
        }
      });
    });
}

function cacheAppShell({precaching, routing}) {
  const indexFile = 'index.html';

  precaching.precache([
    {
      url: indexFile,
      revision: self.CACHE_BUSTER
    }
  ]);

  // We use a NavigationRoute to return the cached index.html response for all navigation requests.
  // https://developers.google.com/web/tools/workbox/modules/workbox-routing#how_to_register_a_navigation_route
  const handler = precaching.createHandlerBoundToURL(indexFile);

  const navigationRoute = new routing.NavigationRoute(handler);

  routing.registerRoute(navigationRoute);
}

function cacheAssets({precaching}) {
  precaching.cleanupOutdatedCaches();

  precaching.precacheAndRoute(
    PRECACHE_FILES.map(file => {
      return {
        url: file,
        revision: self.CACHE_BUSTER
      };
    })
  );
}

function cacheImages({routing, strategies, expiration}) {
  routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|webp|svg)$/,
    new strategies.CacheFirst({
      cacheName: 'images',
      plugins: [
        new expiration.ExpirationPlugin({
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
        })
      ]
    })
  );
}

function cacheGoogleFonts({
  routing,
  strategies,
  cacheableResponse,
  expiration
}) {
  // Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
  routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    new strategies.StaleWhileRevalidate({
      cacheName: 'google-fonts-stylesheets'
    })
  );

  // Cache the underlying font files with a cache-first strategy for 1 year.
  routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    new strategies.CacheFirst({
      cacheName: 'google-fonts-webfonts',
      plugins: [
        new cacheableResponse.CacheableResponsePlugin({
          statuses: [0, 200]
        }),
        new expiration.ExpirationPlugin({
          maxAgeSeconds: 60 * 60 * 24 * 365,
          maxEntries: 30
        })
      ]
    })
  );
}

function cacheExternalResources({routing, strategies}) {
  routing.registerRoute(
    /.*(?:googleapis|gstatic)\.com/,
    new strategies.StaleWhileRevalidate()
  );
}

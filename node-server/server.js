'use strict';

// Vendor
const FastBootAppServer = require('fastboot-app-server');
const Sentry = require('@sentry/node');
const basicAuth = require('express-basic-auth');
const config = require('../config/environment');
const compression = require('compression');
const forceSSL = require('express-force-ssl');
const forceDomain = require('forcedomain');
const cacheControl = require('express-cache-controller');

// Custom HTTP Server
const HTTPServer = require('./express-http-server');

// Middleware
const internalServerErrorMiddleware = require('./middleware/internal-server-error');
const stripTrailingSlashes = require('./middleware/strip-trailing-slashes');
const deduplicateSlashes = require('./middleware/deduplicate-slashes');

// Utils
const {asBoolean, asInteger, isPresent} = require('../config/utils');
const appPackage = require('../package.json');

// Constants
const OK_HTTP_CODE = 200;
const FORCE_SSL_OPTIONS = {trustXFPHeader: true, httpsPort: 443};
const ASSETS_MAX_AGE = 2592000; // 1 month
const BASIC_AUTH_OPTIONS = {
  users: {
    [process.env.BASIC_AUTH_USERNAME]: process.env.BASIC_AUTH_PASSWORD
  },
  challenge: true
};

// Server
const httpServer = new HTTPServer({
  afterMiddleware(app) {
    if (isPresent(process.env.SENTRY_DSN)) {
      app.use(Sentry.Handlers.errorHandler());
    }

    app.use(internalServerErrorMiddleware);
  }
});

const app = httpServer.app;

// Sentry
if (isPresent(process.env.SENTRY_DSN)) {
  Sentry.init(config(process.env.NODE_ENV).sentry);

  app.use(Sentry.Handlers.requestHandler());
}

// Health check
app.use(
  '/health',
  cacheControl({
    noCache: true,
    private: true,
    noStore: true,
    mustRevalidate: true
  })
);

app.get('/health', (_, response) => {
  response
    .status(OK_HTTP_CODE)
    .send({status: 'OK', version: appPackage.version});
});

// Canonical host
if (process.env.CANONICAL_HOST) {
  app.use(forceDomain({hostname: process.env.CANONICAL_HOST}));
}

// Force SSL
if (asBoolean(process.env.FORCE_SSL)) {
  app.set('forceSSLOptions', FORCE_SSL_OPTIONS);
  app.use(forceSSL);
}

// Basic Authentication
if (process.env.BASIC_AUTH_USERNAME && process.env.BASIC_AUTH_PASSWORD) {
  app.use(basicAuth(BASIC_AUTH_OPTIONS));
}

// Remove a few slashes
app.use(stripTrailingSlashes);
app.use(deduplicateSlashes);

// Gzip
app.use(compression());

// Cache headers
if (process.env.PAGES_CACHE_DURATION_IN_SECONDS) {
  app.use(
    cacheControl({
      maxAge: asInteger(process.env.PAGES_CACHE_DURATION_IN_SECONDS)
    })
  );
} else {
  app.use(cacheControl({noCache: true}));
}

app.use(
  ['/robots.txt', '/sitemap.xml', '/sw.js'],
  cacheControl({
    noCache: true,
    private: true,
    noStore: true,
    mustRevalidate: true
  })
);

// Assets
app.use(
  '/assets/*',
  cacheControl({
    maxAge: ASSETS_MAX_AGE
  })
);

const server = new FastBootAppServer({
  distPath: 'dist',
  workerCount: asInteger(process.env.WORKER_COUNT),
  httpServer,
  chunkedResponse: true
});

server.start();

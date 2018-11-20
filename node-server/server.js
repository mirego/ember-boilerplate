/* eslint-env node */

'use strict';

// Vendor
const FastBootAppServer = require('fastboot-app-server');
const Raven = require('raven');
const basicAuth = require('express-basic-auth');
const compression = require('compression');
const forceSSL = require('express-force-ssl');
const forceDomain = require('forcedomain');
const cacheControl = require('express-cache-controller');

// Custom HTTP Server
const HTTPServer = require('./express-http-server');

// Middleware
const internalServerErrorMiddleware = require('./middlewares/internal-server-error');

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
    if (process.env.SENTRY_SECRET_DSN) app.use(Raven.errorHandler());
    app.use(internalServerErrorMiddleware);
  }
});

const app = httpServer.app;

// Health check
app.get('/health', (_, response) => {
  response.sendStatus(OK_HTTP_CODE);
});

// Sentry
if (process.env.SENTRY_SECRET_DSN) {
  Raven.config(process.env.SENTRY_SECRET_DSN).install();
  app.use(Raven.requestHandler());
}

// Canonical host
if (process.env.CANONICAL_HOST) {
  app.use(forceDomain({hostname: process.env.CANONICAL_HOST}));
}

// Force SSL
if (process.env.FORCE_SSL === 'true' || process.env.FORCE_SSL === '1') {
  app.set('forceSSLOptions', FORCE_SSL_OPTIONS);
  app.use(forceSSL);
}

// Basic Authentication
if (process.env.BASIC_AUTH_USERNAME && process.env.BASIC_AUTH_PASSWORD) {
  app.use(basicAuth(BASIC_AUTH_OPTIONS));
}

// Gzip
app.use(compression());

// Cache headers
if (process.env.PAGES_CACHE_DURATION_IN_SECONDS) {
  app.use(
    cacheControl({
      maxAge: parseInt(process.env.PAGES_CACHE_DURATION_IN_SECONDS, 10)
    })
  );
} else {
  app.use(cacheControl({noCache: true}));
}

// Assets
app.use('/assets/*', (_, response, next) => {
  response.cacheControl = {maxAge: ASSETS_MAX_AGE};
  next();
});

const server = new FastBootAppServer({
  distPath: 'dist',
  workerCount: process.env.WORKER_COUNT,
  httpServer
});

server.start();

'use strict';

// Vendor
const FastBootAppServer = require('fastboot-app-server');
const Sentry = require('@sentry/node');
const basicAuth = require('express-basic-auth');
const config = require('../config/environment');
const compression = require('compression');
const forceSSL = require('express-force-ssl');
const {forceDomain} = require('forcedomain');
const cacheControl = require('express-cache-controller');

// Middleware
const internalServerErrorMiddleware = require('./middleware/internal-server-error');
const stripTrailingSlashes = require('./middleware/strip-trailing-slashes');
const deduplicateSlashes = require('./middleware/deduplicate-slashes');

// Utils
const {asBoolean, asInteger, isPresent} = require('../config/utils');
const appPackage = require('../package.json');

const setupSentry = app => {
  if (!isPresent(process.env.SENTRY_DSN)) return;

  Sentry.init(config(process.env.NODE_ENV).sentry);

  app.use(Sentry.Handlers.requestHandler());
};

const setupHealthCheck = app => {
  app.use(
    '/health',
    cacheControl({
      noCache: true,
      private: true,
      noStore: true,
      mustRevalidate: true,
    })
  );

  app.get('/health', (_, response) => {
    response.status(200).send({status: 'OK', version: appPackage.version});
  });
};

const setupCanonicalHost = app => {
  if (!isPresent(process.env.CANONICAL_HOST)) return;

  app.use(forceDomain({hostname: process.env.CANONICAL_HOST}));
};

const setupForceSSL = app => {
  if (!asBoolean(process.env.FORCE_SSL)) return;

  app.set('forceSSLOptions', {trustXFPHeader: true, httpsPort: 443});
  app.use(forceSSL);
};

const setupBasicAuthentication = app => {
  if (!process.env.BASIC_AUTH_USERNAME || !process.env.BASIC_AUTH_PASSWORD) return;

  app.use(
    basicAuth({
      users: {
        [process.env.BASIC_AUTH_USERNAME]: process.env.BASIC_AUTH_PASSWORD,
      },
      challenge: true,
    })
  );
};

const setupURLCorrection = app => {
  app.use(deduplicateSlashes);
  app.use(stripTrailingSlashes);
};

const setupCompression = app => {
  app.use(compression());
};

const setupCacheHeaders = app => {
  if (process.env.PAGES_CACHE_DURATION_IN_SECONDS) {
    app.use(
      cacheControl({
        maxAge: asInteger(process.env.PAGES_CACHE_DURATION_IN_SECONDS),
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
      mustRevalidate: true,
    })
  );

  app.use(
    '/assets/*',
    cacheControl({
      maxAge: 2592000, // 1 month in seconds,
    })
  );
};

const fastbootServer = new FastBootAppServer({
  distPath: 'dist',
  workerCount: asInteger(process.env.WORKER_COUNT),
  chunkedResponse: true,

  beforeMiddleware(app) {
    setupSentry(app);
    setupHealthCheck(app);
    setupCanonicalHost(app);
    setupForceSSL(app);
    setupBasicAuthentication(app);
    setupURLCorrection(app);
    setupCompression(app);
    setupCacheHeaders(app);
  },

  afterMiddleware(app) {
    // Never cache error responses
    app.use(function (req, res, next) {
      if (res.status >= 400) {
        res.cacheControl = {
          noCache: true,
        };
      }
    });

    if (isPresent(process.env.SENTRY_DSN)) {
      app.use(Sentry.Handlers.errorHandler());
    }

    app.use(internalServerErrorMiddleware);
  },
});

fastbootServer.start();

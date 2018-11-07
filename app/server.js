/* eslint-env node */

'use strict';

// Vendor
const FastBootAppServer = require('fastboot-app-server');
const ExpressHTTPServer = require('fastboot-app-server/src/express-http-server');
const Raven = require('raven');
const basicAuth = require('express-basic-auth');
const compression = require('compression');
const forceSSL = require('express-force-ssl');
const forceDomain = require('forcedomain');

// Constants
const INTERNAL_SERVER_ERROR_STATUS_CODE = 500;
const FORCE_SSL_OPTIONS = {trustXFPHeader: true, httpsPort: 443};
const BASIC_AUTH_OPTIONS = {
  users: {
    [process.env.BASIC_AUTH_USERNAME]: process.env.BASIC_AUTH_PASSWORD
  },
  challenge: true
};

const INTERNAL_SERVER_ERROR_HANDLER = (_error, _request, response, next) => {
  if (response.statusCode !== INTERNAL_SERVER_ERROR_STATUS_CODE) return next();

  response.writeHead(response.statusCode, {
    'Content-Type': 'text/html; charset=UTF-8'
  });
  response.end('Internal server error');
};

// Server
const httpServer = new ExpressHTTPServer({
  afterMiddleware(app) {
    if (process.env.SENTRY_SECRET_DSN) app.use(Raven.errorHandler());
    app.use(INTERNAL_SERVER_ERROR_HANDLER);
  }
});

const app = httpServer.app;

if (process.env.SENTRY_SECRET_DSN) {
  Raven.config(process.env.SENTRY_SECRET_DSN).install();
  app.use(Raven.requestHandler());
}

if (process.env.CANONICAL_HOST) {
  app.use(forceDomain({hostname: process.env.CANONICAL_HOST}));
}

if (process.env.FORCE_SSL) {
  app.set('forceSSLOptions', FORCE_SSL_OPTIONS);
  app.use(forceSSL);
}

if (process.env.BASIC_AUTH_USERNAME && process.env.BASIC_AUTH_PASSWORD) {
  app.use(basicAuth(BASIC_AUTH_OPTIONS));
}

app.use(compression());

const server = new FastBootAppServer({
  distPath: 'dist',
  gzip: true,
  workerCount: process.env.WORKER_COUNT,
  httpServer
});

server.start();

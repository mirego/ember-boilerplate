/* eslint-env node */
const FastBootAppServer = require('fastboot-app-server');
const basicAuth = require('express-basic-auth');
const forceSSL = require('express-force-ssl');
const forceDomain = require('forcedomain');

const FORCE_SSL_OPTIONS = {trustXFPHeader: true, httpsPort: 443};
const BASIC_AUTH_OPTIONS = {
  users: {
    [process.env.BASIC_AUTH_USERNAME]: process.env.BASIC_AUTH_PASSWORD
  },
  challenge: true
};

const SERVER_OPTIONS = {
  distPath: 'dist',
  gzip: true,
  beforeMiddleware(app) {
    if (process.env.FORCE_SSL) {
      app.set('forceSSLOptions', FORCE_SSL_OPTIONS);
      app.use(forceSSL);
    }

    if (process.env.BASIC_AUTH_USERNAME && process.env.BASIC_AUTH_PASSWORD) {
      app.use(basicAuth(BASIC_AUTH_OPTIONS));
    }

    if (process.env.CANONICAL_HOST) {
      app.use(forceDomain({hostname: process.env.CANONICAL_HOST}));
    }
  }
};

new FastBootAppServer(SERVER_OPTIONS).start();

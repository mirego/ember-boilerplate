/* eslint-env node */

'use strict';

const PACKAGE = require('../package.json');

// This function is used to build an `ENV` variable from environment variables
// when running `ember build`. This variable will be injected into the browser
// running the application and used by the server-side process that renders
// FastBoot responses.
//
// Therefore, it MUST NOT be used to store secret keys and values.
module.exports = function(environment) {
  const ENV = {
    modulePrefix: 'ember-boilerplate',
    podModulePrefix: 'ember-boilerplate/pods',
    environment,
    rootURL: '/',
    locationType: 'auto',
    fastboot: {
      fastbootHeaders: true
    }
  };

  ENV.EmberENV = {
    FEATURES: {},
    LOG_VERSION: false,
    EXTEND_PROTOTYPES: false
  };

  ENV.APP = {
    version: PACKAGE.version
  };

  ENV.apollo = {
    apiURL: `${process.env.API_BASE_URL}${process.env.API_GRAPHQL_PATH}`,
    SSR_CACHE_KEY: 'apollo-cache'
  };

  ENV.contentSecurityPolicy = {
    'default-src': "'none'",
    'form-action': "'self'",
    'media-src': "'self'",
    'img-src': ["'self'", 'data:'],
    'script-src': ["'self'", "'unsafe-inline'"],
    // Allow fonts to be loaded from fonts.gstatic.com
    'font-src': ["'self'", 'fonts.gstatic.com'],
    // Allow data (ajax/websocket)
    'connect-src': [
      "'self'",
      'https://www.googleapis.com',
      'https://sentry.io',
      process.env.API_BASE_URL
    ],
    // Allow inline styles and loaded CSS from fonts.googleapis.com
    'style-src': ["'self'", "'unsafe-inline'", 'fonts.googleapis.com']
  };

  ENV.sentry = {
    dsn: process.env.SENTRY_DSN,
    // If set to true, it will prevent Raven.js from being initialized.
    // Errors and logs will be logged to the console (default) instead of
    // being reported by Raven.
    development: !process.env.SENTRY_DSN
  };

  if (environment === 'test') {
    ENV.locationType = 'none';

    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;

    ENV.apollo = {
      apiURL: 'graphql://fake/endpoint',
      SSR_CACHE_KEY: 'test-apollo-cache'
    };
  }

  return ENV;
};

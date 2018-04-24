/* eslint-env node */

'use strict';

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

  ENV.APP = {};

  ENV.apollo = {
    apiURL: `${process.env.API_BASE_URL}${process.env.API_GRAPHQL_PATH}`
  };

  ENV.contentSecurityPolicy = {
    'default-src': "'none'",
    'form-action': "'self'",
    'media-src': "'self'",
    'img-src': [
      "'self'",
      'data:'
    ],
    'script-src': [
      "'self'",
      "'unsafe-inline'"
    ],
    // Allow fonts to be loaded from fonts.gstatic.com
    'font-src': [
      "'self'",
      'fonts.gstatic.com'
    ],
    // Allow data (ajax/websocket)
    'connect-src': [
      "'self'",
      'https://www.googleapis.com',
      'https://sentry.io',
      process.env.API_BASE_URL
    ],
    // Allow inline styles and loaded CSS from fonts.googleapis.com
    'style-src': [
      "'self'",
      "'unsafe-inline'",
      'fonts.googleapis.com'
    ]
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
  }

  return ENV;
};

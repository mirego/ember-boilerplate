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

  ENV.API = {
    BASE_URL: process.env.API_BASE_URL,
    GRAPHQL_PATH: process.env.API_GRAPHQL_PATH
  };

  ENV.sentry = {
    dsn: process.env.SENTRY_DSN,
    // If set to true, it will prevent Raven.js from being initialized.
    // Errors and logs will be logged to the console (default) instead of
    // being reported by Raven.
    development: !process.env.SENTRY_DSN
  };

  ENV.i18n = {
    defaultLocale: 'en'
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
      ENV.API.BASE_URL
    ],
    // Allow inline styles and loaded CSS from fonts.googleapis.com
    'style-src': [
      "'self'",
      "'unsafe-inline'",
      'fonts.googleapis.com'
    ]
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

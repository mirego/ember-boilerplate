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

  ENV.i18n = {
    defaultLocale: 'en'
  };

  ENV.APP = {};

  ENV.API = {
    HOST: process.env.API_HOST,
    GRAPHQL_PATH: process.env.GRAPHQL_PATH,
    JSON_API_PATH: process.env.JSON_API_PATH
  };

  ENV.SENTRY = {
    DSN: process.env.SENTRY_DSN
  };

  ENV.contentSecurityPolicy = {
    'default-src': "'none'",
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
      ENV.API.HOST
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
  }

  return ENV;
};

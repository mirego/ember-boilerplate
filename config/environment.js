/* eslint-env node */

'use strict';

const PACKAGE = require('../package.json');

// This function is used to build an `ENV` variable from environment variables
// when running `ember build`. This variable will be injected into the browser
// running the application and used by the server-side process that renders
// FastBoot responses.
//
// Therefore, it MUST NOT be used to store secret keys and values.
//
// eslint-disable-next-line complexity
module.exports = function(environment) {
  const ENV = {
    modulePrefix: 'ember-boilerplate',
    podModulePrefix: 'ember-boilerplate/pods',
    environment,
    rootURL: '/',
    locationType: 'auto'
  };

  ENV.EmberENV = {
    LOG_VERSION: false,
    EXTEND_PROTOTYPES: false
  };

  ENV.APP = {
    FORCE_SSL:
      process.env.FORCE_SSL === 'true' || process.env.FORCE_SSL === '1',
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
    'img-src': ["'self'", 'data:', 'https://*.nr-data.net'],
    'script-src':
      environment === 'production'
        ? ["'self'", 'https://*.newrelic.com', 'https://*.nr-data.net']
        : ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
    'font-src': ["'self'", 'fonts.gstatic.com'],
    'connect-src': [
      "'self'",
      'https://www.googleapis.com',
      'https://sentry.io',
      'https://*.nr-data.net',
      process.env.API_BASE_URL
    ],
    // Allow inline styles and loaded CSS from fonts.googleapis.com
    'style-src': ["'self'", "'unsafe-inline'", 'fonts.googleapis.com']
  };

  let currentHostname = process.env.CANONICAL_HOST;

  if (process.env.PORT) {
    currentHostname += `:${process.env.PORT}`;
  }

  ENV.fastboot = {
    fastbootHeaders: true,
    hostWhitelist: [currentHostname]
  };

  ENV.intl = {
    ASYNC_TRANSLATIONS: process.env.ASYNC_TRANSLATIONS
  };

  if (
    process.env.NEW_RELIC_APPLICATION_ID &&
    process.env.NEW_RELIC_LICENSE_KEY
  ) {
    ENV.newRelic = {
      applicationId: process.env.NEW_RELIC_APPLICATION_ID,
      licenseKey: process.env.NEW_RELIC_LICENSE_KEY
    };
  }

  ENV.sentry = {
    dsn: process.env.SENTRY_DSN,
    whitelistUrls: [process.env.ASSETS_CDN_HOST || process.env.CANONICAL_HOST],
    // If set to true, it will prevent Raven.js from being initialized.
    // Errors and logs will be logged to the console (default) instead of
    // being reported by Raven.
    development: !process.env.SENTRY_DSN
  };

  if (environment === 'test') {
    ENV.locationType = 'none';

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;

    ENV.apollo = {
      apiURL: 'graphql://fake/endpoint',
      SSR_CACHE_KEY: 'test-apollo-cache'
    };

    ENV.fastboot = {
      fastbootHeaders: true,
      hostWhitelist: [/.*/]
    };
  }

  return ENV;
};

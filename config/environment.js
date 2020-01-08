'use strict';

const appPackage = require('../package.json');
const {asArray, asBoolean, isPresent} = require('./utils');

// This function is used to build an `ENV` variable from environment variables
// when running `ember build`. This variable will be injected into the browser
// running the application and used by the server-side process that renders
// FastBoot responses.
//
// Therefore, it MUST NOT be used to store secret keys and values.

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
    EXTEND_PROTOTYPES: false,
    FEATURES: {
      EMBER_METAL_TRACKED_PROPERTIES: true
    }
  };

  ENV.APP = {
    ALLOW_SITE_INDEXATION: asBoolean(process.env.ALLOW_SITE_INDEXATION),
    VERSION: appPackage.version
  };

  ENV.apollo = {
    API_URL: `${process.env.API_BASE_URL}${process.env.API_GRAPHQL_PATH}`,
    SSR_CACHE_KEY: 'apollo-cache'
  };

  let scriptSources = ["'self'"];

  if (environment !== 'production') {
    scriptSources = ["'unsafe-inline'", "'unsafe-eval'", ...scriptSources];
  }

  ENV.contentSecurityPolicy = {
    'default-src': "'none'",
    'form-action': "'self'",
    'media-src': "'self'",
    'img-src': ["'self'", 'data:'],
    'script-src': scriptSources,
    'font-src': ["'self'"],
    'connect-src': ["'self'", 'https://sentry.io', process.env.API_BASE_URL],
    'style-src': ["'self'"]
  };

  ENV.fastboot = {
    fastbootHeaders: true,
    hostWhitelist: process.env.CANONICAL_HOST
      ? [process.env.CANONICAL_HOST]
      : []
  };

  ENV.intl = {
    ASYNC_TRANSLATIONS: asBoolean(process.env.ASYNC_TRANSLATIONS),
    LOCALES: asArray(process.env.LOCALES),
    TRANSLATIONS_CACHE_KEY: 'translations'
  };

  ENV.sentry = {
    enabled: isPresent(process.env.SENTRY_DSN),
    dsn: process.env.SENTRY_DSN,
    environment: process.env.SENTRY_ENVIRONMENT_NAME,
    release: appPackage.version,
    whitelistUrls: [
      process.env.ASSETS_CDN_PROTOCOL && process.env.ASSETS_CDN_HOST
        ? `${process.env.ASSETS_CDN_PROTOCOL}://${process.env.ASSETS_CDN_HOST}`
        : process.env.CANONICAL_HOST
    ],
    debug: process.env.NODE_ENV !== 'production'
  };

  if (environment === 'test') {
    ENV.locationType = 'none';

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;

    ENV.apollo = {
      API_URL: 'graphql://fake/endpoint',
      SSR_CACHE_KEY: 'test-apollo-cache'
    };

    ENV.fastboot = {
      fastbootHeaders: true,
      hostWhitelist: [/.*/]
    };

    ENV.intl.ASYNC_TRANSLATIONS = false;
    ENV.intl.LOCALES = ['en-ca'];
  }

  return ENV;
};

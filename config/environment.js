/* eslint-env node */

'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'ember-boilerplate',
    podModulePrefix: 'ember-boilerplate/pods',
    environment,
    baseURL: '/',
    locationType: 'auto'
  };

  ENV.EmberENV = {
    FEATURES: {},
    LOG_VERSION: false
  };

  ENV.APP = {};

  ENV.API = {
    HOST: process.env.API_HOST,
    NAMESPACE: process.env.API_NAMESPACE
  };

  ENV.contentSecurityPolicy = {
    'default-src': "'none'",
    'script-src': "'self' 'unsafe-inline'",
    // Allow fonts to be loaded from http://fonts.gstatic.com
    'font-src': "'self' http://fonts.gstatic.com",
    // Allow data (ajax/websocket)
    'connect-src': `'self' https://www.googleapis.com ${ENV.API.HOST}`,
    'img-src': '*',
    // Allow inline styles and loaded CSS from http://fonts.googleapis.com
    'style-src': "'self' 'unsafe-inline' http://fonts.googleapis.com",
    'media-src': "'self'"
  };

  if (environment === 'test') {
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  return ENV;
};

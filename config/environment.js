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
    FEATURES: {
      'ember-htmlbars-component-generation': true
    },
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
    // Allow fonts to be loaded from fonts.gstatic.com
    'font-src': "'self' fonts.gstatic.com",
    // Allow data (ajax/websocket)
    'connect-src': `'self' https://www.googleapis.com ${ENV.API.HOST}`,
    'img-src': '*',
    // Allow inline styles and loaded CSS from fonts.googleapis.com
    'style-src': "'self' 'unsafe-inline' fonts.googleapis.com",
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

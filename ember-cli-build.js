/* eslint-env node */

'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const targets = require('./config/targets');

const IS_TEST_ENVIRONMENT = EmberApp.env() === 'test';

const buildFingerPrintPrepend = ({
  ASSETS_CDN_HOST,
  ASSETS_CDN_PROTOCOL,
  ASSETS_CDN_PATH
}) => {
  if (!ASSETS_CDN_HOST || !ASSETS_CDN_PROTOCOL) return '';
  return `${ASSETS_CDN_PROTOCOL}://${ASSETS_CDN_HOST}/${ASSETS_CDN_PATH}`;
};

module.exports = function(defaults) {
  const app = new EmberApp(defaults, {
    hinting: false,
    tests: IS_TEST_ENVIRONMENT,

    autoImport: {
      exclude: ['apollo-client', 'apollo-link-http']
    },

    // Dependencies
    apollo: {
      exclude: [
        'apollo-cache',
        'apollo-cache-inmemory',
        'apollo-link',
        'apollo-link-context',
        'graphql',
        'graphql-tag',
        'graphql-tools'
      ]
    },

    vendorFiles: {
      'jquery.js': null
    },

    // SCSS compilation
    autoprefixer: {
      browsers: targets.browsers,
      sourcemap: false
    },

    cssModules: {
      intermediateOutputPath: 'app/styles/app.scss',
      extension: 'scss',
      postcssOptions: {
        syntax: require('postcss-scss')
      }
    },

    // JavaScript compilation
    babel: {
      plugins: ['transform-object-rest-spread', 'graphql-tag']
    },

    'ember-cli-babel': {
      includePolyfill: true
    },

    sourcemaps: {
      enabled: !IS_TEST_ENVIRONMENT
    },

    // Fingerprinting
    fingerprint: {
      extensions: ['js', 'css', 'png', 'jpg', 'gif', 'map', 'svg'],
      generateAssetMap: true,
      prepend: buildFingerPrintPrepend(process.env)
    },

    // Inline SVGs
    svg: {
      paths: ['public/assets/inline-svgs']
    }
  });

  app.import('node_modules/simple-css-reset/reset.css');

  return app.toTree();
};

'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const browsers = require('./config/supported-browsers');

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
    'hinting': false,
    'storeConfigInMeta': false,
    'tests': IS_TEST_ENVIRONMENT,

    'autoImport': {
      exclude: ['graphql-tag']
    },

    'autoprefixer': {
      browsers: [...browsers.legacy, ...browsers.evergreen],
      sourcemap: false
    },

    'babel': {
      plugins: ['graphql-tag', require('ember-auto-import/babel-plugin')],
      sourceMaps: 'inline'
    },

    'cssModules': {
      intermediateOutputPath: 'app/styles/app.scss',
      extension: 'scss',
      postcssOptions: {
        syntax: require('postcss-scss')
      }
    },

    'emberApolloClient': {
      keepGraphqlFileExtension: true
    },

    'ember-cli-babel-polyfills': {
      evergreenTargets: browsers.evergreen,
      legacyTargets: ['node 10.16', ...browsers.legacy]
    },

    'ember-fetch': {
      preferNative: true
    },

    'ember-service-worker': {
      enabled: process.env.ENABLE_SERVICE_WORKER,
      // We want to handle when to update the service worker ourselves,
      // this makes sure to not claim all the clients as soon as the
      // worker gets an update
      immediateClaim: false,
      // Version service-worker and cached assets with every app version
      // (defined in package.json)
      versionStrategy: 'project-version',
      registrationStrategy: 'inline'
    },

    'fingerprint': {
      extensions: ['js', 'css', 'png', 'jpg', 'gif', 'map', 'svg'],
      generateAssetMap: true,
      prepend: buildFingerPrintPrepend(process.env)
    },

    'sourcemaps': {
      enabled: true,
      extensions: ['js']
    },

    'svg': {
      paths: ['public/assets/inline-svgs']
    }
  });

  app.import('node_modules/simple-css-reset/reset.css');
  app.import('node_modules/focus-visible/dist/focus-visible.js');

  return app.toTree();
};

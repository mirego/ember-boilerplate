'use strict';

const {Webpack} = require('@embroider/webpack');
const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const nodeSass = require('node-sass');
const browsers = require('./config/targets').browsers;
const {asBoolean} = require('./config/utils');

const IS_TEST_ENVIRONMENT = EmberApp.env() === 'test';
const IS_PRODUCTION_ENVIRONMENT = EmberApp.env() === 'production';

const buildFingerPrintPrepend = ({ASSETS_CDN_HOST, ASSETS_CDN_PROTOCOL, ASSETS_CDN_PATH}) => {
  if (!ASSETS_CDN_HOST || !ASSETS_CDN_PROTOCOL) return '';

  return `${ASSETS_CDN_PROTOCOL}://${ASSETS_CDN_HOST}/${ASSETS_CDN_PATH}/`;
};

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    'hinting': false,
    'tests': IS_TEST_ENVIRONMENT,

    'autoImport': {
      exclude: ['graphql-tag'],
    },

    'autoprefixer': {
      sourcemap: false,
      overrideBrowserslist: [...browsers],
    },

    'babel': {
      plugins: [require('ember-auto-import/babel-plugin')],
      sourceMaps: 'inline',
    },

    'cssModules': {
      intermediateOutputPath: 'app/styles/app.scss',
      extension: 'scss',
      postcssOptions: {
        syntax: require('postcss-scss'),
      },
    },

    'emberApolloClient': {
      keepGraphqlFileExtension: true,
    },

    'ember-fetch': {
      preferNative: true,
    },

    'ember-service-worker': {
      enabled: !IS_TEST_ENVIRONMENT && asBoolean(process.env.SERVICE_WORKER_ENABLED),
      // We want to handle when to update the service worker ourselves,
      // this makes sure to not claim all the clients as soon as the
      // worker gets an update
      immediateClaim: false,
      // Version service-worker and cached assets with every app version
      // (defined in package.json) in production
      versionStrategy: IS_PRODUCTION_ENVIRONMENT ? 'project-version' : 'every-build',
      registrationStrategy: 'inline',
    },

    'mirego-service-worker-plugin': {
      enableDebugging: asBoolean(process.env.SERVICE_WORKER_ENABLE_DEBUGGING),
      enablePageCaching: asBoolean(process.env.SERVICE_WORKER_ENABLE_PAGE_CACHING),
      precacheExtensions: ['js', 'css', 'map', 'ico', 'svg', 'eot', 'ttf', 'woff', 'woff2'],
    },

    'fingerprint': {
      extensions: ['js', 'css', 'png', 'jpg', 'gif', 'map', 'svg'],
      generateAssetMap: true,
    },

    'sassOptions': {
      implementation: nodeSass,
    },

    'sourcemaps': {
      enabled: true,
      extensions: ['js'],
    },

    'svg': {
      paths: ['public/assets/inline-svgs'],
    },
  });

  app.import('node_modules/simple-css-reset/reset.css');
  app.import('node_modules/focus-visible/dist/focus-visible.js');

  return require('@embroider/compat').compatBuild(app, Webpack, {
    staticAddonTestSupportTrees: true,
    staticAddonTrees: true,
    staticHelpers: true,
    staticComponents: true,
    splitAtRoutes: [],

    packagerOptions: {
      publicAssetURL: buildFingerPrintPrepend(process.env),

      webpackConfig: {
        module: {
          rules: [
            {
              test: /\.(graphql|gql)$/,
              use: 'graphql-tag/loader',
            },
          ],
        },
      },
    },
  });
};

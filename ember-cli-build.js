/* eslint-env node */

'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

const buildFingerPrintPrepend = ({ASSETS_CDN_HOST, ASSETS_CDN_PROTOCOL, ASSETS_CDN_PATH}) => {
  if (!ASSETS_CDN_HOST || !ASSETS_CDN_PROTOCOL) return '';
  return `${ASSETS_CDN_PROTOCOL}://${ASSETS_CDN_HOST}/${ASSETS_CDN_PATH}`;
};

module.exports = function(defaults) {
  const app = new EmberApp(defaults, {
    hinting: false,
    'ember-cli-webpack-imports': {
      expose: [
        'apollo-client',
        'apollo-link',
        'apollo-link-http',
        'apollo-cache-inmemory',
        'graphql',
        'raven-js'
      ]
    },
    autoprefixer: {
      browsers: [
        'ie >= 11',
        'last 2 Edge versions',
        'last 2 Chrome versions',
        'last 2 Firefox versions',
        'last 2 Safari versions'
      ]
    },
    babel: {
      plugins: [
        'transform-object-rest-spread'
      ]
    },
    cssModules: {
      // Emit a combined SCSS file for ember-cli-sass to compile
      intermediateOutputPath: 'app/styles/app.scss',

      // Use .scss as the extension for CSS modules instead of the default .css
      extension: 'scss',

      // Pass a custom parser/stringifyer through to PostCSS for processing modules
      postcssOptions: {
        syntax: require('postcss-scss')
      }
    },
    'ember-cli-babel': {
      includePolyfill: true
    },
    fingerprint: {
      extensions: ['js', 'css', 'png', 'jpg', 'gif', 'map', 'svg'],
      generateAssetMap: true,
      prepend: buildFingerPrintPrepend(process.env)
    },
    nodeAssets: {
      'simple-css-reset': {
        import: ['reset.css']
      }
    },
    svg: {
      paths: [
        'public/assets/inline-svgs'
      ]
    }
  });

  return app.toTree();
};

/* eslint-env node */

'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  const app = new EmberApp(defaults, {
    hinting: false,
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
    'ember-cli-babel': {
      includePolyfill: true
    },
    nodeAssets: {
      'simple-css-reset': {
        import: ['reset.css']
      }
    },
    fingerprint: {
      extensions: ['js', 'css', 'png', 'jpg', 'gif', 'map', 'svg'],
      generateAssetMap: true
    }
  });

  return app.toTree();
};

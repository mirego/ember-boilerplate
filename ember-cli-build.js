/* eslint-env node */

'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  const app = new EmberApp(defaults, {
    hinting: false,
    autoprefixer: {
      browsers: [
        'ie >= 10',
        'last 2 versions'
      ]
    },
    'ember-cli-babel': {
      includePolyfill: true
    },
    nodeAssets: {
      'simple-css-reset': {
        import: ['reset.css']
      }
    }
  });

  return app.toTree();
};

/* eslint-env node */

'use strict';

const Funnel = require('broccoli-funnel');
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  const app = new EmberApp(defaults, {
    hinting: false,
    autoprefixer: {
      browsers: [
        'ie >= 10',
        'safari >= 7',
        'last 2 versions',
        'ios >= 7'
      ]
    },
    babel: {
      includePolyfill: true
    }
  });

  const simpleCSSResetTree = new Funnel('bower_components/simple-css-reset/reset.css', {
    destDir: 'assets/vendor.css'
  });

  return app.toTree([simpleCSSResetTree]);
};

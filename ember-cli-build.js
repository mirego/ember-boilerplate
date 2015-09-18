/* eslint no-var:0 */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    hinting: false
  });

  app.import('bower_components/simple-css-reset/reset.css');

  return app.toTree();
};

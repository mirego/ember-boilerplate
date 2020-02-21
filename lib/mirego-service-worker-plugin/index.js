'use strict';

var mergeTrees = require('broccoli-merge-trees');
var Config = require('./lib/config');

module.exports = {
  name: 'mirego-service-worker-plugin',

  included(app) {
    this._super.included && this._super.included.apply(this, arguments);

    this.app = app;
    this.app.options = this.app.options || {};

    this.app.options['mirego-service-worker-plugin'] =
      this.app.options['mirego-service-worker-plugin'] || {};

    this.app.options[
      'mirego-service-worker-plugin'
    ].appVersion = this.app.project.pkg.version;
  },

  treeForServiceWorker(serviceWorkerTree, appTree) {
    var options = this.app.options['mirego-service-worker-plugin'];
    var configTree = new Config([appTree], options);

    return mergeTrees([serviceWorkerTree, configTree]);
  }
};

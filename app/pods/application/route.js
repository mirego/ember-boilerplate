import Ember from 'ember';
import Raven from 'npm:raven-js';
import config from 'ember-boilerplate/config/environment';

export default Ember.Route.extend({
  beforeModel() {
    if (!config.SENTRY.DSN) return;
    Raven.config(config.SENTRY.DSN).install();
  }
});

import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

const {modulePrefix, podModulePrefix} = config;
const App = Ember.Application.extend({
  modulePrefix,
  podModulePrefix,
  Resolver
});

loadInitializers(App, modulePrefix);

export default App;

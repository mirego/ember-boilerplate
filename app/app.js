import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

Ember.MODEL_FACTORY_INJECTIONS = true;

let {modulePrefix, podModulePrefix} = config;
let App = Ember.Application.extend({modulePrefix, podModulePrefix, Resolver});

loadInitializers(App, modulePrefix);

export default App;

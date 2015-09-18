import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

let App;

Ember.MODEL_FACTORY_INJECTIONS = true;

let modulePrefix = config.modulePrefix;
let podModulePrefix = config.podModulePrefix;

App = Ember.Application.extend({modulePrefix, podModulePrefix, Resolver});

loadInitializers(App, config.modulePrefix);

export default App;

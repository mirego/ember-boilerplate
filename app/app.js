import Application from '@ember/application';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

const {modulePrefix, podModulePrefix} = config;

export default class App extends Application {
  modulePrefix = modulePrefix;
  podModulePrefix = podModulePrefix;
  Resolver = Resolver;
}

loadInitializers(App, modulePrefix);

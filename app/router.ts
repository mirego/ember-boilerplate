import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('welcome', {path: '/'});

  // Catch-all error page, put your routes above this one
  this.route('not-found', {path: '/*path'});
});

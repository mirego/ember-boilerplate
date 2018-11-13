import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  // Catch-all error page, put your routes above this one
  this.route('not-found', {path: '/*path'});
});

export default Router;

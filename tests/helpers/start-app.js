import Ember from 'ember';
import Application from '../../app';
import config from '../../config/environment';

const startApp = (attrs) => {
  let application;

  // Use defaults, but you can override
  const attributes = Ember.assign({}, config.APP, attrs);

  Ember.run(() => {
    application = Application.create(attributes);
    application.setupForTesting();
    application.injectTestHelpers();
  });

  return application;
};

export default startApp;

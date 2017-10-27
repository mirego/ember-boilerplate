import {run} from '@ember/runloop';
import {assign} from '@ember/polyfills';
import Application from '../../app';
import config from '../../config/environment';

const startApp = (attrs) => {
  let application;

  // Use defaults, but you can override
  const attributes = assign({}, config.APP, attrs);

  run(() => {
    application = Application.create(attributes);
    application.setupForTesting();
    application.injectTestHelpers();
  });

  return application;
};

export default startApp;

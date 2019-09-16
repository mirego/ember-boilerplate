import * as Sentry from '@sentry/browser';
import {Ember} from '@sentry/integrations/esm/ember';
import config from 'ember-boilerplate/config/environment';

export const initialize = () => {
  Sentry.init({
    ...config.sentry,
    integrations: [new Ember()],

    beforeSend(event, hint) {
      const error = hint && hint.originalException;

      if (typeof error !== 'object') return event;

      if (error && error.name === 'TransitionAborted') {
        return null;
      }

      return event;
    }
  });
};

export default {
  initialize
};

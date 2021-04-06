import {InitSentryForEmber} from '@sentry/ember';
import {Event, EventHint} from '@sentry/types';

export const initialize = () => {
  InitSentryForEmber({
    beforeSend(event: Event, hint: EventHint) {
      const error = hint?.originalException;

      if (typeof error !== 'object') return event;

      if (error?.name === 'TransitionAborted' || error?.name === 'TaskCancelation') {
        return null;
      }

      return event;
    },
  });
};

export default {
  initialize,
};

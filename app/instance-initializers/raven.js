import Raven from 'npm:raven-js';
import config from 'ember-boilerplate/config/environment';

export const initialize = (application) => {
  // FastBoot supports not yet present, work in progress for 3.0.0
  if (typeof FastBoot !== 'undefined') return;

  if (!config.SENTRY.DSN) return;
  Raven.config(config.SENTRY.DSN).install();

  const lookupName = 'service:raven';
  const service = application.lookup ? application.lookup(lookupName) : application.container.lookup(lookupName);
  service.enableGlobalErrorCatching();
};

export default {
  name: 'raven-setup',
  initialize
};

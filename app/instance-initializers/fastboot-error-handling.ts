/* istanbul ignore file */

// Vendor
import Ember from 'ember';

// Types
import ApplicationInstance from '@ember/application/instance';
import FastBoot from 'ember-cli-fastboot/services/fastboot';

const INTERNAL_ERROR_STATUS = 500;

export const initialize = (application: ApplicationInstance): void => {
  Ember.onerror = () => {
    const fastboot: FastBoot = application.lookup('service:fastboot');

    if (fastboot.isFastBoot) {
      fastboot.response.statusCode = INTERNAL_ERROR_STATUS;
    }
  };
};

export default {
  initialize,
  name: 'fastboot-error-handling'
};

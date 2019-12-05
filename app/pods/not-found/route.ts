// Vendor
import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';

// Types
import FastBoot from 'ember-cli-fastboot/services/fastboot';

export default class NotFound extends Route {
  @service('fastboot')
  fastboot: FastBoot;

  beforeModel() {
    if (!this.fastboot.isFastBoot) return;

    this.fastboot.response.statusCode = 404;
  }
}

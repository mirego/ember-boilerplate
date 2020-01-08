// Vendor
import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';

// Types
import FastBoot from 'ember-cli-fastboot/services/fastboot';

export default class NotFound extends Route {
  @service('fastboot')
  fastboot: FastBoot;

  // eslint-disable-next-line @typescript-eslint/require-await
  async beforeModel() {
    if (!this.fastboot.isFastBoot) return;

    this.fastboot.response.statusCode = 404;
  }
}

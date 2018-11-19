// Vendor
import {service} from '@ember-decorators/service';
import Service from '@ember/service';
import window from 'ember-window-mock';

// Types
import FastBoot from 'ember-cli-fastboot/services/fastboot';

// Config
import config from 'ember-boilerplate/config/environment';

export default class AppUrlBuilder extends Service {
  @service('fastboot')
  fastboot!: FastBoot;

  build(path: string = '/'): string {
    if (!this.fastboot.isFastBoot) {
      return `${window.location.protocol}//${window.location.host}${path}`;
    }

    const request = this.fastboot.request;

    // NOTE: On Heroku, `request.get('protocol')` returns `"http:"`
    // even if it’s an HTTPS request, so we can’t use it.
    const protocol = config.APP.FORCE_SSL ? 'https:' : 'http:';

    return `${protocol}//${request.host}${path}`;
  }
}

declare module '@ember/service' {
  interface Registry {
    'app-url/builder': AppUrlBuilder;
  }
}

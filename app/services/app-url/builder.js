// Vendor
import Service from '@ember/service';
import {service} from '@ember-decorators/service';
import window from 'ember-window-mock';

// Config
import config from 'ember-boilerplate/config/environment';

export default class AppUrlBuilder extends Service {
  @service('fastboot') fastboot;

  build(path = '/') {
    if (!this.get('fastboot.isFastBoot')) {
      return `${window.location.protocol}//${window.location.host}${path}`;
    }

    const request = this.get('fastboot.request');

    // NOTE: On Heroku, `request.get('protocol')` returns `"http:"`
    // even if it’s an HTTPS request, so we can’t use it.
    const protocol = config.APP.FORCE_SSL ? 'https:' : 'http:';

    return `${protocol}//${request.get('host')}${path}`;
  }
}

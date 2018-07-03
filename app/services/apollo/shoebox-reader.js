// Vendor
import Service from '@ember/service';
import {service} from '@ember-decorators/service';

// Config
import config from 'ember-boilerplate/config/environment';

export default class ShoeboxReader extends Service {
  @service('fastboot') fastboot;

  read() {
    if (this.fastboot.isFastBoot) return;

    const cachedContent = this.fastboot.shoebox.retrieve(
      config.apollo.SSR_CACHE_KEY
    );

    try {
      return JSON.parse(cachedContent || '{}');
    } catch (_error) {
      return {};
    }
  }
}

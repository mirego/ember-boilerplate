// Vendor
import Service from '@ember/service';
import {service} from '@ember-decorators/service';

// Config
import config from 'ember-boilerplate/config/environment';

export default class ShoeboxWriter extends Service {
  @service('apollo') apollo;
  @service('fastboot') fastboot;

  write() {
    if (!this.fastboot.isFastBoot) return;

    const cache = JSON.stringify(this.apollo.cache.extract());

    this.fastboot.shoebox.put(config.apollo.SSR_CACHE_KEY, cache);
  }
}

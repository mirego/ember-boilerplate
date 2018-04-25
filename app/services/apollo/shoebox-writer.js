// Vendor
import Service, {inject as service} from '@ember/service';

// Config
import config from 'ember-boilerplate/config/environment';

export default Service.extend({
  apollo: service('apollo'),
  fastboot: service('fastboot'),

  write() {
    if (!this.fastboot.isFastBoot) return;

    const cache = JSON.stringify(this.apollo.cache.extract());

    this.fastboot.shoebox.put(config.apollo.SSR_CACHE_KEY, cache);
  }
});

// Vendor
import Service, {inject as service} from '@ember/service';

// Config
import config from 'ember-boilerplate/config/environment';

export default Service.extend({
  fastboot: service('fastboot'),

  read() {
    if (this.fastboot.isFastBoot) return;

    const cachedContent = this.fastboot.shoebox.retrieve(config.apollo.SSR_CACHE_KEY);

    try {
      return JSON.parse(cachedContent || '{}');
    } catch (_error) {
      return {};
    }
  }
});

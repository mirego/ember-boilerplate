// Vendor
import Service from '@ember/service';

export default Service.extend({
  async fetch() {
    return new Error('[session/fetcher] fetch not implemented.');
  }
});

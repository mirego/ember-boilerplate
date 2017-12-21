// Vendor
import Service from '@ember/service';

export default Service.extend({
  fetch() {
    throw new Error('[session/fetcher] fetch not implemented.');

    return {token: 'your token here.'};
  }
});

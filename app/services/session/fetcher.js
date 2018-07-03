// Vendor
import Service from '@ember/service';

export default class SessionFetcher extends Service {
  async fetch() {
    return new Error('[session/fetcher] fetch not implemented.');
  }
}

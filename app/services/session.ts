// Vendor
import Service from '@ember/service';

export default class Session extends Service {
  async fetchAccessToken(): Promise<string> {
    return Promise.reject(Error('[session] fetchAccessToken not implemented.'));
  }
}

declare module '@ember/service' {
  interface Registry {
    session: Session;
  }
}

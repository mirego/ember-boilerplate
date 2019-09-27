// Vendor
import Service, {inject as service} from '@ember/service';

// Types
import FastBoot from 'ember-cli-fastboot/services/fastboot';

export default class Shoebox extends Service {
  @service('fastboot')
  fastboot: FastBoot;

  read(key: string): unknown {
    if (this.fastboot.isFastBoot) return null;

    const cachedContent = this.fastboot.shoebox.retrieve(key);

    try {
      return JSON.parse(cachedContent || '{}');
    } catch (_error) {
      return {};
    }
  }

  write(key: string, rawValue: unknown) {
    if (!this.fastboot.isFastBoot) return;

    const value = JSON.stringify(rawValue);

    this.fastboot.shoebox.put(key, value);
  }
}

declare module '@ember/service' {
  interface Registry {
    shoebox: Shoebox;
  }
}

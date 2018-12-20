// Vendor
import {computed} from '@ember-decorators/object';
import {reads} from '@ember-decorators/object/computed';
import {service} from '@ember-decorators/service';
import Service from '@ember/service';

// Types
import BrowserLocation from 'ember-boilerplate/services/location/browser';
import FastBootLocation from 'ember-boilerplate/services/location/fastboot';
import FastBoot from 'ember-cli-fastboot/services/fastboot';
import IntlService from 'ember-intl/services/intl';

export interface LocationInterface {
  protocol: string;
  host: string;
  path: string;
  queryString: string;
  hash: string;
}

export default class Location extends Service {
  @service('fastboot')
  fastboot!: FastBoot;

  @service('intl')
  intl!: IntlService;

  @service('location/browser')
  browserLocation!: BrowserLocation;

  @service('location/fastboot')
  fastbootLocation!: FastBootLocation;

  @computed('fastboot.isFastBoot')
  get locationService(): FastBootLocation | BrowserLocation {
    return this.fastboot.isFastBoot
      ? this.fastbootLocation
      : this.browserLocation;
  }

  @reads('locationService.protocol')
  protocol: string;

  @reads('locationService.host')
  host: string;

  @reads('locationService.path')
  path: string;

  @reads('locationService.queryString')
  queryString: string;

  @reads('locationService.hash')
  hash: string;

  get fullURL(): string {
    const {protocol, host, path, queryString} = this.locationService;

    return `${protocol}//${host}${path}${queryString}`;
  }

  assign(location: string): void {
    window.location.href = location;
  }
}

declare module '@ember/service' {
  interface Registry {
    location: Location;
  }
}
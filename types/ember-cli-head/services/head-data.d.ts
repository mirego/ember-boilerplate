import HeadDataService from 'ember-cli-head/services/head-data';

declare module 'ember-cli-head/services/head-data' {
  export default class HeadDataService {
    // eslint-disable-next-line no-undef
    [prop: string]: any;
  }
}

declare module '@ember/service' {
  interface Registry {
    'head-data': HeadDataService;
  }
}

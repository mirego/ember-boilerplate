import HeadDataService from 'ember-cli-head/services/head-data';

declare module 'ember-cli-head/services/head-data' {
  export default class HeadDataService {
    [prop: string]: any;
  }
}

declare module '@ember/service' {
  interface Registry {
    'head-data': HeadDataService;
  }
}

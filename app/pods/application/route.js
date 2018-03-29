// Vendor
import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';

export default Route.extend({
  intl: service('intl'),

  beforeModel() {
    this.get('intl').setLocale('en-ca');
  }
});

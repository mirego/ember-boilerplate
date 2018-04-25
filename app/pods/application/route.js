// Vendor
import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';

export default Route.extend({
  apolloShoeboxWriter: service('apollo/shoebox-writer'),
  intl: service('intl'),

  beforeModel() {
    this.intl.setLocale('en-ca');
  },

  actions: {
    didTransition() {
      this.apolloShoeboxWriter.write();
    }
  }
});

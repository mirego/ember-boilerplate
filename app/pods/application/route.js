// Vendor
import Route from '@ember/routing/route';
import {service} from '@ember-decorators/service';
import {action} from '@ember-decorators/object';

export default class ApplicationRoute extends Route {
  @service('apollo/shoebox-writer') apolloShoeboxWriter;
  @service('intl') intl;

  beforeModel() {
    this.intl.setLocale('en-ca');
  }

  @action
  didTransition() {
    this.apolloShoeboxWriter.write();
  }
}

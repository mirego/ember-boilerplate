// Vendor
import {action} from '@ember-decorators/object';
import {inject as service} from '@ember-decorators/service';
import Route from '@ember/routing/route';
import fetch from 'fetch';

// Types
import ShoeboxWriter from 'ember-boilerplate/services/apollo/shoebox-writer';
import Location from 'ember-boilerplate/services/location';
import IntlService from 'ember-intl/services/intl';

// Config
import config from 'ember-boilerplate/config/environment';

export default class ApplicationRoute extends Route {
  @service('intl')
  intl!: IntlService;

  @service('apollo/shoebox-writer')
  apolloShoeboxWriter!: ShoeboxWriter;

  @service('location')
  location!: Location;

  async beforeModel() {
    const locale = this.determineLocale();
    this.intl.setLocale(locale);

    if (config.intl.ASYNC_TRANSLATIONS) {
      const translations = await this.fetchTranslations(locale);

      this.intl.addTranslations(locale, translations);
    }
  }

  @action
  didTransition() {
    this.apolloShoeboxWriter.write();
  }

  private determineLocale(): string {
    return 'en-ca';
  }

  private async fetchTranslations(locale: string): Promise<object> {
    const translationsURL = `${
      this.location.fullURL
    }/translations/${locale}.json`;

    try {
      const response = await fetch(translationsURL);

      return response.json();
    } catch (error) {
      return {};
    }
  }
}

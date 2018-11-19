// Vendor
import {action} from '@ember-decorators/object';
import {service} from '@ember-decorators/service';
import Route from '@ember/routing/route';
import fetch from 'fetch';

// Types
import ShoeboxWriter from 'ember-boilerplate/services/apollo/shoebox-writer';
import AppUrlBuilder from 'ember-boilerplate/services/app-url/builder';
import IntlService from 'ember-intl/services/intl';

// Config
import config from 'ember-boilerplate/config/environment';

export default class ApplicationRoute extends Route {
  @service('apollo/shoebox-writer')
  apolloShoeboxWriter!: ShoeboxWriter;

  @service('app-url/builder')
  appUrlBuilder!: AppUrlBuilder;

  @service('intl')
  intl!: IntlService;

  async beforeModel() {
    const locale = 'en-ca';

    if (config.intl.ASYNC_TRANSLATIONS) {
      const translationsUrl = this.appUrlBuilder.build(
        `/translations/${locale}.json`
      );

      let translations;
      try {
        const response = await fetch(translationsUrl);
        translations = await response.json();
      } catch (error) {
        translations = {};
      }

      this.intl.addTranslations(locale, translations);
    }

    this.intl.setLocale(locale);
  }

  @action
  didTransition() {
    this.apolloShoeboxWriter.write();
  }
}

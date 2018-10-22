// Vendor
import Route from '@ember/routing/route';
import {service} from '@ember-decorators/service';
import {action} from '@ember-decorators/object';
import fetch from 'fetch';

// Config
import config from 'ember-boilerplate/config/environment';

export default class ApplicationRoute extends Route {
  @service('apollo/shoebox-writer')
  apolloShoeboxWriter;

  @service('app-url/builder')
  appUrlBuilder;

  @service('intl')
  intl;

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

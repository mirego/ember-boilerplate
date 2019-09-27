// Vendor
import {action} from '@ember/object';
import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';
import fetch from 'fetch';

// Types
import Shoebox from 'ember-boilerplate/services/shoebox';
import Location from 'ember-boilerplate/services/location';
import ServiceWorker from 'ember-boilerplate/services/service-worker';
import IntlService from 'ember-intl/services/intl';
import FastBoot from 'ember-cli-fastboot/services/fastboot';

// Config
import config from 'ember-boilerplate/config/environment';
import Apollo from 'ember-boilerplate/services/apollo';

const pathForLocale = {
  'en-ca': '/assets/translations/en-ca.json'
};

export default class ApplicationRoute extends Route {
  @service('fastboot')
  fastboot: FastBoot;

  @service('intl')
  intl: IntlService;

  @service('apollo')
  apollo: Apollo;

  @service('shoebox')
  shoebox: Shoebox;

  @service('location')
  location: Location;

  @service('service-worker')
  serviceWorker: ServiceWorker;

  async beforeModel() {
    const locale = this.determineLocale();
    this.intl.setLocale(locale);

    if (config.intl.ASYNC_TRANSLATIONS) {
      const translations = await this.fetchTranslations(locale);

      this.intl.addTranslations(locale, translations);
    }

    // By default whenever an update is ready, we install it immediately.
    // Note that the `update` call could be made later. We could prompt the
    // user to update, then install the update only when they accept.
    this.serviceWorker.register().onUpdateReady(() => {
      this.serviceWorker.update();
    });
  }

  @action
  didTransition() {
    this.shoebox.write(config.apollo.SSR_CACHE_KEY, this.apollo.extractCache());
  }

  private determineLocale(): keyof typeof pathForLocale {
    return 'en-ca';
  }

  private async fetchTranslations(
    locale: keyof typeof pathForLocale
  ): Promise<object> {
    if (this.fastboot.isFastBoot) {
      return await this.fetchTranslationsFromFastBoot(locale);
    }

    return this.fetchTranslationsFromShoebox();
  }

  private async fetchTranslationsFromFastBoot(
    locale: keyof typeof pathForLocale
  ): Promise<object> {
    const translationsURL = pathForLocale[locale];

    const response = await fetch(translationsURL);

    const translations = await response.json();

    this.shoebox.write(config.intl.TRANSLATIONS_CACHE_KEY, translations);

    return translations;
  }

  private fetchTranslationsFromShoebox(): object {
    const translations = this.shoebox.read(
      config.intl.TRANSLATIONS_CACHE_KEY
    ) as object;

    return translations;
  }
}

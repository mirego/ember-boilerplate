// Vendor
import FastBoot from 'ember-cli-fastboot/services/fastboot';
import fetch from 'fetch';
import IntlService from 'ember-intl/services/intl';
import Service, {inject as service} from '@ember/service';
import Shoebox from 'ember-boilerplate/services/shoebox';

// Config
import config from 'ember-boilerplate/config/environment';

export type AvailableLocale = 'en-ca';

const pathForLocale: Record<AvailableLocale, string> = {
  'en-ca': '/assets/translations/en-ca.json',
};

export default class Translations extends Service {
  @service('fastboot')
  fastboot: FastBoot;

  @service('intl')
  intl: IntlService;

  @service('shoebox')
  shoebox: Shoebox;

  async loadForLocale(locale: AvailableLocale) {
    const translations = await this.fetchTranslations(locale);

    this.intl.addTranslations(locale, translations);
  }

  private async fetchTranslations(locale: AvailableLocale): Promise<object> {
    if (this.fastboot.isFastBoot) {
      return await this.fetchTranslationsFromNetwork(locale);
    }

    const translations = this.fetchTranslationsFromShoebox(locale);

    if (translations) return translations;

    return this.fetchTranslationsFromNetwork(locale);
  }

  private async fetchTranslationsFromNetwork(locale: AvailableLocale): Promise<object> {
    const translationsURL = pathForLocale[locale];

    const response = await fetch(translationsURL);

    const translations = await response.json();

    if (this.fastboot.isFastBoot) {
      this.shoebox.write(`${config.intl.TRANSLATIONS_CACHE_KEY}-${locale}`, translations);
    }

    return translations;
  }

  private fetchTranslationsFromShoebox(locale: AvailableLocale) {
    const translations = this.shoebox.read(`${config.intl.TRANSLATIONS_CACHE_KEY}-${locale}`) as object;

    return translations;
  }
}

declare module '@ember/service' {
  interface Registry {
    translations: Account;
  }
}

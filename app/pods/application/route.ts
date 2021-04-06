// Vendor
import {action} from '@ember/object';
import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';

// Config
import config from 'ember-boilerplate/config/environment';

// Types
import Shoebox from 'ember-boilerplate/services/shoebox';
import IntlService from 'ember-intl/services/intl';
import Apollo from 'ember-boilerplate/services/apollo';
import HeadData from 'ember-cli-head/services/head-data';
import Translations, {AvailableLocale} from 'ember-boilerplate/services/translations';

export default class ApplicationRoute extends Route {
  @service('apollo')
  apollo: Apollo;

  @service('intl')
  intl: IntlService;

  @service('head-data')
  headData: HeadData;

  @service('shoebox')
  shoebox: Shoebox;

  @service('translations')
  translations: Translations;

  @action
  didTransition() {
    this.shoebox.write(config.apollo.SSR_CACHE_KEY, this.apollo.extractCache());
  }

  async beforeModel() {
    const locale = this.determineLocale();

    this.intl.setLocale(locale);

    if (config.intl.ASYNC_TRANSLATIONS) {
      await this.translations.loadForLocale(locale);
    }

    this.headData.disallowSiteIndexation = !config.APP.ALLOW_SITE_INDEXATION;
  }

  private determineLocale(): AvailableLocale {
    return 'en-ca';
  }
}

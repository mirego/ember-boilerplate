// Vendor
import {InMemoryCache, NormalizedCacheObject} from '@apollo/client/cache';
import {setContext} from '@apollo/client/link/context';
import {createHttpLink} from '@apollo/client/core';
import {onError} from '@apollo/client/link/error';
import {inject as service} from '@ember/service';
import ApolloService from 'ember-apollo-client/services/apollo';
import * as Sentry from '@sentry/ember';
import fetch from 'fetch';

// Types
import ShoeBox from 'ember-boilerplate/services/shoebox';
import Session from 'ember-boilerplate/services/session';
import FastBoot from 'ember-cli-fastboot/services/fastboot';

// Config
import config from 'ember-boilerplate/config/environment';

const dataIdFromObject = (result: any) => {
  if (result.id && result.__typename) {
    return `${result.__typename}${result.id}`;
  }

  return;
};

export default class Apollo extends ApolloService {
  @service('shoebox')
  shoebox: ShoeBox;

  @service('fastboot')
  fastboot: FastBoot;

  @service('session')
  session: Session;

  clientOptions() {
    return {
      assumeImmutableResults: true,
      cache: this.cache(),
      link: this.link(),
      ssrMode: this.fastboot.isFastBoot,
    };
  }

  link() {
    const httpLink = createHttpLink({
      uri: config.apollo.API_URL,
      fetch,
    });

    const authenticationLink = this.createAuthenticationLink();
    const errorLink = this.createErrorLink();

    return errorLink.concat(authenticationLink.concat(httpLink));
  }

  cache() {
    const cache = new InMemoryCache({
      dataIdFromObject,
    });

    const cachedContent = this.shoebox.read(config.apollo.SSR_CACHE_KEY) as NormalizedCacheObject;

    if (!cachedContent) return cache;

    return cache.restore(cachedContent);
  }

  extractCache() {
    return this.client.cache.extract();
  }

  async clearCache() {
    await this.client.resetStore();
  }

  private createAuthenticationLink() {
    return setContext(async () => {
      const token = await this.session.fetchAccessToken();

      return {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
    });
  }

  private createErrorLink() {
    return onError(({networkError}) => {
      if (networkError) {
        Sentry.captureException(networkError);
      }
    });
  }
}

declare module '@ember/service' {
  interface Registry {
    apollo: Apollo;
  }
}

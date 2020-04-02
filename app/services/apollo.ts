// Vendor
import {inject as service} from '@ember/service';
import {InMemoryCache, NormalizedCacheObject} from 'apollo-cache-inmemory';
import {setContext} from 'apollo-link-context';
import {createHttpLink} from 'apollo-link-http';
import {onError} from 'apollo-link-error';
import ApolloService from 'ember-apollo-client/services/apollo';
import * as Sentry from '@sentry/browser';
import fetch from 'fetch';

// Types
import ShoeBox from 'ember-boilerplate/services/shoebox';
import SessionFetcher from 'ember-boilerplate/services/session/fetcher';
import FastBoot from 'ember-cli-fastboot/services/fastboot';

// Config
import config from 'ember-boilerplate/config/environment';

const dataIdFromObject = (result: any): string | null => {
  if (result.id && result.__typename) {
    return `${result.__typename}${result.id}`;
  }

  return null;
};

export default class Apollo extends ApolloService {
  @service('shoebox')
  shoebox: ShoeBox;

  @service('fastboot')
  fastboot: FastBoot;

  @service('session/fetcher')
  sessionFetcher: SessionFetcher;

  clientOptions() {
    return {
      assumeImmutableResults: true,
      cache: this.cache(),
      link: this.link(),
      ssrMode: this.fastboot.isFastBoot
    };
  }

  link() {
    const httpLink = createHttpLink({
      uri: config.apollo.API_URL,
      fetch
    });

    const authenticationLink = this.createAuthenticationLink();
    const errorLink = this.createErrorLink();

    return errorLink.concat(authenticationLink.concat(httpLink));
  }

  cache() {
    const cache = new InMemoryCache({
      dataIdFromObject,
      freezeResults: false
    });

    const cachedContent = this.shoebox.read(
      config.apollo.SSR_CACHE_KEY
    ) as NormalizedCacheObject;

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
      const {token} = await this.sessionFetcher.fetch();

      return {
        headers: {
          authorization: `Bearer ${token}`
        }
      };
    });
  }

  private createErrorLink() {
    return onError(({networkError, operation}) => {
      Sentry.addBreadcrumb({
        category: 'GraphQL',
        data: {
          name: operation.operationName,
          type: operation.query.definitions.find(
            definition => definition.operation
          ).operation
        }
      });

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

// Vendor
import {service} from '@ember-decorators/service';
import {computed} from '@ember-decorators/object';
import ApolloService from 'ember-apollo-client/services/apollo';
import {setContext} from 'apollo-link-context';
import {InMemoryCache} from 'apollo-cache-inmemory';

const dataIdFromObject = result => {
  if (result.id && result.__typename) {
    return `${result.__typename}${result.id}`;
  }

  return null;
};

export default class Apollo extends ApolloService {
  @service('apollo/shoebox-reader') apolloShoeboxReader;
  @service('fastboot') fastboot;
  @service('session/fetcher') sessionFetcher;

  @computed
  get clientOptions() {
    return {
      ssrMode: this.fastboot.isFastBoot,
      link: this.link,
      cache: this.cache
    };
  }

  @computed
  get link() {
    const httpLink = super.link;
    const authenticationLink = this._createAuthenticationLink();

    return authenticationLink.concat(httpLink);
  }

  @computed
  get cache() {
    const cache = new InMemoryCache({dataIdFromObject});

    const cachedContent = this.apolloShoeboxReader.read();

    return cache.restore(cachedContent);
  }

  _createAuthenticationLink() {
    return setContext(async _request => {
      const {token} = await this.sessionFetcher.fetch();

      return {
        headers: {
          authorization: `Bearer ${token}`
        }
      };
    });
  }
}

// Vendor
import {computed} from '@ember-decorators/object';
import {service} from '@ember-decorators/service';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {setContext} from 'apollo-link-context';
import ApolloService from 'ember-apollo-client/services/apollo';

// Types
import ShoeBoxReader from 'ember-boilerplate/services/apollo/shoebox-reader';
import SessionFetcher from 'ember-boilerplate/services/session/fetcher';
import FastBoot from 'ember-cli-fastboot/services/fastboot';

const dataIdFromObject = (result: any): string | null => {
  if (result.id && result.__typename) {
    return `${result.__typename}${result.id}`;
  }

  return null;
};

export default class Apollo extends ApolloService {
  @service('apollo/shoebox-reader')
  apolloShoeboxReader!: ShoeBoxReader;

  @service('fastboot')
  fastboot!: FastBoot;

  @service('session/fetcher')
  sessionFetcher!: SessionFetcher;

  @computed
  get clientOptions() {
    return {
      cache: this.cache,
      link: this.link,
      ssrMode: this.fastboot.isFastBoot
    };
  }

  @computed
  get link() {
    const httpLink = super.link;
    const authenticationLink = this.createAuthenticationLink();

    return authenticationLink.concat(httpLink);
  }

  @computed
  get cache() {
    const cache = new InMemoryCache({dataIdFromObject});

    const cachedContent = this.apolloShoeboxReader.read();

    if (!cachedContent) return cache;

    return cache.restore(cachedContent);
  }

  private createAuthenticationLink() {
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

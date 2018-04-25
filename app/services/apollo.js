// Vendor
import {inject as service} from '@ember/service';
import {computed} from '@ember/object';
import ApolloService from 'ember-apollo-client/services/apollo';
import {setContext} from 'apollo-link-context';
import {InMemoryCache} from 'apollo-cache-inmemory';

const dataIdFromObject = (result) => {
  if (result.id && result.__typename) {
    return `${result.__typename}${result.id}`;
  }

  return null;
};

export default ApolloService.extend({
  fastboot: service('fastboot'),
  sessionFetcher: service('session/fetcher'),

  clientOptions: computed(function() {
    return {
      ssrMode: this.fastboot.isFastBoot,
      link: this.link,
      cache: this.cache
    };
  }),

  link: computed(function() {
    const httpLink = this._super(...arguments);

    const authenticationLink = this._createAuthenticationLink();

    return authenticationLink.concat(httpLink);
  }),

  cache: computed(() => {
    return new InMemoryCache({dataIdFromObject});
  }),

  _createAuthenticationLink() {
    return setContext(async (_request) => {
      const {token} = await this.sessionFetcher.fetch();

      return {
        headers: {
          authorization: `Bearer ${token}`
        }
      };
    });
  }
});

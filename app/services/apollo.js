// Vendor
import Service, {inject as service} from '@ember/service';
import ApolloClient from 'apollo-client';
import {setContext, from} from 'apollo-link-context';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import fetch from 'fetch';

// Config
import config from 'ember-boilerplate/config/environment';

const URI = `${config.API.BASE_URL}${config.API.GRAPHQL_PATH}`;

const dataIdFromObject = (result) => {
  if (result.id && result.__typename) {
    return `${result.__typename}${result.id}`;
  }

  return null;
};

export default Service.extend({
  sessionFetcher: service('session/fetcher'),

  init() {
    this._super(...arguments);

    const authenticationLink = this.createAuthenticationLink();
    const httpLink = new HttpLink({uri: URI, fetch});
    const link = from([authenticationLink, httpLink]);
    const cache = new InMemoryCache({dataIdFromObject});

    this.set('client', new ApolloClient({link, cache}));
  },

  createAuthenticationLink() {
    return setContext(async (_request) => {
      const {token} = await this.get('sessionFetcher').fetch();

      return {
        headers: {
          authorization: `Bearer ${token}`
        }
      };
    });
  }
});

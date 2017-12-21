// Vendor
import Service, {inject as service} from '@ember/service';
import ApolloClient from 'apollo-client';
import {ApolloLink, concat} from 'apollo-link';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import fetch from 'fetch';

// Config
import config from 'ember-boilerplate/config/environment';

const URI = `${config.API.HOST}${config.API.GRAPHQL_PATH}`;

export default Service.extend({
  sessionFetcher: service('session/fetcher'),

  init() {
    this._super(...arguments);

    const authMiddleware = this.createAuthMiddleware();
    const httpLink = new HttpLink({uri: URI, fetch});
    const link = concat(authMiddleware, httpLink);
    const cache = new InMemoryCache();

    this.set('client', new ApolloClient({link, cache}));
  },

  createAuthMiddleware() {
    return new ApolloLink((operation, forward) => {
      const {token} = this.get('sessionFetcher').fetch();

      if (token) {
        operation.setContext({
          headers: {
            authorization: `Bearer ${token}`
          }
        });
      }

      return forward(operation);
    });
  }
});

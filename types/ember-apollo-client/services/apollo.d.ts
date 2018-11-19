import Apollo from 'ember-apollo-client/services/apollo';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloLink} from 'apollo-link';

declare module 'ember-apollo-client/services/apollo' {
  export default class ApolloService {
    cache: InMemoryCache;
    link: ApolloLink;
  }
}

declare module '@ember/service' {
  interface Registry {
    'apollo': Apollo;
  }
}

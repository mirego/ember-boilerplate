import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloLink, Observable} from 'apollo-link';
import {
  ApolloClient,
  OperationVariables,
  QueryOptions,
  WatchQueryOptions,
  MutationOptions,
  SubscriptionOptions
} from 'apollo-client';

declare module 'ember-apollo-client/services/apollo' {
  export default class ApolloService {
    client: ApolloClient<InMemoryCache>;
    query: (
      options: QueryOptions<OperationVariables>,
      resultKey?: string
    ) => Promise<any>;
    watchQuery: (
      options: WatchQueryOptions<OperationVariables>,
      resultKey?: string
    ) => Promise<any>;
    mutate: (
      options: MutationOptions<any, OperationVariables>,
      resultKey?: string
    ) => Promise<any>;
    subscribe: (
      options: SubscriptionOptions<OperationVariables>,
      resultKey?: string
    ) => Observable<any>;
    cache(): InMemoryCache;
    link(): ApolloLink;
  }
}

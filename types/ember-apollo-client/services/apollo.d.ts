import {InMemoryCache} from '@apollo/client/cache';
import {
  ApolloClient,
  ApolloLink,
  Observable,
  OperationVariables,
  QueryOptions,
  WatchQueryOptions,
  MutationOptions,
  SubscriptionOptions,
} from '@apollo/client/core';

declare module 'ember-apollo-client/services/apollo' {
  export default class ApolloService {
    client: ApolloClient<InMemoryCache>;
    query: (options: QueryOptions<OperationVariables>, resultKey?: string) => Promise<any>;
    watchQuery: (options: WatchQueryOptions<OperationVariables>, resultKey?: string) => Promise<any>;
    mutate: (options: MutationOptions<any, OperationVariables>, resultKey?: string) => Promise<any>;
    subscribe: (options: SubscriptionOptions<OperationVariables>, resultKey?: string) => Observable<any>;
    cache(): InMemoryCache;
    link(): ApolloLink;
  }
}

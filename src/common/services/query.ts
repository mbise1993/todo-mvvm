import { action, observable } from 'mobx';
import { actionAsync, task } from 'mobx-utils';
import { ApolloQueryResult, ObservableQuery } from '@apollo/client';
import { DocumentNode, GraphQLError } from 'graphql';

import { GraphQlClient } from './graphQlClient';

interface Subscription {
  closed: boolean;
  unsubscribe(): void;
}

export interface WatchQueryOptions<TResult, TVariables> {
  variables?: TVariables;
  onNext?(result: ApolloQueryResult<TResult>): void;
  onError?(error: any): void;
}

export class Query<TResult, TVariables> {
  private observable?: ObservableQuery<TResult, TVariables>;
  private subscriptions: Subscription[] = [];

  @observable isLoading = false;
  @observable error: GraphQLError | null = null;

  constructor(private readonly document: DocumentNode, private readonly client: GraphQlClient) {}

  @actionAsync
  async fetchQuery(variables?: TVariables) {
    try {
      this.isLoading = true;
      const result = await task(
        this.client.query<TResult, TVariables>({
          query: this.document,
          variables,
        }),
      );

      this.error = null;
      return result;
    } catch (e) {
      this.error = e;
    } finally {
      this.isLoading = false;
    }
  }

  @action
  watchQuery(options: WatchQueryOptions<TResult, TVariables>) {
    this.observable = this.client.watchQuery<TResult, TVariables>({
      query: this.document,
      variables: options.variables,
      notifyOnNetworkStatusChange: true,
    });

    const subscripition = this.observable.subscribe({
      next: result => {
        this.onNext(result);
        if (options.onNext) {
          options.onNext(result);
        }
      },
      error: error => {
        if (options.onError) {
          options.onError(error);
        }
      },
    });

    this.subscriptions.push(subscripition);
  }

  dispose() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.subscriptions = [];
  }

  @action
  private onNext(result: ApolloQueryResult<TResult>) {
    this.isLoading = result.loading;
    if (result.errors && result.errors.length > 0) {
      this.error = result.errors[0];
    }
  }
}

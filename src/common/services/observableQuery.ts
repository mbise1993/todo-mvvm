import { action, observable } from 'mobx';
import { actionAsync, task } from 'mobx-utils';
import { ObservableQuery as ApolloObservableQuery, ApolloQueryResult } from '@apollo/client';
import { DocumentNode, GraphQLError } from 'graphql';

import { GraphQlClient } from './graphQlClient';

interface Subscription {
  closed: boolean;
  unsubscribe(): void;
}

export interface ObservableQueryOptions<TResult> {
  document: DocumentNode;
  onNext?(result: ApolloQueryResult<TResult>): void;
  onError?(error: any): void;
}

export class ObservableQuery<TResult, TVariables> {
  private observable?: ApolloObservableQuery<TResult, TVariables>;
  private subscriptions: Subscription[] = [];

  @observable isLoading = false;
  @observable error: GraphQLError | null = null;

  constructor(
    private readonly client: GraphQlClient,
    private readonly options: ObservableQueryOptions<TResult>,
  ) {}

  @actionAsync
  async execute(variables?: TVariables) {
    try {
      this.isLoading = true;
      const result = await task(
        this.client.query<TResult, TVariables>({
          query: this.options.document,
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
  watch(variables?: TVariables) {
    this.observable = this.client.watchQuery<TResult, TVariables>({
      query: this.options.document,
      variables: variables,
      notifyOnNetworkStatusChange: true,
    });

    const subscripition = this.observable.subscribe({
      next: result => {
        this.onNext(result);
        if (this.options.onNext) {
          this.options.onNext(result);
        }
      },
      error: error => {
        if (this.options.onError) {
          this.options.onError(error);
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
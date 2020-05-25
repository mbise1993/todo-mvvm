import { ObservableQuery as ApolloObservableQuery, ApolloQueryResult } from '@apollo/client';
import { BehaviorSubject } from 'rxjs';
import { DocumentNode, GraphQLError } from 'graphql';

import { GraphQlClient } from '../services/graphQlClient';

interface Subscription {
  closed: boolean;
  unsubscribe(): void;
}

export abstract class Query<TResult, TVariables> {
  private observable?: ApolloObservableQuery<TResult, TVariables>;
  private subscriptions: Subscription[] = [];

  isLoading = new BehaviorSubject(false);
  error = new BehaviorSubject<GraphQLError | null>(null);

  constructor(private readonly document: DocumentNode, private readonly client: GraphQlClient) {}

  async execute(variables?: TVariables) {
    try {
      this.isLoading.next(true);
      const result = await this.client.query<TResult, TVariables>({
        query: this.document,
        variables,
      });

      this.error.next(null);
      return result;
    } catch (e) {
      this.error.next(e);
    } finally {
      this.isLoading.next(false);
    }
  }

  watch(variables?: TVariables) {
    this.observable = this.client.watchQuery<TResult, TVariables>({
      query: this.document,
      variables: variables,
      notifyOnNetworkStatusChange: true,
    });

    const subscripition = this.observable.subscribe({
      next: result => {
        this.internalOnNext(result);
        this.onNext(result);
      },
      error: error => {
        this.onError(error);
      },
    });

    this.subscriptions.push(subscripition);
  }

  refetch(variables?: TVariables) {
    if (!this.observable) {
      throw new Error(`watch must be called before calling refetch`);
    }

    this.observable.refetch(variables);
  }

  dispose() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.subscriptions = [];
  }

  private internalOnNext(result: ApolloQueryResult<TResult>) {
    this.isLoading.next(result.loading);
    if (result.errors && result.errors.length > 0) {
      this.error.next(result.errors[0]);
    }
  }

  protected onNext(result: ApolloQueryResult<TResult>) {}

  protected onError(error: GraphQLError) {}
}

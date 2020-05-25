import { ApolloCache, FetchResult } from '@apollo/client';
import { BehaviorSubject } from 'rxjs';
import { DocumentNode, GraphQLError } from 'graphql';

import { GraphQlClient } from '../services/graphQlClient';

export abstract class Mutation<TResult, TVariables> {
  isLoading = new BehaviorSubject(false);
  error = new BehaviorSubject<GraphQLError | null>(null);

  constructor(private readonly document: DocumentNode, protected readonly variables: TVariables) {}

  async execute(client: GraphQlClient): Promise<TResult | null> {
    try {
      this.isLoading.next(true);
      const result = await client.mutate<TResult, TVariables>({
        mutation: this.document,
        variables: this.variables,
        update: (cache, result) => this.updateCache(cache, result),
      });

      this.error.next(null);
      return result.data || null;
    } catch (e) {
      this.error.next(e);
      return null;
    } finally {
      this.isLoading.next(true);
    }
  }

  protected updateCache(cache: ApolloCache<TResult>, result: FetchResult<TResult>) {}
}

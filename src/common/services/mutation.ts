import { actionAsync, task } from 'mobx-utils';
import { ApolloCache, FetchResult } from '@apollo/client';
import { DocumentNode, GraphQLError } from 'graphql';
import { observable } from 'mobx';

import { GraphQlClient } from './graphQlClient';

export interface MutateOptions<TResult, TVariables> {
  variables?: TVariables;
  updateCache?(cache: ApolloCache<TResult>, result: FetchResult<TResult>): void;
}

export class Mutation<TResult, TVariables> {
  @observable isLoading = false;
  @observable error: GraphQLError | null = null;

  constructor(private readonly document: DocumentNode, private readonly client: GraphQlClient) {}

  @actionAsync
  async mutate(options: MutateOptions<TResult, TVariables>): Promise<TResult | null> {
    try {
      this.isLoading = true;
      const result = await task(
        this.client.mutate<TResult, TVariables>({
          mutation: this.document,
          variables: options.variables,
          update: options.updateCache,
        }),
      );

      this.error = null;
      return result.data || null;
    } catch (e) {
      this.error = e;
      return null;
    } finally {
      this.isLoading = false;
    }
  }
}

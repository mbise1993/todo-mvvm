import { actionAsync, task } from 'mobx-utils';
import { ApolloCache, FetchResult } from '@apollo/client';
import { DocumentNode, GraphQLError } from 'graphql';
import { observable } from 'mobx';

import { GraphQlClient } from './graphQlClient';

export interface ObservableMutationOptions<TResult, TVariables> {
  document: DocumentNode;
  updateCache?(
    cache: ApolloCache<TResult>,
    result: FetchResult<TResult>,
    variables?: TVariables,
  ): void;
}

export class ObservableMutation<TResult, TVariables> {
  @observable isLoading = false;
  @observable error: GraphQLError | null = null;

  constructor(
    private readonly client: GraphQlClient,
    private readonly options: ObservableMutationOptions<TResult, TVariables>,
  ) {}

  @actionAsync
  async execute(variables?: TVariables): Promise<TResult | null> {
    try {
      this.isLoading = true;
      const result = await task(
        this.client.mutate<TResult, TVariables>({
          mutation: this.options.document,
          variables: variables,
          update: (cache, result) => {
            if (this.options.updateCache) {
              this.options.updateCache(cache, result, variables);
            }
          },
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

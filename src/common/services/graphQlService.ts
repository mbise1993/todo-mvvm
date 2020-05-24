import { GraphQlClient } from './graphQlClient';
import { ObservableMutation, ObservableMutationOptions } from './observableMutation';
import { ObservableQuery, ObservableQueryOptions } from './observableQuery';

export abstract class GraphQlService {
  constructor(protected readonly client: GraphQlClient) {}

  protected createQuery<TResult, TVariables>(options: ObservableQueryOptions<TResult>) {
    return new ObservableQuery<TResult, TVariables>(this.client, options);
  }

  protected createMutation<TResult, TVariables>(
    options: ObservableMutationOptions<TResult, TVariables>,
  ) {
    return new ObservableMutation<TResult, TVariables>(this.client, options);
  }
}

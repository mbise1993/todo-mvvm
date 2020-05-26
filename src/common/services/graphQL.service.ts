import { GraphQLClient } from './graphQLClient';
import { ObservableMutation, ObservableMutationOptions } from './observableMutation';
import { ObservableQuery, ObservableQueryOptions } from './observableQuery';

export abstract class GraphQLService {
  private readonly queries: ObservableQuery<any, any>[] = [];

  constructor(protected readonly client: GraphQLClient) {}

  dispose() {
    this.queries.forEach(query => query.dispose());
  }

  protected createQuery<TResult, TVariables>(options: ObservableQueryOptions<TResult>) {
    const query = new ObservableQuery<TResult, TVariables>(this.client, options);
    this.queries.push(query);
    return query;
  }

  protected createMutation<TResult, TVariables>(
    options: ObservableMutationOptions<TResult, TVariables>,
  ) {
    return new ObservableMutation<TResult, TVariables>(this.client, options);
  }
}

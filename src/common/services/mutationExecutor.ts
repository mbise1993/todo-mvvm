import { injectable } from 'inversify';

import { GraphQlClient } from './graphQlClient';
import { Mutation } from '../mutations/mutation';

@injectable()
export class MutationExecutor {
  constructor(private readonly client: GraphQlClient) {}

  async execute<TResult, TVariables>(mutation: Mutation<TResult, TVariables>) {
    return await mutation.execute(this.client);
  }
}

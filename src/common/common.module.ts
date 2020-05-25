import { ContainerModule } from 'inversify';

import { GraphQlClient, graphQlClient } from './services/graphQlClient';
import { MutationExecutor } from './services/mutationExecutor';

export const commonModule = new ContainerModule(bind => {
  bind(GraphQlClient).toConstantValue(graphQlClient);

  bind(MutationExecutor)
    .toSelf()
    .inSingletonScope();
});

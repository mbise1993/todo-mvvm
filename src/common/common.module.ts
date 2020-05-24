import { ContainerModule } from 'inversify';

import { GraphQlClient, graphQlClient } from './services/graphQlClient';

export const commonModule = new ContainerModule(bind => {
  bind(GraphQlClient).toConstantValue(graphQlClient);
});

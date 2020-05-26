import { ContainerModule } from 'inversify';

import { GraphQLClient, graphQLClient } from './services/graphQLClient';
import { ScopeService } from './services/scope.service';

export const commonModule = new ContainerModule(bind => {
  bind(GraphQLClient).toConstantValue(graphQLClient);

  bind(ScopeService)
    .toSelf()
    .inSingletonScope();
});

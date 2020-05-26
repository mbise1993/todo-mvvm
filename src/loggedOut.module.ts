import { ContainerModule } from 'inversify';

import { AuthService } from './auth/services/auth.service';
import { GraphQLClient, graphQLClient } from './common/services/graphQLClient';
import { ModuleService } from './common/services/module.service';
import { SignInViewModel } from './auth/viewModels/signIn.viewModel';

export const loggedOutModule = new ContainerModule(bind => {
  bind(GraphQLClient).toConstantValue(graphQLClient);

  bind(ModuleService)
    .toSelf()
    .inSingletonScope();

  bind(AuthService)
    .toSelf()
    .inSingletonScope();

  bind(SignInViewModel)
    .toSelf()
    .inSingletonScope();
});

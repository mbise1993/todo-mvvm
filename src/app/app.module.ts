import { ContainerModule } from 'inversify';

import { AppViewModel } from './viewModels/app.viewModel';

export const appModule = new ContainerModule(bind => {
  bind(AppViewModel)
    .toSelf()
    .inTransientScope();
});

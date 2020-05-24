import { ContainerModule } from 'inversify';

import { AppPresenter } from './presenters/app.presenter';

export const appModule = new ContainerModule(bind => {
  bind(AppPresenter)
    .toSelf()
    .inTransientScope();
});

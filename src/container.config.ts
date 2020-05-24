import { Container } from 'inversify';

import { appModule } from './app/app.module';
import { commonModule } from './common/common.module';
import { todoModule } from './todo/todo.module';

export const configureContainer = () => {
  const container = new Container({
    skipBaseClassChecks: true,
  });

  container.load(appModule, commonModule, todoModule);

  return container;
};

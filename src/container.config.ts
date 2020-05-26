import { Container } from 'inversify';

import { loggedOutModule } from './loggedOut.module';

export const configureContainer = () => {
  const container = new Container({
    skipBaseClassChecks: true,
  });

  container.bind(Container).toConstantValue(container);

  container.load(loggedOutModule);

  return container;
};

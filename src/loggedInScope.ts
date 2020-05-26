import { Container, injectable } from 'inversify';

import { appModule } from './app/app.module';
import { AuthService } from './auth/services/auth.service';
import { IScope } from './common/services/scope.service';
import { todoModule } from './todo/todo.module';

@injectable()
export class LoggedInScope implements IScope {
  onAttach(container: Container) {
    const authService = container.get(AuthService);
    if (!authService.isUserLoggedIn) {
      throw new Error('User must be logged in to create logged in scope');
    }

    container.load(appModule, todoModule);
  }

  onDetach(container: Container) {
    container.unload(appModule, todoModule);
  }
}

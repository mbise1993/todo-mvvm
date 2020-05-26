import { injectable } from 'inversify';

import { AuthService } from '../services/auth.service';
import { BehaviorSubject } from 'rxjs';
import { LoggedInScope } from '../../loggedInScope';
import { ScopeService } from '../../common/services/scope.service';
import { ViewModel } from '../../common/viewModels';

@injectable()
export class SignInViewModel extends ViewModel {
  private readonly userId = new BehaviorSubject<string>('');

  constructor(
    private readonly authService: AuthService,
    private readonly moduleService: ScopeService,
  ) {
    super();
  }

  $userId = this.userId.asObservable();

  setUserId(value: string) {
    this.userId.next(value);
  }

  async signIn() {
    const success = await this.authService.signIn(this.userId.value);
    if (success) {
      this.moduleService.attach(LoggedInScope);
      this.userId.next('');
    }

    return success;
  }
}

import { BehaviorSubject } from 'rxjs';
import { injectable } from 'inversify';

import { GetUser, GetUserDocument, GetUserVariables } from '../api/GetUser.generated';
import { GraphQLClient } from '../../common/services/graphQLClient';
import { GraphQLService } from '../../common/services/graphQL.service';
import { LoggedInScope } from '../../loggedIn.scope';
import { ScopeService } from '../../common/services/scope.service';
import { UserFields } from '../api/userFields.generated';

@injectable()
export class AuthService extends GraphQLService {
  private readonly activeUser = new BehaviorSubject<UserFields | null>(null);

  private getUser = this.createQuery<GetUser, GetUserVariables>({
    document: GetUserDocument,
  });

  constructor(client: GraphQLClient, private readonly scopeService: ScopeService) {
    super(client);
  }

  $activeUser = this.activeUser.asObservable();

  get loggedInUser() {
    return this.activeUser.value;
  }

  async signIn(userId: string): Promise<boolean> {
    const result = await this.getUser.fetch({
      id: userId,
    });

    const user = result?.data?.user;
    if (user) {
      this.activeUser.next(user);
      this.scopeService.attach(LoggedInScope);
      return true;
    }

    return false;
  }

  signOut() {
    this.scopeService.detach(LoggedInScope);
  }
}

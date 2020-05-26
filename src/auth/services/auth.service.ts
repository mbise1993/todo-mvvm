import { BehaviorSubject } from 'rxjs';
import { injectable } from 'inversify';

import { GetUser, GetUserDocument, GetUserVariables } from '../api/GetUser.generated';
import { GraphQLClient } from '../../common/services/graphQLClient';
import { GraphQLService } from '../../common/services/graphQL.service';
import { UserFields } from '../api/userFields.generated';

@injectable()
export class AuthService extends GraphQLService {
  private readonly activeUser = new BehaviorSubject<UserFields | null>(null);

  private getUser = this.createQuery<GetUser, GetUserVariables>({
    document: GetUserDocument,
  });

  constructor(client: GraphQLClient) {
    super(client);
  }

  $activeUser = this.activeUser.asObservable();

  get isUserLoggedIn(): boolean {
    return !!this.activeUser.value;
  }

  async signIn(userId: string): Promise<boolean> {
    const result = await this.getUser.fetch({
      id: userId,
    });

    const user = result?.data?.user;
    if (user) {
      this.activeUser.next(user);
      return true;
    }

    return false;
  }
}

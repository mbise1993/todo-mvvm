import { ApolloQueryResult } from '@apollo/client';
import { BehaviorSubject } from 'rxjs';
import { injectable } from 'inversify';

import {
  GetTodoItems,
  GetTodoItemsDocument,
  GetTodoItemsVariables,
} from '../api/GetTodoItems.generated';
import { GraphQlClient } from '../../common/services/graphQlClient';
import { Query } from '../../common/queries/query';
import { TodoItemFields } from '../api/todoItemFields.generated';

@injectable()
export class GetTodoItemsQuery extends Query<GetTodoItems, GetTodoItemsVariables> {
  readonly items = new BehaviorSubject<TodoItemFields[]>([]);

  constructor(client: GraphQlClient) {
    super(GetTodoItemsDocument, client);
  }

  protected onNext(result: ApolloQueryResult<GetTodoItems>) {
    if (!result.data?.todos) {
      return;
    }

    this.items.next(result.data.todos as any);
  }
}

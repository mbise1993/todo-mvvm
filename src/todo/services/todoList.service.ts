import { ApolloCache, ApolloQueryResult, FetchResult } from '@apollo/client';
import { BehaviorSubject } from 'rxjs';
import { injectable } from 'inversify';

import {
  CreateTodoItem,
  CreateTodoItemDocument,
  CreateTodoItemVariables,
} from '../api/CreateTodoItem.generated';
import {
  GetTodoItems,
  GetTodoItemsDocument,
  GetTodoItemsVariables,
} from '../api/GetTodoItems.generated';
import { GraphQlClient } from '../../common/services/graphQlClient';
import { GraphQlService } from '../../common/services/graphQlService';
import { TodoItemFields } from '../api/todoItemFields.generated';

@injectable()
export class TodoListService extends GraphQlService {
  readonly items = new BehaviorSubject<TodoItemFields[]>([]);

  constructor(client: GraphQlClient) {
    super(client);

    this.getItems.watch();
  }

  get id() {
    return '1';
  }

  getItems = this.createQuery<GetTodoItems, GetTodoItemsVariables>({
    document: GetTodoItemsDocument,
    onNext: result => this.onNext(result),
  });

  addItem = this.createMutation<CreateTodoItem, CreateTodoItemVariables>({
    document: CreateTodoItemDocument,
    updateCache: (cache, result) => this.updateCacheAfterCreate(cache, result),
  });

  private updateCacheAfterCreate(
    cache: ApolloCache<CreateTodoItem>,
    result: FetchResult<CreateTodoItem>,
  ) {
    if (!result.data) {
      return;
    }

    const cachedData = cache.readQuery<GetTodoItems, GetTodoItemsVariables>({
      query: GetTodoItemsDocument,
    });

    if (!cachedData) {
      return;
    }

    cache.writeQuery<GetTodoItems, GetTodoItemsVariables>({
      query: GetTodoItemsDocument,
      data: {
        ...cachedData,
        todos: [...cachedData.todos, result.data.createTodo],
      },
    });
  }

  private onNext(result: ApolloQueryResult<GetTodoItems>) {
    if (!result.data?.todos) {
      return;
    }

    this.items.next(result.data.todos as any);
  }
}

import { ApolloCache, FetchResult } from '@apollo/client';

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
import { Mutation } from '../../common/mutations/mutation';

export class AddTodoItemMutation extends Mutation<CreateTodoItem, CreateTodoItemVariables> {
  constructor(variables: CreateTodoItemVariables) {
    super(CreateTodoItemDocument, variables);
  }

  protected updateCache(cache: ApolloCache<CreateTodoItem>, result: FetchResult<CreateTodoItem>) {
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
}

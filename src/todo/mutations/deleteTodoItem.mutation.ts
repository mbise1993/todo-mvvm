import { ApolloCache } from '@apollo/client';

import {
  DeleteTodoItem,
  DeleteTodoItemDocument,
  DeleteTodoItemVariables,
} from '../api/DeleteTodoItem.generated';
import {
  GetTodoItems,
  GetTodoItemsDocument,
  GetTodoItemsVariables,
} from '../api/GetTodoItems.generated';
import { Mutation } from '../../common/mutations/mutation';

export class DeleteTodoItemMutation extends Mutation<DeleteTodoItem, DeleteTodoItemVariables> {
  constructor(variables: DeleteTodoItemVariables) {
    super(DeleteTodoItemDocument, variables);
  }

  protected updateCache(cache: ApolloCache<DeleteTodoItem>) {
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
        todos: cachedData.todos!.filter(todo => todo!.id !== this.variables.id),
      },
    });
  }
}

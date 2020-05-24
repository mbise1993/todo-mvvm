import { action, computed } from 'mobx';
import { actionAsync, task } from 'mobx-utils';

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
import { GraphQlClient } from '../../common/services/graphQlClient';
import { Model } from '../../common/models';
import { TodoItemFields } from '../api/todoItemFields.generated';
import {
  UpdateTodoItem,
  UpdateTodoItemDocument,
  UpdateTodoItemVariables,
} from '../api/UpdateTodoItem.generated';

export class TodoItem extends Model<TodoItemFields> {
  constructor(data: TodoItemFields, private readonly client: GraphQlClient) {
    super(data);
  }

  @computed
  get id() {
    return this.data.id;
  }

  @computed
  get description() {
    return this.data.task;
  }

  @computed
  get isCompleted() {
    return this.data.done;
  }

  @actionAsync
  async update(input: Partial<UpdateTodoItemVariables['input']>) {
    await task(
      this.client.mutate<UpdateTodoItem, UpdateTodoItemVariables>({
        mutation: UpdateTodoItemDocument,
        variables: {
          id: this.id,
          input: input as any,
        },
        optimisticResponse: {
          __typename: 'Mutation',
          updateTodo: {
            id: this.id,
            task: input.task || this.description,
            done: input.done || this.isCompleted,
          },
        },
      }),
    );
  }

  @actionAsync
  async delete() {
    await task(
      this.client.mutate<DeleteTodoItem, DeleteTodoItemVariables>({
        mutation: DeleteTodoItemDocument,
        variables: {
          id: this.id,
        },
        update: cache => this.updateCacheAfterDelete(cache),
      }),
    );
  }

  @action
  private updateCacheAfterDelete(cache: ApolloCache<DeleteTodoItem>) {
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
        todos: cachedData.todos!.filter(todo => todo!.id !== this.id),
      },
    });
  }
}

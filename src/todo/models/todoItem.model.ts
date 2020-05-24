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
import { Mutation } from '../../common/services/mutation';
import { TodoItemFields } from '../api/todoItemFields.generated';
import {
  UpdateTodoItem,
  UpdateTodoItemDocument,
  UpdateTodoItemVariables,
} from '../api/UpdateTodoItem.generated';

export class TodoItem extends Model<TodoItemFields> {
  updateMutation: Mutation<UpdateTodoItem, UpdateTodoItemVariables>;
  deleteMutation: Mutation<DeleteTodoItem, DeleteTodoItemVariables>;

  constructor(data: TodoItemFields, client: GraphQlClient) {
    super(data);

    this.updateMutation = new Mutation(UpdateTodoItemDocument, client);
    this.deleteMutation = new Mutation(DeleteTodoItemDocument, client);
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
      this.updateMutation.mutate({
        variables: {
          id: this.id,
          input: input as any,
        },
      }),
    );
  }

  @actionAsync
  async delete() {
    await task(
      this.deleteMutation.mutate({
        variables: {
          id: this.id,
        },
        updateCache: cache => this.updateCacheAfterDelete(cache),
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

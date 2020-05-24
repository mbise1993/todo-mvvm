import { action, computed, observable } from 'mobx';
import { actionAsync, task } from 'mobx-utils';
import { ApolloCache, ApolloQueryResult, FetchResult } from '@apollo/client';
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
import { TodoItem } from './todoItem.model';

@injectable()
export class TodoList {
  items = observable.array<TodoItem>([]);

  constructor(private readonly client: GraphQlClient) {
    this.loadItems();
  }

  @computed
  get id() {
    return '1';
  }

  @actionAsync
  async addItem(description: string) {
    await task(
      this.client.mutate<CreateTodoItem, CreateTodoItemVariables>({
        mutation: CreateTodoItemDocument,
        variables: {
          input: {
            user_id: '1',
            task: description,
            done: false,
          },
        },
        update: (cache, result) => this.updateCacheAfterCreate(cache, result),
      }),
    );
  }

  @action
  private loadItems() {
    const query = this.client.watchQuery<GetTodoItems, GetTodoItemsVariables>({
      query: GetTodoItemsDocument,
    });

    query.subscribe({
      next: result => this.onNext(result),
    });
  }

  @action
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

  @action
  private onNext(result: ApolloQueryResult<GetTodoItems>) {
    if (!result.data?.todos) {
      return;
    }

    const newItems = result.data.todos.map(todo => new TodoItem(todo!, this.client));
    this.items.clear();
    this.items.push(...newItems);
  }
}

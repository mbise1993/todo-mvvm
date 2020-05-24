import { action, computed, observable } from 'mobx';
import { ApolloQueryResult } from '@apollo/client';
import { injectable } from 'inversify';

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

  @action
  addItem(description: string) {
    const lastItemId = this.items.reduce((_all, item) => parseInt(item.data.id), 1);
    const newItem = new TodoItem({
      id: (lastItemId + 1).toString(),
      task: description,
      done: false,
    });

    this.items.push(newItem);
  }

  @action
  deleteItem(item: TodoItem) {
    this.items.remove(item);
  }

  @action
  private loadItems() {
    const query = this.client.watchQuery<GetTodoItems, GetTodoItemsVariables>({
      query: GetTodoItemsDocument,
    });

    query.subscribe({
      next: result => this.updateItems(result),
    });
  }

  @action
  private updateItems(result: ApolloQueryResult<GetTodoItems>) {
    if (!result.data?.todos) {
      return;
    }

    const newItems = result.data.todos.map(todo => new TodoItem(todo!));
    this.items.clear();
    this.items.push(...newItems);
  }
}

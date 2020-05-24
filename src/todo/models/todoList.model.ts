import { action, IObservableArray, observable } from 'mobx';

import { Model } from '../../common/models';
import { TodoItem } from './todoItem.model';
import { TodoListData } from '../api/todoListData';

export class TodoList extends Model<TodoListData> {
  @observable items: IObservableArray<TodoItem>;

  constructor(data: TodoListData) {
    super(data);

    this.items = observable.array(this.data.items.map(item => new TodoItem(item)));
  }

  @action
  addItem(description: string) {
    const lastItemId = this.items.reduce((_all, item) => parseInt(item.data.id), 1);
    const newItem = new TodoItem({
      id: (lastItemId + 1).toString(),
      description,
      isComplete: false,
    });

    this.items.push(newItem);
  }

  @action
  deleteItem(item: TodoItem) {
    this.items.remove(item);
  }
}

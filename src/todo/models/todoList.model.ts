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
  completeAll() {
    this.items.forEach(item => (item.data.isComplete = true));
  }

  @action
  deleteTodoItem(item: TodoItem) {
    this.items.remove(item);
  }
}

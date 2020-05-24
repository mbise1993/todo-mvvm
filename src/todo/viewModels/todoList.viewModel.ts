import { action, computed } from 'mobx';
import { injectable } from 'inversify';

import { TodoItem } from '../models/todoItem.model';
import { TodoList } from '../models/todoList.model';
import { ViewModel } from '../../common/viewModels';

@injectable()
export class TodoListViewModel extends ViewModel {
  constructor(private todoList: TodoList) {
    super();
  }

  @computed
  get items() {
    return this.todoList.items;
  }

  @action
  deleteItem(item: TodoItem) {
    this.todoList.deleteTodoItem(item);
  }
}

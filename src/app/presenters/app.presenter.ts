import { injectable } from 'inversify';

import { action, computed, observable } from 'mobx';
import { TodoList } from '../../todo/models/todoList.model';
import { ViewModel } from '../../common/viewModels';

@injectable()
export class AppPresenter extends ViewModel {
  @observable newItemText = '';

  constructor(private readonly todoList: TodoList) {
    super();
  }

  @computed
  get hasItems() {
    return this.todoList.items.length > 0;
  }

  @computed
  get itemsLeft() {
    const items = this.todoList.items.filter(item => !item.data.isComplete);
    return items.length;
  }

  @action
  addItem() {
    this.todoList.addItem(this.newItemText);
    this.newItemText = '';
  }

  @action
  toggleAll() {
    this.todoList.items.forEach(item => item.toggleComplete());
  }

  @action
  clearCompletedItems() {
    this.todoList.items
      .filter(item => item.data.isComplete)
      .forEach(item => this.todoList.deleteTodoItem(item));
  }
}

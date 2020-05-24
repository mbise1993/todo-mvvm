import { injectable } from 'inversify';

import { action, computed, observable } from 'mobx';
import { TodoList } from '../../todo/models/todoList.model';
import { ViewModel } from '../../common/viewModels';

@injectable()
export class AppViewModel extends ViewModel {
  @observable newItemText = '';
  @observable toggleAllChecked = false;

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
    this.todoList.items.forEach(item => item.setComplete(!this.toggleAllChecked));
    this.toggleAllChecked = !this.toggleAllChecked;
  }

  @action
  clearCompletedItems() {
    this.todoList.items
      .filter(item => item.data.isComplete)
      .forEach(item => this.todoList.deleteItem(item));
  }
}

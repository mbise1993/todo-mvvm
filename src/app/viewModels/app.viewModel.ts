import { actionAsync, task } from 'mobx-utils';
import { computed, observable } from 'mobx';
import { injectable } from 'inversify';

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
    const items = this.todoList.items.filter(item => !item.isCompleted);
    return items.length;
  }

  @actionAsync
  async addItem() {
    await task(this.todoList.addItem(this.newItemText));
    this.newItemText = '';
  }

  @actionAsync
  async toggleAll() {
    for (const item of this.todoList.items) {
      await task(
        item.update({
          done: !this.toggleAllChecked,
        }),
      );
    }

    this.toggleAllChecked = !this.toggleAllChecked;
  }

  @actionAsync
  async clearCompletedItems() {
    for (const item of this.todoList.items) {
      if (item.isCompleted) {
        await item.delete();
      }
    }
  }
}

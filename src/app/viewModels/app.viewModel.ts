import { actionAsync, task } from 'mobx-utils';
import { computed, observable } from 'mobx';
import { injectable } from 'inversify';

import { TodoItemService } from '../../todo/services/todoItem.service';
import { TodoListService } from '../../todo/services/todoList.service';
import { ViewModel } from '../../common/viewModels';

@injectable()
export class AppViewModel extends ViewModel {
  @observable newItemText = '';
  @observable toggleAllChecked = false;

  constructor(
    private readonly todoListService: TodoListService,
    private readonly todoItemService: TodoItemService,
  ) {
    super();
  }

  @computed
  get hasItems() {
    return this.todoListService.items.length > 0;
  }

  @computed
  get itemsLeft() {
    const items = this.todoListService.items.filter(item => !item.done);
    return items.length;
  }

  @computed
  get completedItems() {
    return this.todoListService.items.filter(item => item.done);
  }

  @actionAsync
  async addItem() {
    await task(
      this.todoListService.addItem.execute({
        input: {
          user_id: '1',
          task: this.newItemText,
          done: false,
        },
      }),
    );

    this.newItemText = '';
  }

  @actionAsync
  async toggleAll() {
    for (const item of this.todoListService.items) {
      await task(
        this.todoItemService.updateItem.execute({
          id: item.id,
          input: {
            done: !this.toggleAllChecked,
          } as any,
        }),
      );
    }

    this.toggleAllChecked = !this.toggleAllChecked;
  }

  @actionAsync
  async clearCompletedItems() {
    for (const item of this.completedItems) {
      await task(
        this.todoItemService.deleteItem.execute({
          id: item.id,
        }),
      );
    }
  }
}

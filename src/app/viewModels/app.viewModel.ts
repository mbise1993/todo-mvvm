import { BehaviorSubject } from 'rxjs';
import { injectable } from 'inversify';
import { map } from 'rxjs/operators';

import { AddTodoItemMutation } from '../../todo/mutations/addTodoItem.mutation';
import { DeleteTodoItemMutation } from '../../todo/mutations/deleteTodoItem.mutation';
import { GetTodoItemsQuery } from '../../todo/queries/getTodoItems.query';
import { MutationExecutor } from '../../common/services/mutationExecutor';
import { UpdateTodoItemMutation } from '../../todo/mutations/updateTodoItem.mutation';
import { ViewModel } from '../../common/viewModels';

@injectable()
export class AppViewModel extends ViewModel {
  newItemText = new BehaviorSubject('');
  toggleAllChecked = new BehaviorSubject(false);

  constructor(
    private readonly getTodoItems: GetTodoItemsQuery,
    private readonly mutationExecutor: MutationExecutor,
  ) {
    super();
  }

  hasItems = this.getTodoItems.items.pipe(map(items => items.length > 0));

  itemsLeftCount = this.getTodoItems.items.pipe(
    map(items => items.filter(item => !item.done).length),
  );

  async addItem() {
    await this.mutationExecutor.execute(
      new AddTodoItemMutation({
        input: {
          user_id: '1',
          task: this.newItemText.value,
          done: false,
        },
      }),
    );

    this.newItemText.next('');
  }

  async toggleAll() {
    for (const item of this.getTodoItems.items.value) {
      await this.mutationExecutor.execute(
        new UpdateTodoItemMutation({
          id: item.id,
          input: {
            done: !this.toggleAllChecked,
          } as any,
        }),
      );
    }

    this.toggleAllChecked.next(!this.toggleAllChecked.value);
  }

  async clearCompletedItems() {
    const completedItems = this.getTodoItems.items.value.filter(item => item.done);
    for (const item of completedItems) {
      await this.mutationExecutor.execute(
        new DeleteTodoItemMutation({
          id: item.id,
        }),
      );
    }
  }
}

import { injectable } from 'inversify';

import { BehaviorSubject } from 'rxjs';
import { ReactiveViewModel } from '../../common/viewModels';
import { TodoItemFields } from '../api/todoItemFields.generated';
import { TodoItemService } from '../services/todoItem.service';

interface Props {
  todoItem: TodoItemFields;
}

@injectable()
export class TodoItemViewModel extends ReactiveViewModel<Props> {
  editText = new BehaviorSubject('');
  isEditing = new BehaviorSubject(false);

  constructor(private readonly todoItemService: TodoItemService) {
    super();
  }

  get todoItem() {
    return this.$props.value.todoItem;
  }

  startEditing() {
    this.editText.next(this.todoItem.task);
    this.isEditing.next(true);
  }

  async commitEditText() {
    await this.todoItemService.updateItem.execute({
      id: this.todoItem.id,
      input: {
        task: this.editText.value,
      } as any,
    });

    this.editText.next('');
    this.isEditing.next(false);
  }

  async toggleComplete() {
    await this.todoItemService.updateItem.execute({
      id: this.todoItem.id,
      input: {
        done: !this.todoItem.done,
      } as any,
    });
  }

  async deleteItem() {
    await this.todoItemService.deleteItem.execute({
      id: this.todoItem.id,
    });
  }
}

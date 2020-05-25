import { injectable } from 'inversify';

import { BehaviorSubject } from 'rxjs';
import { TodoItemFields } from '../api/todoItemFields.generated';
import { TodoItemService } from '../services/todoItem.service';
import { ViewModel } from '../../common/viewModels';

interface Props {
  todoItem: TodoItemFields;
}

@injectable()
export class TodoItemViewModel extends ViewModel<Props> {
  private todoItem!: TodoItemFields;

  editText = new BehaviorSubject('');
  isEditing = new BehaviorSubject(false);

  constructor(private readonly todoItemService: TodoItemService) {
    super();
  }

  get id() {
    return this.todoItem.id;
  }

  get description() {
    return this.todoItem.task;
  }

  get isComplete() {
    return this.todoItem.done;
  }

  startEditing() {
    this.editText.next(this.description);
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

  protected onInit() {
    this.todoItem = this.props.todoItem;
  }

  protected onPropsChanged() {
    this.todoItem = this.props.todoItem;
  }
}

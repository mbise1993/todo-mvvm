import { injectable } from 'inversify';

import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ReactiveViewModel } from '../../common/viewModels';
import { TodoItemFields } from '../api/todoItemFields.generated';
import { TodoItemService } from '../services/todoItem.service';

interface Props {
  todoItem: TodoItemFields;
}

@injectable()
export class TodoItemViewModel extends ReactiveViewModel<Props> {
  todoItem!: TodoItemFields;
  editText = new BehaviorSubject('');
  isEditing = new BehaviorSubject(false);

  constructor(private readonly todoItemService: TodoItemService) {
    super();
  }

  $todoItem = this.$props.pipe(map(props => props!.todoItem));

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

  onInit() {
    this.$props.subscribe(props => (this.todoItem = props!.todoItem));
  }
}

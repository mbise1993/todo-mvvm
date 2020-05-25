import { injectable } from 'inversify';

import { BehaviorSubject } from 'rxjs';
import { DeleteTodoItemMutation } from '../mutations/deleteTodoItem.mutation';
import { MutationExecutor } from '../../common/services/mutationExecutor';
import { TodoItemFields } from '../api/todoItemFields.generated';
import { UpdateTodoItemMutation } from '../mutations/updateTodoItem.mutation';
import { ViewModel } from '../../common/viewModels';

interface Props {
  todoItem: TodoItemFields;
}

@injectable()
export class TodoItemViewModel extends ViewModel<Props> {
  private todoItem!: TodoItemFields;

  editText = new BehaviorSubject('');
  isEditing = new BehaviorSubject(false);

  constructor(private readonly mutationExecutor: MutationExecutor) {
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
    await this.mutationExecutor.execute(
      new UpdateTodoItemMutation({
        id: this.todoItem.id,
        input: {
          task: this.editText.value,
        } as any,
      }),
    );

    this.editText.next('');
    this.isEditing.next(false);
  }

  async toggleComplete() {
    await this.mutationExecutor.execute(
      new UpdateTodoItemMutation({
        id: this.todoItem.id,
        input: {
          done: !this.todoItem.done,
        } as any,
      }),
    );
  }

  async deleteItem() {
    await this.mutationExecutor.execute(
      new DeleteTodoItemMutation({
        id: this.todoItem.id,
      }),
    );
  }

  protected onInit() {
    this.todoItem = this.props.todoItem;
  }

  protected onPropsChanged() {
    this.todoItem = this.props.todoItem;
  }
}

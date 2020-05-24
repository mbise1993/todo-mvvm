import { action, computed, observable } from 'mobx';
import { actionAsync, task } from 'mobx-utils';
import { injectable } from 'inversify';

import { TodoItemFields } from '../api/todoItemFields.generated';
import { TodoItemService } from '../services/todoItem.service';
import { ViewModel } from '../../common/viewModels';

interface Props {
  todoItem: TodoItemFields;
}

@injectable()
export class TodoItemViewModel extends ViewModel<Props> {
  private todoItem!: TodoItemFields;

  @observable editText = '';
  @observable isEditing = false;

  constructor(private readonly todoItemService: TodoItemService) {
    super();
  }

  @computed
  get id() {
    return this.todoItem.id;
  }

  @computed
  get description() {
    return this.todoItem.task;
  }

  @computed
  get isComplete() {
    return this.todoItem.done;
  }

  @action
  startEditing() {
    this.editText = this.description;
    this.isEditing = true;
  }

  @actionAsync
  async commitEditText() {
    await task(
      this.todoItemService.updateItem.execute({
        id: this.todoItem.id,
        input: {
          task: this.editText,
        } as any,
      }),
    );

    this.editText = '';
    this.isEditing = false;
  }

  @actionAsync
  async toggleComplete() {
    await task(
      this.todoItemService.updateItem.execute({
        id: this.todoItem.id,
        input: {
          done: !this.todoItem.done,
        } as any,
      }),
    );
  }

  @actionAsync
  async deleteItem() {
    await task(
      this.todoItemService.deleteItem.execute({
        id: this.todoItem.id,
      }),
    );
  }

  protected onDidReceiveProps() {
    this.todoItem = this.props.todoItem;
  }
}

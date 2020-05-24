import { action, computed, observable } from 'mobx';
import { actionAsync, task } from 'mobx-utils';
import { injectable } from 'inversify';

import { TodoItem } from '../models/todoItem.model';
import { ViewModel } from '../../common/viewModels';

interface IProps {
  todoItem: TodoItem;
}

@injectable()
export class TodoItemViewModel extends ViewModel<IProps> {
  private todoItem!: TodoItem;

  @observable editText = '';
  @observable isEditing = false;

  @computed
  get id() {
    return this.todoItem.id;
  }

  @computed
  get description() {
    return this.todoItem.description;
  }

  @computed
  get isComplete() {
    return this.todoItem.isCompleted;
  }

  @action
  startEditing() {
    this.editText = this.description;
    this.isEditing = true;
  }

  @actionAsync
  async commitEditText() {
    await task(
      this.todoItem.update({
        task: this.editText,
      }),
    );

    this.editText = '';
    this.isEditing = false;
  }

  @actionAsync
  async toggleComplete() {
    await task(
      this.todoItem.update({
        done: !this.todoItem.isCompleted,
      }),
    );
  }

  @actionAsync
  async deleteItem() {
    await task(this.todoItem.delete());
  }

  protected initialize() {
    this.todoItem = this.props.todoItem;
  }
}

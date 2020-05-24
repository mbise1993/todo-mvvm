import { action, computed } from 'mobx';

import { Model } from '../../common/models';
import { TodoItemFields } from '../api/todoItemFields.generated';

export class TodoItem extends Model<TodoItemFields> {
  constructor(data: TodoItemFields) {
    super(data);
  }

  @computed
  get id() {
    return this.data.id;
  }

  @computed
  get description() {
    return this.data.task;
  }

  @computed
  get isCompleted() {
    return this.data.done;
  }

  @action
  updateDescription(value: string) {
    this.data.task = value;
  }

  @action
  setComplete(value: boolean) {
    this.data.done = value;
  }

  @action
  toggleComplete() {
    this.setComplete(!this.data.done);
  }
}

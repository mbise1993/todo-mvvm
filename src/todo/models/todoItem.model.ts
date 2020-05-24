import { action } from 'mobx';

import { Model } from '../../common/models';
import { TodoItemData } from '../api/todoItemData';

export class TodoItem extends Model<TodoItemData> {
  constructor(data: TodoItemData) {
    super(data);
  }

  @action
  updateDescription(value: string) {
    this.data.description = value;
  }

  @action
  toggleComplete() {
    this.data.isComplete = !this.data.isComplete;
  }
}

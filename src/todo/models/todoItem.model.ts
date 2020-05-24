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
  setComplete(value: boolean) {
    this.data.isComplete = value;
  }

  @action
  toggleComplete() {
    this.setComplete(!this.data.isComplete);
  }
}

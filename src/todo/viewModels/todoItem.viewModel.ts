import { action, computed } from 'mobx';
import { injectable } from 'inversify';

import { TodoItem } from '../models/todoItem.model';
import { ViewModel } from '../../common/viewModels';

interface IProps {
  todoItem: TodoItem;
}

@injectable()
export class TodoItemViewModel extends ViewModel<IProps> {
  private todoItem!: TodoItem;

  constructor() {
    super();
  }

  @computed
  get id() {
    return this.todoItem.data.id;
  }

  @computed
  get description() {
    return this.todoItem.data.description;
  }

  @computed
  get isComplete() {
    return this.todoItem.data.isComplete;
  }

  @action
  updateDescription(value: string) {
    this.todoItem.updateDescription(value);
  }

  @action
  toggleComplete() {
    this.todoItem.toggleComplete();
  }

  protected initialize() {
    this.todoItem = this.props.todoItem;
  }
}

import { action, computed, observable } from 'mobx';
import { injectable } from 'inversify';

import { TodoItem } from '../models/todoItem.model';
import { TodoList } from '../models/todoList.model';
import { ViewModel } from '../../common/viewModels';

interface IProps {
  todoItem: TodoItem;
}

@injectable()
export class TodoItemViewModel extends ViewModel<IProps> {
  private todoItem!: TodoItem;

  @observable editText = '';
  @observable isEditing = false;

  constructor(private readonly todoList: TodoList) {
    super();
  }

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

  @action
  commitEditText() {
    this.todoItem.updateDescription(this.editText);
    this.editText = '';
    this.isEditing = false;
  }

  @action
  toggleComplete() {
    this.todoItem.toggleComplete();
  }

  @action
  deleteItem() {
    this.todoList.deleteItem(this.todoItem);
  }

  protected initialize() {
    this.todoItem = this.props.todoItem;
  }
}

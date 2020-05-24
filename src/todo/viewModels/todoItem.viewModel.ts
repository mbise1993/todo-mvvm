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
    this.todoList.deleteTodoItem(this.todoItem);
  }

  protected initialize() {
    this.todoItem = this.props.todoItem;
  }
}

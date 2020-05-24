import { action, computed } from 'mobx';
import { injectable } from 'inversify';

import { Filter } from '../../common/utils/filiter';
import { TodoItem } from '../models/todoItem.model';
import { TodoList } from '../models/todoList.model';
import { ViewModel } from '../../common/viewModels';

interface Props {
  filter: Filter;
}

@injectable()
export class TodoListViewModel extends ViewModel<Props> {
  constructor(private todoList: TodoList) {
    super();
  }

  @computed
  get items() {
    switch (this.props.filter) {
      case 'active':
        return this.todoList.items.filter(item => !item.data.isComplete);
      case 'completed':
        return this.todoList.items.filter(item => item.data.isComplete);
      default:
        return this.todoList.items;
    }
  }

  @action
  deleteItem(item: TodoItem) {
    this.todoList.deleteTodoItem(item);
  }
}

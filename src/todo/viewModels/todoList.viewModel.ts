import { actionAsync, task } from 'mobx-utils';
import { computed } from 'mobx';
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
        return this.todoList.items.filter(item => !item.data.done);
      case 'completed':
        return this.todoList.items.filter(item => item.data.done);
      default:
        return this.todoList.items;
    }
  }

  @actionAsync
  async deleteItem(item: TodoItem) {
    await task(item.delete());
  }
}

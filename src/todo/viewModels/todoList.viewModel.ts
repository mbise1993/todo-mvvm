import { actionAsync, task } from 'mobx-utils';
import { computed } from 'mobx';
import { injectable } from 'inversify';

import { Filter } from '../../common/utils/filiter';
import { TodoItemService } from '../services/todoItem.service';
import { TodoListService } from '../services/todoList.service';
import { ViewModel } from '../../common/viewModels';

interface Props {
  filter: Filter;
}

@injectable()
export class TodoListViewModel extends ViewModel<Props> {
  constructor(
    private readonly todoListService: TodoListService,
    private readonly todoItemService: TodoItemService,
  ) {
    super();
  }

  @computed
  get items() {
    switch (this.props.filter) {
      case 'active':
        return this.todoListService.items.filter(item => !item.done);
      case 'completed':
        return this.todoListService.items.filter(item => item.done);
      default:
        return this.todoListService.items;
    }
  }

  @actionAsync
  async deleteItem(itemId: string) {
    await task(
      this.todoItemService.deleteItem.execute({
        id: itemId,
      }),
    );
  }
}

import { injectable } from 'inversify';

import { BehaviorSubject } from 'rxjs';
import { Filter } from '../../common/utils/filiter';
import { TodoItemFields } from '../api/todoItemFields.generated';
import { TodoItemService } from '../services/todoItem.service';
import { TodoListService } from '../services/todoList.service';
import { ViewModel } from '../../common/viewModels';

interface Props {
  filter: Filter;
}

@injectable()
export class TodoListViewModel extends ViewModel<Props> {
  items = new BehaviorSubject<TodoItemFields[]>([]);

  constructor(
    private readonly todoListService: TodoListService,
    private readonly todoItemService: TodoItemService,
  ) {
    super();
  }

  async deleteItem(itemId: string) {
    await this.todoItemService.deleteItem.execute({
      id: itemId,
    });
  }

  protected onInit() {
    this.todoListService.items.subscribe(items => {
      this.filterItems(items);
    });
  }

  protected onPropsChanged() {
    this.filterItems(this.items.value);
  }

  private filterItems(items: TodoItemFields[]) {
    switch (this.props.filter) {
      case 'active':
        this.items.next(items.filter(item => !item.done));
        break;
      case 'completed':
        this.items.next(items.filter(item => item.done));
        break;
      default:
        this.items.next(items);
    }
  }
}

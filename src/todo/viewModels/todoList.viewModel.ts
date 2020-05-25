import { injectable } from 'inversify';

import { BehaviorSubject } from 'rxjs';
import { DeleteTodoItemMutation } from '../mutations/deleteTodoItem.mutation';
import { Filter } from '../../common/utils/filiter';
import { GetTodoItemsQuery } from '../queries/getTodoItems.query';
import { MutationExecutor } from '../../common/services/mutationExecutor';
import { TodoItemFields } from '../api/todoItemFields.generated';
import { ViewModel } from '../../common/viewModels';

interface Props {
  filter: Filter;
}

@injectable()
export class TodoListViewModel extends ViewModel<Props> {
  items = new BehaviorSubject<TodoItemFields[]>([]);

  constructor(
    private readonly getTodoItems: GetTodoItemsQuery,
    private readonly mutationExecutor: MutationExecutor,
  ) {
    super();
  }

  async deleteItem(itemId: string) {
    await this.mutationExecutor.execute(
      new DeleteTodoItemMutation({
        id: itemId,
      }),
    );
  }

  protected onInit() {
    this.getTodoItems.items.subscribe(items => {
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

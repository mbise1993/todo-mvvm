import { ContainerModule } from 'inversify';

import { GetTodoItemsQuery } from './queries/getTodoItems.query';
import { TodoItemViewModel } from './viewModels/todoItem.viewModel';
import { TodoListViewModel } from './viewModels/todoList.viewModel';

export const todoModule = new ContainerModule(bind => {
  // Queries
  bind(GetTodoItemsQuery)
    .toSelf()
    .inSingletonScope();

  // View models
  bind(TodoItemViewModel)
    .toSelf()
    .inTransientScope();

  bind(TodoListViewModel)
    .toSelf()
    .inTransientScope();
});

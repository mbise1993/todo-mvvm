import { ContainerModule } from 'inversify';

import { TodoItemViewModel } from './viewModels/todoItem.viewModel';
import { TodoList } from './models/todoList.model';
import { TodoListViewModel } from './viewModels/todoList.viewModel';

export const todoModule = new ContainerModule(bind => {
  bind(TodoList)
    .toSelf()
    .inSingletonScope();

  bind(TodoItemViewModel)
    .toSelf()
    .inTransientScope();

  bind(TodoListViewModel)
    .toSelf()
    .inTransientScope();
});

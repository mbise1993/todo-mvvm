import { ContainerModule } from 'inversify';

import { AppViewModel } from './app/viewModels/app.viewModel';
import { TodoItemService } from './todo/services/todoItem.service';
import { TodoItemViewModel } from './todo/viewModels/todoItem.viewModel';
import { TodoListService } from './todo/services/todoList.service';
import { TodoListViewModel } from './todo/viewModels/todoList.viewModel';

export const loggedInModule = new ContainerModule(bind => {
  // App
  bind(AppViewModel)
    .toSelf()
    .inTransientScope();

  // Todo
  bind(TodoItemService)
    .toSelf()
    .inSingletonScope();

  bind(TodoListService)
    .toSelf()
    .inSingletonScope();

  bind(TodoItemViewModel)
    .toSelf()
    .inTransientScope();

  bind(TodoListViewModel)
    .toSelf()
    .inTransientScope();
});

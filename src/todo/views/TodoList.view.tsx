import React from 'react';
import { useLocation } from 'react-router';

import { getFilterFromPath } from '../../common/utils/filiter';
import { TodoItemView } from './TodoItem.view';
import { TodoListViewModel } from '../viewModels/todoList.viewModel';
import { useObservable, useViewModel } from '../../common/hooks';

export const TodoListView: React.FC = () => {
  const location = useLocation();
  const vm = useViewModel(TodoListViewModel, {
    filter: getFilterFromPath(location.pathname),
  });

  const items = useObservable(vm.$filteredItems, []);

  return (
    <ul className="todo-list">
      {/* <!-- List items should get the class `editing` when editing and `completed` when marked as completed --> */}
      {items.map(item => (
        <TodoItemView key={item.id} todoItem={item} />
      ))}
    </ul>
  );
};

import React from 'react';

import { TodoItemView } from './TodoItem.view';
import { TodoListViewModel } from '../viewModels/todoList.viewModel';
import { useViewModel } from '../../common/hooks';

export const TodoListView: React.FC = () => {
  const vm = useViewModel(TodoListViewModel, null);

  return (
    <ul className="todo-list">
      {/* <!-- List items should get the class `editing` when editing and `completed` when marked as completed --> */}
      {vm.items.map(item => (
        <TodoItemView key={item.data.id} todoItem={item} />
      ))}
    </ul>
  );
};

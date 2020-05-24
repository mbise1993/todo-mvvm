import React from 'react';
import { observer } from 'mobx-react';

import { TodoItem } from '../models/todoItem.model';
import { TodoItemViewModel } from '../viewModels/todoItem.viewModel';
import { useViewModel } from '../../common/hooks';

interface Props {
  todoItem: TodoItem;
}

export const TodoItemView: React.FC<Props> = observer(({ todoItem }) => {
  const vm = useViewModel(TodoItemViewModel, {
    todoItem,
  });

  return (
    <li className="completed">
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={vm.isComplete}
          onClick={() => vm.toggleComplete()}
        />
        <label>{vm.description}</label>
        <button className="destroy"></button>
      </div>
      <input className="edit" value="Create a TodoMVC template" />
    </li>
  );
});

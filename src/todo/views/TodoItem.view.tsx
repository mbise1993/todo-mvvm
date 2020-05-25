import React from 'react';

import { TodoItemFields } from '../api/todoItemFields.generated';
import { TodoItemViewModel } from '../viewModels/todoItem.viewModel';
import { useObserve, useReactiveViewModel } from '../../common/hooks';

interface Props {
  todoItem: TodoItemFields;
}

export const TodoItemView: React.FC<Props> = ({ todoItem }) => {
  const vm = useReactiveViewModel(TodoItemViewModel, {
    todoItem,
  });

  useObserve(vm.isEditing);
  useObserve(vm.editText);

  const onKeyDown = async (e: React.KeyboardEvent) => {
    // Enter
    if (e.keyCode === 13) {
      await vm.commitEditText();
    }
  };

  let className = '';
  if (vm.isEditing.value) {
    className += 'editing';
  }

  if (vm.todoItem.done) {
    className += ' complete';
  }

  return (
    <li className={className} onDoubleClick={() => vm.startEditing()}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todoItem.done}
          onChange={() => vm.toggleComplete()}
        />
        <label>{vm.todoItem.task}</label>
        <button className="destroy" onClick={() => vm.deleteItem()}></button>
      </div>
      <input
        className="edit"
        value={vm.editText.value}
        onChange={e => vm.editText.next(e.target.value)}
        onKeyDown={onKeyDown}
      />
    </li>
  );
};

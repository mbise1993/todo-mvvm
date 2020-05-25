import React from 'react';

import { TodoItemFields } from '../api/todoItemFields.generated';
import { TodoItemViewModel } from '../viewModels/todoItem.viewModel';
import { useObserve, useViewModel } from '../../common/hooks';

interface Props {
  todoItem: TodoItemFields;
}

export const TodoItemView: React.FC<Props> = ({ todoItem }) => {
  const vm = useViewModel(TodoItemViewModel, {
    todoItem,
  });

  useObserve(vm.editText);
  useObserve(vm.isEditing);

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

  if (vm.isComplete) {
    className += ' complete';
  }

  return (
    <li className={className} onDoubleClick={() => vm.startEditing()}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={vm.isComplete}
          onChange={() => vm.toggleComplete()}
        />
        <label>{vm.description}</label>
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

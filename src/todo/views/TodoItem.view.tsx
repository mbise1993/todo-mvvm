import React from 'react';
import { observer } from 'mobx-react';

import { TodoItemFields } from '../api/todoItemFields.generated';
import { TodoItemViewModel } from '../viewModels/todoItem.viewModel';
import { useViewModel } from '../../common/hooks';

interface Props {
  todoItem: TodoItemFields;
}

export const TodoItemView: React.FC<Props> = observer(({ todoItem }) => {
  const vm = useViewModel(TodoItemViewModel, {
    todoItem,
  });

  const onKeyDown = (e: React.KeyboardEvent) => {
    // Enter
    if (e.keyCode === 13) {
      vm.commitEditText();
    }
  };

  let className = '';
  if (vm.isEditing) {
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
        value={vm.editText}
        onChange={e => (vm.editText = e.target.value)}
        onKeyDown={onKeyDown}
      />
    </li>
  );
});

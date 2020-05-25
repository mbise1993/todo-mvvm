import React from 'react';

import { AppViewModel } from '../viewModels/app.viewModel';
import { TodoListFooter } from '../../todo/views/TodoListFooter.view';
import { TodoListView } from '../../todo/views/TodoList.view';
import { useBindReadonly, useObserve, useViewModel } from '../../common/hooks';

export const AppView: React.FC = () => {
  const vm = useViewModel(AppViewModel, null);

  useObserve(vm.newItemText);
  useObserve(vm.toggleAllChecked);
  const hasItems = useBindReadonly(vm.hasItems);
  const itemsLeftCount = useBindReadonly(vm.itemsLeftCount);

  const onKeyDown = (e: React.KeyboardEvent) => {
    // Enter
    if (e.keyCode === 13) {
      vm.addItem();
    }
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <input
          autoFocus
          className="new-todo"
          placeholder="What needs to be done?"
          value={vm.newItemText.value}
          onChange={e => vm.newItemText.next(e.target.value)}
          onKeyDown={onKeyDown}
        />
      </header>
      {/* <!-- This section should be hidden by default and shown when there are todos --> */}
      {hasItems && (
        <section className="main">
          <input
            id="toggle-all"
            className="toggle-all"
            type="checkbox"
            checked={vm.toggleAllChecked.value}
            onChange={() => vm.toggleAll()}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <TodoListView />
        </section>
      )}
      {/* <!-- This footer should hidden by default and shown when there are todos --> */}
      <TodoListFooter
        itemsLeft={itemsLeftCount}
        onClearCompletedClick={() => vm.clearCompletedItems()}
      />
    </section>
  );
};

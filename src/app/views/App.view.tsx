import React from 'react';

import { AppViewModel } from '../viewModels/app.viewModel';
import { TodoListFooter } from '../../todo/views/TodoListFooter.view';
import { TodoListView } from '../../todo/views/TodoList.view';
import { useObservable, useReactiveViewModel } from '../../common/hooks';

export const AppView: React.FC = () => {
  const vm = useReactiveViewModel(AppViewModel);

  const newItemText = useObservable(vm.newItemText, '');
  const isToggleAllChecked = useObservable(vm.toggleAllChecked, false);
  const hasItems = useObservable(vm.hasItems, false);
  const itemsLeftCount = useObservable(vm.itemsLeftCount, 0);

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
          value={newItemText}
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
            checked={isToggleAllChecked}
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

import React from 'react';
import { observer } from 'mobx-react';

import { AppViewModel } from '../viewModels/app.viewModel';
import { TodoListFooter } from '../../todo/views/TodoListFooter.view';
import { TodoListView } from '../../todo/views/TodoList.view';
import { useViewModel } from '../../common/hooks';

export const AppView: React.FC = observer(() => {
  const vm = useViewModel(AppViewModel, null);

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
          value={vm.newItemText}
          onChange={e => (vm.newItemText = e.target.value)}
          onKeyDown={onKeyDown}
        />
      </header>
      {/* <!-- This section should be hidden by default and shown when there are todos --> */}
      {vm.hasItems && (
        <section className="main">
          <input
            id="toggle-all"
            className="toggle-all"
            type="checkbox"
            checked={vm.toggleAllChecked}
            onChange={() => vm.toggleAll()}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <TodoListView />
        </section>
      )}
      {/* <!-- This footer should hidden by default and shown when there are todos --> */}
      <TodoListFooter
        itemsLeft={vm.itemsLeft}
        onClearCompletedClick={() => vm.clearCompletedItems()}
      />
    </section>
  );
});

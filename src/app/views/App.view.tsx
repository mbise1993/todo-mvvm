import React from 'react';

import { AppPresenter } from '../presenters/app.presenter';
import { TodoListFooter } from '../../todo/views/TodoListFooter.view';
import { TodoListView } from '../../todo/views/TodoList.view';
import { useViewModel } from '../../common/hooks';

export const AppView: React.FC = () => {
  const vm = useViewModel(AppPresenter, null);

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <input autoFocus className="new-todo" placeholder="What needs to be done?" />
      </header>
      {/* <!-- This section should be hidden by default and shown when there are todos --> */}
      {vm.hasItems && (
        <section className="main">
          <input id="toggle-all" className="toggle-all" type="checkbox" />
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
};

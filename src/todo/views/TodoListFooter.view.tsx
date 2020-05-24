import React from 'react';

interface Props {
  itemsLeft: number;
  onClearCompletedClick(): void;
}

export const TodoListFooter: React.FC<Props> = ({ itemsLeft, onClearCompletedClick }) => {
  return (
    <footer className="footer">
      {/* <!-- This should be `0 items left` by default --> */}
      <span className="todo-count">
        <strong>{itemsLeft}</strong> item left
      </span>
      {/* <!-- Remove this if you don't implement routing --> */}
      <ul className="filters">
        <li>
          <a className="selected" href="#/">
            All
          </a>
        </li>
        <li>
          <a href="#/active">Active</a>
        </li>
        <li>
          <a href="#/completed">Completed</a>
        </li>
      </ul>
      {/* <!-- Hidden if no completed items are left ↓ --> */}
      <button className="clear-completed" onClick={onClearCompletedClick}>
        Clear completed
      </button>
    </footer>
  );
};

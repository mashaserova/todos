import React from 'react';
import PropTypes from 'prop-types';
import TaskList from './task-list';

const Main = ({ todos = [], toggleCheckbox, deleteTask, filter = 'all', setTodos }) => {
  const filteredTodos =
    filter === 'all'
      ? todos
      : filter === 'active'
        ? todos.filter((todo) => !todo.isCompleted)
        : todos.filter((todo) => todo.isCompleted);

  return (
    <section className="main">
      <TaskList todos={filteredTodos} toggleCheckbox={toggleCheckbox} deleteTask={deleteTask} setTodos={setTodos} />
    </section>
  );
};
Main.propTypes = {
  todos: PropTypes.array.isRequired,
  toggleCheckbox: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  setTodos: PropTypes.func.isRequired,
};

export default Main;

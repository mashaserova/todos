import React from 'react';
import PropTypes from 'prop-types';
import TaskList from './task-list';

const Main = ({ todos, toggleCheckbox, deleteTask, filter = 'all', setTodos }) => {
  
  const filteredTodos = () => {
    if (filter === 'all') {
      return todos
    } else if (filter === 'active') {
      return todos.filter((todo) => !todo.isCompleted)
    } else {
      return todos.filter((todo) => todo.isCompleted)
    }
  }
  return (
    <section className="main">
      <TaskList todos={filteredTodos()} toggleCheckbox={toggleCheckbox} deleteTask={deleteTask} setTodos={setTodos} />
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

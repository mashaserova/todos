import React from 'react';
import PropTypes from 'prop-types';
import Task from './task';

const TaskList = ({ todos, toggleCheckbox, deleteTask, setTodos }) => {
  return (
    <ul className="todo-list">
      {todos.map((task) => (
        <Task
          key={task.id}
          task={task.text}
          isCompleted={task.isCompleted}
          toggleCheckbox={() => toggleCheckbox(task.id)}
          deleteTask={() => deleteTask(task.id)}
          whenTaskCreated={task.whenTaskCreated}
          setTodos={setTodos}
        />
      ))}
    </ul>
  );
};
TaskList.propTypes = {
  todos: PropTypes.array.isRequired,
  toggleCheckbox: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  setTodos: PropTypes.func.isRequired,
};

export default TaskList;

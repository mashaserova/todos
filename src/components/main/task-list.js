import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Task from './task';

const TaskList = ({ todos = [], toggleCheckbox, deleteTask, setTodos }) => {
  const [isEditing, setIsEditing] = useState(false);
  const handleEdit = (index) => {
    setIsEditing(index);
  };
  const handleSave = (index, newTask) => {
    setTodos((prevTodos) => {
      return prevTodos.map((task, i) => {
        if (i === index) {
          return { ...task, text: newTask, isEditing: false };
        } else {
          return task;
        }
      });
    });
    setIsEditing(false);
  };
  return (
    <ul className="todo-list">
      {todos.map((task, index) => (
        <Task
          key={index}
          task={task.text}
          isCompleted={task.isCompleted}
          isEditing={isEditing === index}
          toggleCheckbox={() => toggleCheckbox(index)}
          deleteTask={() => deleteTask(index)}
          index={index}
          whenTaskCreated={task.whenTaskCreated}
          setTodos={setTodos}
          handleEdit={() => handleEdit(index)}
          handleSave={(newTask) => handleSave(index, newTask)}
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

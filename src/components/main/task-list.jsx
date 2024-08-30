import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Task from './task';

const TaskList = ({ todos = [], toggleCheckbox, deleteTask, setTodos }) => {
  const [isEditing, setIsEditing] = useState(null); //id редактируемой задачи
  const handleEdit = (id) => {
    setIsEditing(id);
  };
  const handleSave = (id, newTask) => {
    setTodos((prevTodos) => {
      return prevTodos.map((task) => {
        if (task.id === id) {
          return { ...task, text: newTask, isEditing: null };
        } else {
          return task;
        }
      });
    });
    setIsEditing(null);
  };
  return (
    <ul className="todo-list">
      {todos.map((task) => (
        <Task
          key={task.id}
          task={task.text}
          isCompleted={task.isCompleted}
          isEditing={isEditing === task.id}
          toggleCheckbox={() => toggleCheckbox(task.id)}
          deleteTask={() => deleteTask(task.id)}
          whenTaskCreated={task.whenTaskCreated}
          setTodos={setTodos}
          handleEdit={() => handleEdit(task.id)}
          handleSave={(newTask) => handleSave(task.id, newTask)}
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

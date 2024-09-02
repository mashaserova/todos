import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SearchPanel = ({ handleAddTask }) => {
  const [newTask, setNewTask] = useState('');
  //функция, которая изменяет текст задачи
  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && newTask.trim() !== '') {
      handleAddTask(newTask);
      setNewTask('');
      event.target.value = '';
    }
  }
  return (
    <input
      className="new-todo"
      placeholder="What needs to be done?"
      autoFocus
      value={newTask}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
    />
  );
};

SearchPanel.propTypes = {
  handleAddTask: PropTypes.func
};

export default SearchPanel;

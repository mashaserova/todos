import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SearchPanel = ({ handleAddTask }) => {
  const [newTask, setNewTask] = useState('');
  
  const handleSubmit = (event) => {
    if (newTask.trim() !== '') {
      event.preventDefault();
      handleAddTask(newTask);
      setNewTask('');
      console.log(newTask)
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        value={newTask}
        onChange={(event) => setNewTask(event.target.value)}
        required
      />
    </form>
  );
};

SearchPanel.propTypes = {
  handleAddTask: PropTypes.func
};

export default SearchPanel;

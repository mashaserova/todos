import React from 'react';
import PropTypes from 'prop-types';

const SearchPanel = ({ newTask, handleInputChange, handleAddTask }) => {
  return (
    <input
      className="new-todo"
      placeholder="What needs to be done?"
      autoFocus
      value={newTask}
      onChange={handleInputChange}
      onKeyDown={handleAddTask}
    />
  );
};

SearchPanel.propTypes = {
  newTask: PropTypes.string,
  handleInputChange: PropTypes.func.isRequired,
  handleAddTask: PropTypes.func.isRequired,
};

export default SearchPanel;

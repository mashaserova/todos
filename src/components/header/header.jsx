import React from 'react';
import PropTypes from 'prop-types';
import SearchPanel from './search-panel';

const Header = ({ newTask, handleInputChange, handleAddTask }) => {
  return (
    <header className="header">
      <h1>todos</h1>
      <SearchPanel newTask={newTask} handleInputChange={handleInputChange} handleAddTask={handleAddTask} />
    </header>
  );
};
Header.propTypes = {
  newTask: PropTypes.string,
  handleInputChange: PropTypes.func.isRequired,
  handleAddTask: PropTypes.func.isRequired,
};
export default Header;

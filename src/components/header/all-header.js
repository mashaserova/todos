import React from 'react';
import PropTypes from 'prop-types';
import AppHeading from './app-heading';
import SearchPanel from './search-panel';

const Header = ({newTask = '', handleInputChange, handleAddTask}) => {
    return (
        <header className="header">
            <AppHeading />
            <SearchPanel
                newTask={newTask} 
                handleInputChange={handleInputChange}
                handleAddTask={handleAddTask}
                />
        </header>
    )
}
Header.propTypes = {
    newTask: PropTypes.string,
    handleInputChange: PropTypes.func.isRequired,
    handleAddTask: PropTypes.func.isRequired,
}
export default Header 
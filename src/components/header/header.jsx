import React from 'react';
import PropTypes from 'prop-types';
import SearchPanel from './search-panel';
import './header.css';

const Header = ({ handleAddTask }) => {
    return (
        <header className="header">
            <h1>todos</h1>
            <SearchPanel handleAddTask={handleAddTask} />
        </header>
    );
};
Header.propTypes = {
    handleAddTask: PropTypes.func,
};
export default Header;

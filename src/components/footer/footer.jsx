import React from 'react';
import PropTypes from 'prop-types';
import Filters from './filters';
import './footer.css';
const Footer = ({ count, filter = 'all', handleFilterChange, clearCompleted }) => {
    return (
        <footer className="footer">
            <span className="todo-count">{count} items left</span>
            <Filters filter={filter} handleFilterChange={handleFilterChange} />
            <button className="clear-completed" onClick={clearCompleted}>
                Clear completed
            </button>
        </footer>
    );
};
Footer.propTypes = {
    filter: PropTypes.string.isRequired,
    handleFilterChange: PropTypes.func.isRequired,
    clearCompleted: PropTypes.func.isRequired,
};

export default Footer;

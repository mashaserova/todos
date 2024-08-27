import React from 'react';
import PropTypes from 'prop-types';

const Filters = ({ filter = 'all', setFilter }) => {
    const handleFilterChange = (filterType) => {
        setFilter(filterType)
    }
    return (
        <ul className="filters">
            <li>
                <button 
                    className={filter === 'all' ? 'selected' : ''}
                    onClick={() => handleFilterChange('all')}
                >   All
                </button>
            </li>
            <li>
                <button
                    className={filter === 'active' ? 'selected' : ''}
                    onClick={() => handleFilterChange('active')}
                >   
                    Active
                </button>
            </li>
            <li>
                <button
                    className={filter === 'completed' ? 'selected' : ''}
                    onClick={() => handleFilterChange('completed')}
                >
                    Completed
                </button>
            </li>
        </ul>
    );
};
Filters.propTypes = {
    filter: PropTypes.string.isRequired,
    setFilter: PropTypes.func.isRequired,
}
export default Filters
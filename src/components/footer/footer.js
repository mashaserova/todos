import React from 'react';
import PropTypes from 'prop-types';
import Filters from './filters';
import Count from './count';
const Footer = ({ itemCount = 0, filter = 'all', setFilter, clearCompleted }) => {
  return (
    <footer className="footer">
      <Count items={itemCount} />
      <Filters filter={filter} setFilter={setFilter} />
      <button className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
};
Footer.propTypes = {
  itemCount: PropTypes.number.isRequired,
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
};

export default Footer;

import React from 'react';
import PropTypes from 'prop-types';
const Count = ({ items = 0 }) => {
  return <span className="todo-count">{items} items left</span>;
};
Count.propTypes = {
  items: PropTypes.number.isRequired,
};
export default Count;

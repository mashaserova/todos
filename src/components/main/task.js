import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

const Task = ({
  isCompleted = false,
  isEditing = false,
  task = '',
  toggleCheckbox,
  deleteTask,
  index = 0,
  whenTaskCreated = new Date(),
  setTodos,
}) => {
  const formattedTime = formatDistanceToNow(whenTaskCreated, { addSuffix: true });
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const handleEdit = () => {
    setEditing(true);
  };
  const handleSave = () => {
    setTodos((prevTodos) => {
      return prevTodos.map((t, i) => {
        if (i === index) {
          return { ...t, text: inputRef.current.value, isEditing: false };
        } else {
          return t;
        }
      });
    });
    setEditing(false);
  };
  return (
    <li key={index} className={isCompleted ? 'completed' : isEditing ? 'editing' : ''}>
      {editing && (
        <input
          className="edit"
          ref={inputRef}
          defaultValue={task}
          autoFocus
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSave();
            }
          }}
        />
      )}
      {!editing && (
        <div className="view">
          <input className="toggle" type="checkbox" checked={isCompleted} onChange={() => toggleCheckbox(index)} />
          <label>
            <span className="description">{task}</span>
            <span className="created">{formattedTime}</span>
          </label>
          <button className="icon icon-edit" onClick={handleEdit}></button>
          <button className="icon icon-destroy" onClick={() => deleteTask(index)}></button>
        </div>
      )}
    </li>
  );
};

Task.propTypes = {
  isCompleted: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool.isRequired,
  task: PropTypes.string.isRequired,
  toggleCheckbox: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  whenTaskCreated: PropTypes.object.isRequired,
  setTodos: PropTypes.func.isRequired,
};

export default Task;

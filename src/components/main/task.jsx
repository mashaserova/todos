import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

const Task = ({
  id,
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
  const [editedTask, setEditedTask] = useState(task);
  const handleEdit = () => {
    setEditing(true);
  };
  const handleSave = (editedTask) => {
    setTodos((prevTodos) => {
      return prevTodos.map((task) => {
        if (task.id === id) {
          console.log(editedTask)
          return { ...task, text: editedTask, isEditing: false };
        } else {
          return task;
        }
      });
    });
    setEditing(false);
  };

  const handleInputChange = (event) => {
    setEditedTask(event.target.value);
  }
  return (
    <li id={id} className={isCompleted ? 'completed' : isEditing ? 'editing' : ''}>
      {editing ? (
        <input
          className="edit"
          value={editedTask}
          onChange={handleInputChange}
          autoFocus
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleSave(event.target.value);
            }
          }}
        />
      ) : (
        <div className="view">
          <input className="toggle" type="checkbox" checked={isCompleted} onChange={() => toggleCheckbox(index)} />
          <label>
            <span className="description">{editedTask}</span>
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
  isCompleted: PropTypes.bool,
  isEditing: PropTypes.bool,
  task: PropTypes.string.isRequired,
  toggleCheckbox: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  index: PropTypes.number,
  whenTaskCreated: PropTypes.object.isRequired,
  setTodos: PropTypes.func.isRequired,
};

export default Task;

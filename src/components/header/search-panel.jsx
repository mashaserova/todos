import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SearchPanel = ({ handleAddTask }) => {
    const [newTask, setNewTask] = useState('');
    const [minutes, setMinutes] = useState('');
    const [seconds, setSeconds] = useState('');

    const handleSubmit = (event) => {
        if (newTask.trim() !== '') {
            event.preventDefault();
            handleAddTask(newTask, minutes, seconds);
            setNewTask('');
            setMinutes('');
            setSeconds('');
        }
    };
    return (
        <form onSubmit={handleSubmit} className="new-todo-form">
            <input
                className="new-todo"
                placeholder="What needs to be done?"
                autoFocus
                value={newTask}
                onChange={(event) => setNewTask(event.target.value)}
                required
            />
            <input
                className="new-todo-form__timer"
                type="number"
                id="minutes-input"
                placeholder="Min"
                min="0"
                value={minutes}
                onChange={(event) => setMinutes(event.target.value)}
                required
            />
            <input 
                className="new-todo-form__timer"
                type="number"
                id="seconds-input"
                placeholder="Sec"
                min="0" max="59"
                value={seconds}
                onChange={(event) => setSeconds(event.target.value)}
                required
            />
            <button id="add-task" type="submit"></button>
        </form>
    );
};

SearchPanel.propTypes = {
    handleAddTask: PropTypes.func,
};

export default SearchPanel;

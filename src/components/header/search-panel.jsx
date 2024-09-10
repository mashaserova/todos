import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SearchPanel = ({ handleAddTask }) => {
    const [newTask, setNewTask] = useState('');
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const handleSubmit = (event) => {
        if (newTask.trim() !== '') {
            event.preventDefault();
            handleAddTask(newTask, minutes, seconds);
            setNewTask('');
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
                placeholder="Минуты"
                min="0"
                onChange={(event) => setMinutes(event.target.value)}
                required
            />
            <input 
                className="new-todo-form__timer"
                type="number"
                id="seconds-input"
                placeholder="Секунды"
                min="0" max="59"
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

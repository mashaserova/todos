import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

const Task = ({
    id,
    isCompleted = false,
    isEditing = false,
    task = '',
    toggleCheckbox,
    deleteTask,
    whenTaskCreated = new Date(),
    handleTodosChange,
    timers,
    startTimer,
    stopTimer,
}) => {
    const formattedTime = formatDistanceToNow(whenTaskCreated, { addSuffix: true });
    const [editing, setEditing] = useState(false);
    const [editedTask, setEditedTask] = useState(task);
    const [previousTask, setPreviousTask] = useState(task);
    const [secondsLeft, setSecondsLeft] = useState(timers && timers[id] ? timers[id] : 0);

    const handleEdit = () => {
        setPreviousTask(editedTask);
        setEditing(true);
    };
    const handleSave = (event) => {
        if (event) {
            event.preventDefault();
        }
        if (editedTask.trim() === '') {
            setEditedTask(previousTask);
        }
        handleTodosChange((prevTodos) => {
            return prevTodos.map((task) => {
                if (task.id === id) {
                    return { ...task, text: editedTask, isEditing: false };
                } else {
                    return task;
                }
            });
        });
        setEditing(false);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        handleSave(event);
    };
    const handleInputChange = (event) => {
        setEditedTask(event.target.value);
    };

    const formattedTimer = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secondsLeft = seconds % 60;
        return `${minutes}:${secondsLeft}`
    }

    const handleStartTimer = () => {
        startTimer(id);
    };
    
    const handleStopTimer = () => {
        stopTimer(id); 
    };
    useEffect(() => {
        if (timers[id]) { // Проверяем, существует ли timers[id]
            setSecondsLeft(timers[id]);
        }
    }, [timers, id]);
    useEffect(() => {
        setEditedTask(task);
        setPreviousTask(task);
    }, [task]);
    let liClassName = '';
    if (isCompleted) {
        liClassName = 'completed';
    } else if (isEditing) {
        liClassName = 'editing';
    }
    return (
        <li className={liClassName}>
            {editing ? (
                <form onSubmit={(event) => handleSubmit(event)}>
                    <input className="edit" value={editedTask} onChange={handleInputChange} autoFocus required />
                </form>
            ) : (
                <div className="view">
                    <input
                        className="toggle"
                        type="checkbox"
                        checked={isCompleted}
                        onChange={() => toggleCheckbox(id)}
                    />
                    <label>
                        <span className="description">{editedTask}</span>
                        <>
                            {timers[id] && timers[id] > 0 ? (
                                <span className="timer">
                                    <button className="icon icon-play" onClick={handleStartTimer}></button>
                                    <button className="icon icon-pause" onClick={handleStopTimer}></button>
                                    {formattedTimer(secondsLeft)}
                                </span>
                            ) : (
                                <span className="timer">
                                    Время вышло!
                                </span>
                            )}
                        </>
                        <span className="created">{formattedTime}</span>
                    </label>
                    <button className="icon icon-edit" onClick={handleEdit}></button>
                    <button className="icon icon-destroy" onClick={() => deleteTask(id)}></button>
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
    handleTodosChange: PropTypes.func.isRequired,
};

export default Task;

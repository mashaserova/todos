import React from 'react';
import PropTypes from 'prop-types';
import Task from './task';

const TaskList = ({ todos, toggleCheckbox, deleteTask, handleTodosChange, timers, startTimer, stopTimer, }) => {
    return (
        <ul className="todo-list">
            {todos.map((task) => (
                <Task
                    key={task.id}
                    id={task.id}
                    task={task.text}
                    isCompleted={task.isCompleted}
                    toggleCheckbox={() => toggleCheckbox(task.id)}
                    deleteTask={() => deleteTask(task.id)}
                    whenTaskCreated={task.whenTaskCreated}
                    handleTodosChange={handleTodosChange}
                    timerInSeconds={task.timerInSeconds}
                    timers={timers}
                    startTimer={startTimer}
                    stopTimer={stopTimer}
                />
            ))}
        </ul>
    );
};
TaskList.propTypes = {
    todos: PropTypes.array.isRequired,
    toggleCheckbox: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
    handleTodosChange: PropTypes.func.isRequired,
};

export default TaskList;

import React from 'react';
import PropTypes from 'prop-types';
import TaskList from './task-list';
import './main.css';

const Main = ({ todos, toggleCheckbox, deleteTask, filter = 'all', handleTodosChange, timers, startTimer, stopTimer, }) => {
    const filteredTodos = () => {
        if (filter === 'all') {
            return todos;
        } else if (filter === 'active') {
            return todos.filter((todo) => !todo.isCompleted);
        } else {
            return todos.filter((todo) => todo.isCompleted);
        }
    };
    return (
        <section className="main">
            <TaskList
                todos={filteredTodos()}
                toggleCheckbox={toggleCheckbox}
                deleteTask={deleteTask}
                handleTodosChange={handleTodosChange}
                timers={timers}
                startTimer={startTimer}
                stopTimer={stopTimer}
            />
        </section>
    );
};
Main.propTypes = {
    todos: PropTypes.array.isRequired,
    toggleCheckbox: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired,
    handleTodosChange: PropTypes.func.isRequired,
};

export default Main;

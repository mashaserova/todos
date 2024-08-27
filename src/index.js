import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Header from './components/header/all-header';
import Main from './components/main/main';
import './index.css'
import Footer from './components/footer/footer';

const App = () => {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState('all');

    const toggleCheckbox = (index) => {
        setTodos(prevTodos => {
            return prevTodos.map((task, i) => {
                if (i === index) {
                    return {...task, isCompleted: !task.isCompleted}
                } else {
                    return task
                }
            });
        });
    };

    const deleteTask = (index) => {
        setTodos(prevTodos => {
            prevTodos.splice(index, 1);
            return [...prevTodos]; 
        });
    };

    const [newTask, setNewTask] = useState('');

    const handleInputChange = (event) => {
        setNewTask(event.target.value);
    };
    const handleAddTask = (event) => {
        if (event.key === 'Enter' && newTask.trim() !== '') {
            setTodos(prevTodos => [
                ...prevTodos,
                {text: newTask, isCompleted: false, isEditing: false, whenTaskCreated: new Date() }
            ]);
            setNewTask('');
            event.target.value = '';
        }
    };
    const clearCompleted = () => {
        setTodos(prevTodos => prevTodos.filter(task => !task.isCompleted));
    };

    return (
        <section className="todoapp">
            <Header
                value={newTask}
                handleInputChange={handleInputChange}
                handleAddTask={handleAddTask}
            />
            <Main 
                todos={todos}
                toggleCheckbox={toggleCheckbox}
                deleteTask={deleteTask}
                
                filter={filter}
                setTodos={setTodos}
            />
            <Footer 
                itemCount={todos.length}
                filter={filter}
                setFilter={setFilter}
                clearCompleted={clearCompleted}
            />
        </section>
    );
}

createRoot(document.querySelector('.root')).render(<App />)
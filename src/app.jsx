import React, { useCallback, useEffect, useState } from 'react';
import { v4 as idGenerator } from 'uuid';
import Header from './components/header/header';
import Main from './components/main/main';
import Footer from './components/footer/footer';

const App = () => {
    //все хуки и переменные
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState('all');
    const [count, setCount] = useState(0);
    const [timers, setTimers] = useState({});

    //функция, которая изменяет todos по клику на checkbox
    const toggleCheckbox = (id) => {
        setTodos((prevTodos) => {
            return prevTodos.map((task) => {
                if (task.id === id) {
                    return { ...task, isCompleted: !task.isCompleted };
                } else {
                    return task;
                }
            });
        });
        itemCount();
    };

    //функция, которая удаляет задачу из todos по id
    const deleteTask = (id) => {
        setTodos((prevTodos) => {
            return prevTodos.filter((task) => task.id !== id);
        });
        itemCount();
    };

    //функция, которая добавляет измененную задачу
    const handleAddTask = (text, minutes, seconds) => {
        if (text.trim() !== '') {
            const timerInSeconds = (minutes * 60) + Number(seconds)
            const newId = idGenerator();
            setTodos((prevTodos) => [
                ...prevTodos,
                {
                    id: newId,
                    text,
                    isCompleted: false,
                    isEditing: false,
                    whenTaskCreated: new Date(),
                    timerInSeconds: timerInSeconds,
                },
            ]);
            setTimers((prevTimers) => ({...prevTimers, [newId]: timerInSeconds}));
            itemCount();
        }
    };
    //функция, которая очищает задачи от выполненных
    const clearCompleted = () => {
        setTodos((prevTodos) => prevTodos.filter((task) => !task.isCompleted));
        itemCount();
    };

    //функция подсчета количества задач
    const itemCount = useCallback(() => {
        setCount(todos.filter((task) => !task.isCompleted).length);
    }, [todos]);

    useEffect(() => itemCount(), [todos, itemCount]);

    const handleTodosChange = (newTodos) => {
        setTodos(newTodos);
        setTimers((prevTimers) => {
            const newTimers = { ...prevTimers };
            newTodos.forEach((task) => {
                if (!task.isCompleted) {
                    newTimers[task.id] = prevTimers[task.id] || task.timerInSeconds;
                }
            });
            return newTimers
        })
    };
    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    };

    const startTimer = (id) => {
        setTimers((prevTimers) => {
            return {...prevTimers, [id]: prevTimers[id] || 0}
        });
    };

    const stopTimer = (id) => {
        setTimers((prevTimers) => {
            return {prevTimers, [id]: 0}
        });
    };

    useEffect(() => {
        const activeTimers = todos.filter((task) => !task.isCompleted).map((task) => task.id);
        const intervalId = setInterval(() => {
            setTimers((prevTimers) => {
                const newTimers = { ...prevTimers };
                activeTimers.forEach((id) => {
                    if (newTimers[id] > 0) {
                        newTimers[id] -= 1;
                    }
                });
                return newTimers;
            });
        }, 1000);
        return () => clearInterval(intervalId);
    }, [todos]);
    return (
        <section className="todoapp">
            <Header handleAddTask={handleAddTask} />
            <Main
                todos={todos}
                toggleCheckbox={toggleCheckbox}
                deleteTask={deleteTask}
                filter={filter}
                handleTodosChange={handleTodosChange}
                timers={timers}
                startTimer={startTimer}
                stopTimer={stopTimer}
            />
            <Footer
                count={count}
                filter={filter}
                handleFilterChange={handleFilterChange}
                clearCompleted={clearCompleted}
            />
        </section>
    );
};

export default App;

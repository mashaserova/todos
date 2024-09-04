import React, { useCallback, useEffect, useState } from 'react';
import { v4 as idGenerator} from 'uuid';
import Header from './components/header/header';
import Main from './components/main/main';
import Footer from './components/footer/footer';

const App = () => {
  //все хуки и переменные
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [count, setCount] = useState(0);

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
  const handleAddTask = (text) => {
    if (text.trim() !== "") {
      setTodos((prevTodos) => [
        ...prevTodos,
        {
          id: idGenerator(),
          text,
          isCompleted: false,
          isEditing: false,
          whenTaskCreated: new Date(),
        },
      ]);
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
  };
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  }
  return (
    <section className="todoapp">
      <Header handleAddTask={handleAddTask} />
      <Main todos={todos} toggleCheckbox={toggleCheckbox} deleteTask={deleteTask} filter={filter} handleTodosChange={handleTodosChange} />
      <Footer count={count} filter={filter} handleFilterChange={handleFilterChange} clearCompleted={clearCompleted} />
    </section>
  );
};

export default App;

import React, { useCallback, useEffect, useState } from 'react';
import { v4 as idGenerator} from 'uuid';
import Header from './components/header/header';
import Main from './components/main/main';
import Footer from './components/footer/footer';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [newTask, setNewTask] = useState('');
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

  //функция, которая изменяет текст задачи
  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };
  //функция, которая добавляет измененную задачу
  const handleAddTask = (event) => {
    if (event.key === 'Enter' && event.target.value.trim() !== 0) {
      setTodos((prevTodos) => [
        ...prevTodos,
        {
          id: idGenerator(),
          text: newTask,
          isCompleted: false,
          isEditing: false,
          whenTaskCreated: new Date(),
        },
      ]);
      setNewTask('');
      event.target.value = '';
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
  
  return (
    <section className="todoapp">
      <Header value={newTask} handleInputChange={handleInputChange} handleAddTask={handleAddTask} />
      <Main todos={todos} toggleCheckbox={toggleCheckbox} deleteTask={deleteTask} filter={filter} setTodos={setTodos} />
      <Footer count={count} filter={filter} setFilter={setFilter} clearCompleted={clearCompleted} />
    </section>
  );
};

export default App;

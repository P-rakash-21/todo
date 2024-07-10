import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get('https://todo-j6kl.onrender.com/todos');
      setTodos(res.data);
    } catch (err) {
      console.error('Error fetching todos:', err);
    }
  };

  const addTodo = async () => {
    try {
      const res = await axios.post('https://todo-j6kl.onrender.com/todos', { task });
      setTodos([...todos, res.data]);
      setTask('');
    } catch (err) {
      console.error('Error adding todo:', err);
    }
  };

  const updateTodo = async (id, updatedTask) => {
    try {
      const res = await axios.put(`https://todo-j6kl.onrender.com/todos/${id}`, updatedTask);
      setTodos(todos.map(todo => (todo._id === id ? res.data : todo)));
    } catch (err) {
      console.error('Error updating todo:', err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`https://todo-j6kl.onrender.com/todos/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  };

  return (
    <div className="container">
      <h1>Todo List</h1>
      <div className="input-container">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTodo}>Add Task</button>
      </div>
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo._id} className="todo-item">
            <input
              type="text"
              value={todo.task}
              onChange={(e) => updateTodo(todo._id, { ...todo, task: e.target.value })}
            />
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={(e) => updateTodo(todo._id, { ...todo, completed: e.target.checked })}
            />
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

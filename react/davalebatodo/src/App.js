import React, { useState, useEffect } from "react";
import {ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css'

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.log(error));
  }, []);

  const handleDelete = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        setTodos((prevState) => {
          return prevState.filter((todo) => todo.id !== id);
        });
        toast.success(`Todo with id ${id} has been deleted.`);
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (id) => {
    const updatedTodo = todos.find((todo) => todo.id === id);
    updatedTodo.completed = !updatedTodo.completed;
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    })
      .then((response) => response.json())
      .then((data) => {
        setTodos((prevState) => {
          return prevState.map((todo) =>
            todo.id === id ? { ...todo, completed: updatedTodo.completed } : todo
          );
        });
        const status = updatedTodo.completed ? "completed" : "incompleted";
        toast.success(`Todo with id ${id} has been marked as ${status}.`);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="container">
      {todos.slice(0, 50).map((todo) => (
        <div className="card" key={todo.id}>
          <h3>{todo.title}</h3>
          <p>Status: {todo.completed ? "Completed" : "Not completed"}</p>
          <button onClick={() => handleDelete(todo.id)}>Delete</button>
          <button onClick={() => handleChange(todo.id)}>Mark as {todo.completed ? "incompleted" : "completed"}</button>
          
          <ToastContainer/>
        </div>
      ))}
    </div>
  );
}

export default App;
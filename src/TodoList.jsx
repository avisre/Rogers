import React, { useState, useEffect } from "react";

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [editedTask, setEditedTask] = useState(null);

  // Load tasks from local storage on initial render
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  // Save tasks to local storage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (taskInput.trim() === "") return;

    if (editedTask !== null) {
      // Edit existing task
      const updatedTasks = [...tasks];
      updatedTasks[editedTask] = taskInput;
      setTasks(updatedTasks);
      setEditedTask(null);
    } else {
      // Add a new task
      setTasks([...tasks, taskInput]);
    }

    setTaskInput("");
  };

  const editTask = (index) => {
    setTaskInput(tasks[index]);
    setEditedTask(index);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        placeholder="Add a new task"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
      />
      <

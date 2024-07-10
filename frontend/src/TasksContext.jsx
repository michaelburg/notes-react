import React, { createContext, useContext, useState, useEffect } from "react";
import { getTasks, updateTask, createTask, deleteTask } from "./CRUD";
import { useNavigate } from "react-router-dom";

const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const tasks = await getTasks();
      setTasks(tasks);
    } catch (error) {
      if (error.message === "Unauthorized") {
        navigate("/LoginPage");
      } else {
        setError(error.message);
      }
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const updateTaskContext = async (updatedTask) => {
    try {
      await updateTask(updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        )
      );
    } catch (error) {
      if (error.message === "Unauthorized") {
        navigate("/LoginPage");
      } else {
        setError(error.message);
      }
    }
  };

  const createTaskContext = async (newTask) => {
    try {
      const createdTask = await createTask(newTask);
      setTasks((prevTasks) => [...prevTasks, createdTask]);
    } catch (error) {
      if (error.message === "Unauthorized") {
        navigate("/LoginPage");
      } else {
        setError(error.message);
      }
    }
  };

  const deleteTaskContext = async (taskToDelete) => {
    try {
      await deleteTask(taskToDelete);
      setTasks((prevTasks) =>
        prevTasks.filter((task) => task._id !== taskToDelete._id)
      );
    } catch (error) {
      if (error.message === "Unauthorized") {
        navigate("/LoginPage");
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        error,
        fetchTasks,
        updateTaskContext,
        createTaskContext,
        deleteTaskContext,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => useContext(TasksContext);

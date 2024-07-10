// controllers/task.controller.js
const Task = require("../models/task.model");

// Get all tasks
const getUserTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new task
const createTask = async (req, res) => {
  const task = new Task({
    title: req.body.title,
    body: req.body.body,
    isPinned: req.body.isPinned,
    todoList: req.body.todoList,
    user: req.user._id,
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a task
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Update task fields
    task.title = req.body.title;
    task.body = req.body.body;
    task.isPinned = req.body.isPinned;
    task.todoList = req.body.todoList;
    // Update other fields as necessary
    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  console.log(req.params.id);
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Error deleting task" });
  }
};

module.exports = {
  getUserTasks,
  createTask,
  updateTask,
  deleteTask,
};

// routes/tasks.route.js
const express = require("express");
const router = express.Router();
const {
  getUserTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");
const authMiddleware = require("../middleware/auth.middleware");

// Define routes
router.get("/", authMiddleware, getUserTasks);
router.post("/", authMiddleware, createTask);
router.put("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);

module.exports = router;

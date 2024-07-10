import React from "react";
import { useTasks } from "../TasksContext";
import { Checkbox, Box, Typography } from "@mui/material";

function TodoList({ todos, task }) {
  const { updateTaskContext } = useTasks();

  const toggleCheck = (e, todo) => {
    e.stopPropagation();
    const updatedTodoList = task.todoList.map((t) =>
      t._id === todo._id ? { ...t, isComplete: !t.isComplete } : t
    );
    const updatedTask = { ...task, todoList: updatedTodoList };
    updateTaskContext(updatedTask);
  };

  return (
    <Box>
      {todos.map((todo) => (
        <Box
          key={todo._id}
          display="flex"
          alignItems="center"
          sx={{
            mb: 1,
            fontFamily: "Roboto, Arial, sans-serif",
            fontSize: "14px",
            fontWeight: 400,
          }}
        >
          <Checkbox
            checked={todo.isComplete}
            onClick={(e) => toggleCheck(e, todo)}
            sx={{
              width: "18px",
              height: "18px",
              mr: 1,
              paddingLeft: "16px",
            }}
          />
          <Typography
            sx={{
              fontFamily: "Roboto, Arial, sans-serif",
              fontSize: "14px",
              fontWeight: 400,
            }}
          >
            {todo.title}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

export default TodoList;

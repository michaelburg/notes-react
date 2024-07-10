import React, { useState } from "react";
import { Typography, Box, Divider, IconButton, Tooltip } from "@mui/material";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTasks } from "../TasksContext";
import TodoList from "./TodoList";
import TaskModal from "./TaskModal";

function TaskItem({ task }) {
  const { updateTaskContext, deleteTaskContext } = useTasks();
  const completedTodos = task.todoList.filter((todo) => todo.isComplete);
  const incompleteTodos = task.todoList.filter((todo) => !todo.isComplete);

  const [hovered, setHovered] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const togglePin = (e) => {
    e.stopPropagation();
    const updatedTask = { ...task, isPinned: !task.isPinned };
    updateTaskContext(updatedTask);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteTaskContext(task);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <Box
        border={1}
        borderColor="grey.300"
        borderRadius="borderRadius"
        mb={4}
        margin={0}
        sx={{
          position: "relative",
          transition: "box-shadow 0.3s",
          "&:hover": {
            boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
          },
          padding: 0,
          fontFamily: "Roboto, Arial, sans-serif",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={openModal}
      >
        <Box
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 10,
            display: "flex",
            alignItems: "center",
          }}
        >
          {hovered && (
            <Tooltip title={task.isPinned ? "Unpin note" : "Pin note"}>
              <IconButton size="small" onClick={togglePin}>
                {task.isPinned ? <PushPinIcon /> : <PushPinOutlinedIcon />}
              </IconButton>
            </Tooltip>
          )}
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={2}
        >
          {task.title !== "" ? (
            <Typography
              variant="h6"
              component="h3"
              gutterBottom
              sx={{
                fontSize: "16px",
                fontWeight: 500,
                fontFamily: "Roboto, Arial, sans-serif",
                paddingBottom: 0,
              }}
            >
              {task.title}
            </Typography>
          ) : (
            <></>
          )}
        </Box>
        {task.body !== "" ? (
          <Typography
            variant="body1"
            p={2}
            sx={{
              fontSize: "14px",
              fontWeight: 400,
              fontFamily: "Roboto, Arial, sans-serif",
              paddingTop: 0,
              paddingBottom: "10px",
            }}
          >
            {task.body}
          </Typography>
        ) : (
          <></>
        )}
        <TodoList todos={incompleteTodos} task={task} />
        {completedTodos.length > 0 ? <Divider sx={{ my: 2 }} /> : <></>}
        <TodoList todos={completedTodos} task={task} />
        {hovered && (
          <Box
            sx={{
              position: "absolute",
              bottom: 8,
              right: 8,
              zIndex: 10,
            }}
          >
            <Tooltip title="Delete task">
              <IconButton size="small" onClick={handleDelete}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Box>
      <TaskModal isOpen={modalIsOpen} onRequestClose={closeModal} task={task} />
    </>
  );
}

export default TaskItem;

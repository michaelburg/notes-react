import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import { useTasks } from "../TasksContext";
import {
  Typography,
  TextField,
  Box,
  Checkbox,
  IconButton,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    maxWidth: "500px",
    maxHeight: "400px",
    fontFamily: "Google Sans, Roboto, Arial, sans-serif",
    fontSize: "16px",
  },
};

Modal.setAppElement("#root");

function TaskModal({ isOpen, onRequestClose, task }) {
  const { updateTaskContext, createTaskContext } = useTasks();
  const [editedTask, setEditedTask] = useState(null);
  const [hoveredTodoId, setHoveredTodoId] = useState(null);
  const [collapseCompleted, setCollapseCompleted] = useState(true);
  const newTodoRef = useRef(null);

  useEffect(() => {
    if (task) {
      const sortedTodoList = [
        ...task.todoList.filter((todo) => !todo.isComplete),
        { _id: "new", title: "", isComplete: false },
        ...task.todoList.filter((todo) => todo.isComplete),
      ];
      setEditedTask({ ...task, todoList: sortedTodoList });
    } else {
      setEditedTask({
        title: "",
        body: "",
        todoList: [{ _id: "new", title: "", isComplete: false }],
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleToggleComplete = (todoId) => {
    const updatedTodoList = editedTask.todoList.map((todo) =>
      todo._id === todoId ? { ...todo, isComplete: !todo.isComplete } : todo
    );
    setEditedTask((prevTask) => ({
      ...prevTask,
      todoList: updatedTodoList,
    }));
  };

  const handleAddTodo = () => {
    if (
      !editedTask.todoList.length ||
      editedTask.todoList[editedTask.todoList.length - 1].title.trim() !== ""
    ) {
      const newTodo = { _id: Date.now(), title: "", isComplete: false };
      setEditedTask((prevTask) => ({
        ...prevTask,
        todoList: [...prevTask.todoList, newTodo],
      }));
      setTimeout(() => {
        if (newTodoRef.current) {
          newTodoRef.current.focus();
        }
      }, 0);
    }
  };

  const handleTodoChange = (todoId, value) => {
    setEditedTask((prevTask) => {
      const updatedTodoList = prevTask.todoList.map((todo) =>
        todo._id === todoId ? { ...todo, title: value } : todo
      );

      if (todoId === "new" && value.trim() !== "") {
        const newTodo = { _id: Date.now(), title: value, isComplete: false };
        const newUpdatedTodoList = updatedTodoList.filter(
          (todo) => todo._id !== "new"
        );

        return {
          ...prevTask,
          todoList: [
            ...newUpdatedTodoList,
            { _id: "new", title: "", isComplete: false },
            newTodo,
          ],
        };
      }

      return {
        ...prevTask,
        todoList: updatedTodoList,
      };
    });
  };

  const handleDeleteTodo = (todoId) => {
    setEditedTask((prevTask) => ({
      ...prevTask,
      todoList: prevTask.todoList.filter((todo) => todo._id !== todoId),
    }));
  };

  const handleCloseModal = () => {
    if (!editedTask) {
      onRequestClose();
      return;
    }

    if (editedTask._id) {
      updateTaskContext(editedTask);
    } else {
      createTaskContext(editedTask);
    }
    onRequestClose();
  };

  if (!editedTask) return null;

  const uncompletedTodos = editedTask.todoList.filter(
    (todo) => !todo.isComplete && todo._id !== "new"
  );
  const newTodoPlaceholder = editedTask.todoList.find(
    (todo) => todo._id === "new"
  );
  const completedTodos = editedTask.todoList.filter(
    (todo) => todo.isComplete && todo._id !== "new"
  );

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      style={customStyles}
    >
      <Box
        sx={{
          maxHeight: "600px",
          overflowY: "auto",
          mb: 2,
          fontFamily: "Google Sans, Roboto, Arial, sans-serif",
        }}
      >
        <TextField
          fullWidth
          name="title"
          placeholder="Title"
          value={editedTask.title}
          onChange={handleChange}
          margin="normal"
          InputProps={{
            sx: {
              fontSize: "22px",
              fontFamily: "Google Sans, Roboto, Arial, sans-serif",
            },
          }}
        />
        <TextField
          fullWidth
          name="body"
          placeholder="Body"
          value={editedTask.body}
          onChange={handleChange}
          margin="normal"
          multiline
        />

        {uncompletedTodos.map((todo) => (
          <Box
            key={todo._id}
            display="flex"
            alignItems="center"
            onMouseEnter={() => setHoveredTodoId(todo._id)}
            onMouseLeave={() => setHoveredTodoId(null)}
          >
            <Checkbox
              checked={todo.isComplete}
              onChange={() => handleToggleComplete(todo._id)}
              sx={{ marginRight: 1 }}
            />
            <TextField
              fullWidth
              value={todo.title}
              onChange={(e) => handleTodoChange(todo._id, e.target.value)}
              onBlur={() => {
                if (todo.title.trim() === "") {
                  handleDeleteTodo(todo._id);
                }
              }}
              InputProps={{
                sx: {
                  "& fieldset": { border: "none" },
                  "&:hover": {
                    borderTop: "1px solid #ccc",
                    borderBottom: "1px solid #ccc",
                  },
                },
              }}
            />
            <IconButton
              aria-label="Delete"
              onClick={() => handleDeleteTodo(todo._id)}
              style={{ display: hoveredTodoId === todo._id ? "block" : "none" }}
            >
              <ClearIcon />
            </IconButton>
          </Box>
        ))}

        <Box display="flex" alignItems="center">
          <IconButton
            aria-label="Add"
            onClick={handleAddTodo}
            style={{ display: newTodoPlaceholder.title ? "none" : "block" }}
          >
            <AddIcon />
          </IconButton>
          <TextField
            fullWidth
            placeholder="Add a todo"
            value=""
            onChange={(e) => handleTodoChange("new", e.target.value)}
            inputRef={newTodoRef}
            InputProps={{
              sx: {
                "& fieldset": { border: "none" },
                "&:hover": {
                  borderTop: "1px solid #ccc",
                  borderBottom: "1px solid #ccc",
                },
              },
            }}
          />
        </Box>

        {completedTodos.length > 0 ? (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography
              variant="subtitle1"
              onClick={() => setCollapseCompleted(!collapseCompleted)}
              style={{
                cursor: "pointer",
                mt: 1,
                display: "flex",
                alignItems: "center",
              }}
            >
              Completed Todos ({completedTodos.length}){" "}
              {collapseCompleted ? <ExpandMoreIcon /> : <ExpandLessIcon />}
            </Typography>
            {collapseCompleted &&
              completedTodos.map((todo) => (
                <Box key={todo._id} display="flex" alignItems="center">
                  <Checkbox
                    checked={todo.isComplete}
                    onChange={() => handleToggleComplete(todo._id)}
                    sx={{ marginRight: 1 }}
                  />
                  <TextField
                    fullWidth
                    value={todo.title}
                    onChange={(e) => handleTodoChange(todo._id, e.target.value)}
                    InputProps={{
                      sx: {
                        "& fieldset": { border: "none" },
                      },
                    }}
                  />
                </Box>
              ))}
          </>
        ) : null}
      </Box>
    </Modal>
  );
}

export default TaskModal;

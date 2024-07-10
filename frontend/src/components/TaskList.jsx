import React from "react";
import TaskItem from "../components/TaskItem";
import { Grid, Typography } from "@mui/material";

function TaskList({ tasks, label }) {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        {label}
      </Typography>
      <Grid container spacing={1}>
        {tasks.map((task, index) => (
          <Grid item xs={12} sm={6} md={3} key={task._id}>
            <div style={{ marginBottom: index === tasks.length - 1 ? 0 : 8 }}>
              <TaskItem task={task} />
            </div>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default TaskList;

import React from "react";
import { Box, Typography } from "@mui/material";

function HomePage() {
  return (
    <Box sx={{ p: 3, fontFamily: "Roboto, Arial, sans-serif" }}>
      <Typography variant="h3" gutterBottom>
        Welcome to eProducts
      </Typography>
      <Typography variant="body1" paragraph>
        eProducts is your one-stop solution for managing your tasks efficiently
        and effectively. Our platform offers a range of features to help you
        stay organized and productive.
      </Typography>
      <Typography variant="body1" paragraph>
        Features include:
      </Typography>
      <ul>
        <li>Task Management</li>
        <li>Notes and Todos</li>
        <li>Pinning Important Tasks</li>
        <li>Customizable Task Views</li>
      </ul>
      <Typography variant="body1" paragraph>
        Get started by exploring your tasks and adding new ones to keep track of
        your to-dos.
      </Typography>
    </Box>
  );
}

export default HomePage;

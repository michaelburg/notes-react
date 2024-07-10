import React, { useState } from "react";
import { Box, Typography, TextField, Button, Snackbar } from "@mui/material";

function AboutPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, email, message });

    setSnackbarOpen(true);
    setName("");
    setEmail("");
    setMessage("");
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ p: 3, fontFamily: "Roboto, Arial, sans-serif" }}>
      <Typography variant="h3" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="body1" paragraph>
        We would love to hear from you! Please fill out the form below to get in
        touch with us.
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
            required
          />
        </Box>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="Thank you for your message!"
      />
    </Box>
  );
}

export default AboutPage;

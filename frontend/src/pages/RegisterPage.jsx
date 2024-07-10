import React, { useState } from "react";
import { register } from "../CRUD";
import { useNavigate, Link } from "react-router-dom";
import { Container, Typography, TextField, Button, Box } from "@mui/material";

function RegisterPage() {
  const [details, setDetails] = useState({
    username: "michael",
    email: "michael@burg.com",
    password: "1234",
  });

  const navigate = useNavigate();

  const verify = async (event) => {
    event.preventDefault();
    try {
      const res = await register(details);
      if (!res.token) {
        handleInvalidRegister();
      } else {
        localStorage.setItem("token", JSON.stringify(res.token));
        navigate("/TasksPage");
      }
    } catch (error) {
      console.error("Error registering:", error);
      handleInvalidRegister();
    }
  };

  const handleInvalidRegister = () => {
    alert("Invalid register credentials. Please try again.");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" onSubmit={verify} sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            fullWidth
            name="username"
            label="Username"
            id="username"
            value={details.username}
            onChange={(e) =>
              setDetails({ ...details, username: e.target.value })
            }
          />
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoFocus
            value={details.email}
            onChange={(e) => setDetails({ ...details, email: e.target.value })}
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={details.password}
            onChange={(e) =>
              setDetails({ ...details, password: e.target.value })
            }
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
        </Box>
        <Link to="/LoginPage">Already have an account? Login here</Link>
      </Box>
    </Container>
  );
}

export default RegisterPage;

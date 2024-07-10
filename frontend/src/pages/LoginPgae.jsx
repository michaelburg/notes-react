import React, { useState } from "react";
import { login } from "../CRUD";
import { useNavigate, Link } from "react-router-dom";
import { Container, Typography, TextField, Button, Box } from "@mui/material";

function LoginPage() {
  const [details, setDetails] = useState({
    email: "john@example.com",
    password: "password123",
  });

  const navigate = useNavigate();

  const verify = async (event) => {
    event.preventDefault();
    try {
      const res = await login(details);
      if (!res.token) {
        handleInvalidLogin();
      } else {
        localStorage.setItem("token", JSON.stringify(res.token));
        navigate("/TasksPage");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      handleInvalidLogin();
    }
  };

  const handleInvalidLogin = () => {
    alert("Invalid login credentials. Please try again.");
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
          Welcome Back!
        </Typography>
        <Box component="form" onSubmit={verify} sx={{ mt: 3 }}>
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
            Login
          </Button>
        </Box>
        <Link to="/RegisterPage">Don't have an account? Register here</Link>
      </Box>
    </Container>
  );
}

export default LoginPage;

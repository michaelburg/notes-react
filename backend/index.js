// index.js or app.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.route");
const taskRoutes = require("./routes/task.route"); // Import task routes

dotenv.config(); // Load environment variables
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.static("public"));
app.use(cors({ origin: "http://localhost:5173" })); // Add the correct origin

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/tasks", taskRoutes); // Task routes

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

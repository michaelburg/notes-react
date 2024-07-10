// seed.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const User = require("./models/user.model");
const Task = require("./models/task.model");

dotenv.config(); // Load config

const connectDB = require("./config/db");

const initialUsers = [
  {
    username: "john_doe",
    email: "john@example.com",
    password: "password123",
    firstName: "John",
    lastName: "Doe",
  },
  {
    username: "jane_doe",
    email: "jane@example.com",
    password: "password456",
    firstName: "Jane",
    lastName: "Doe",
  },
];

const tasks = [
  {
    title: "Complete Project Proposal",
    description: "Finalize and submit the project proposal document.",
    body: "Ensure all sections are complete, review feedback, and submit.",
    todoList: [
      { title: "Write executive summary", isComplete: false },
      { title: "Compile budget estimates", isComplete: true },
      { title: "Review with team", isComplete: false },
      { title: "Submit proposal", isComplete: false },
    ],
    isPinned: true,
  },
  {
    title: "Prepare for Presentation",
    description: "Prepare slides and practice for the client presentation.",
    body: "Create slides, practice speech, and get feedback from colleagues.",
    todoList: [
      { title: "Draft slides", isComplete: true },
      { title: "Add graphics", isComplete: false },
      { title: "Practice speech", isComplete: false },
      { title: "Incorporate feedback", isComplete: false },
    ],
    isPinned: false,
  },
  {
    title: "Develop Marketing Strategy",
    description: "Outline the marketing strategy for the upcoming quarter.",
    body: "Include social media, email campaigns, and events.",
    todoList: [
      { title: "Research market trends", isComplete: false },
      { title: "Identify target audience", isComplete: true },
      { title: "Plan social media posts", isComplete: false },
      { title: "Schedule email campaigns", isComplete: false },
    ],
    isPinned: true,
  },
  {
    title: "Team Meeting Preparation",
    description:
      "Prepare the agenda and materials for the weekly team meeting.",
    body: "Gather reports, outline discussion points, and distribute materials.",
    todoList: [
      { title: "Draft agenda", isComplete: false },
      { title: "Collect weekly reports", isComplete: true },
      { title: "Send out meeting invite", isComplete: false },
      { title: "Prepare discussion points", isComplete: false },
    ],
    isPinned: false,
  },
  {
    title: "Code Review",
    description: "Review code submissions from the development team.",
    body: "Check for bugs, ensure best practices, and provide feedback.",
    todoList: [
      { title: "Review pull request #123", isComplete: false },
      { title: "Test new feature X", isComplete: true },
      { title: "Write feedback comments", isComplete: false },
      { title: "Approve changes", isComplete: false },
    ],
    isPinned: true,
  },
  {
    title: "Client Follow-Up",
    description: "Follow up with clients regarding recent inquiries.",
    body: "Respond to emails, update CRM, and schedule follow-up meetings.",
    todoList: [
      { title: "Reply to client A", isComplete: false },
      { title: "Update CRM notes", isComplete: true },
      { title: "Schedule call with client B", isComplete: false },
      { title: "Send follow-up email to client C", isComplete: false },
    ],
    isPinned: false,
  },
  {
    title: "Website Update",
    description: "Update the company website with new content and features.",
    body: "Add new blog posts, update the product page, and fix bugs.",
    todoList: [
      { title: "Publish blog post", isComplete: false },
      { title: "Update product descriptions", isComplete: true },
      { title: "Fix broken links", isComplete: false },
      { title: "Test new features", isComplete: false },
    ],
    isPinned: true,
  },
  {
    title: "Financial Report",
    description: "Compile and analyze the monthly financial report.",
    body: "Gather data, create charts, and write the analysis.",
    todoList: [
      { title: "Collect financial data", isComplete: false },
      { title: "Create charts and graphs", isComplete: true },
      { title: "Write analysis", isComplete: false },
      { title: "Review with finance team", isComplete: false },
    ],
    isPinned: false,
  },
  {
    title: "HR Policy Update",
    description: "Update the company HR policies based on recent changes.",
    body: "Review current policies, propose updates, and communicate changes.",
    todoList: [
      { title: "Review current HR policies", isComplete: false },
      { title: "Draft proposed updates", isComplete: true },
      { title: "Get approval from management", isComplete: false },
      { title: "Communicate changes to employees", isComplete: false },
    ],
    isPinned: true,
  },
  {
    title: "Product Launch",
    description: "Plan and execute the launch of the new product.",
    body: "Coordinate with marketing, sales, and support teams.",
    todoList: [
      { title: "Finalize launch plan", isComplete: false },
      { title: "Create marketing materials", isComplete: true },
      { title: "Train sales team", isComplete: false },
      { title: "Prepare support documentation", isComplete: false },
    ],
    isPinned: false,
  },
  {
    title: "Customer Survey",
    description: "Design and distribute a customer satisfaction survey.",
    body: "Create survey questions, distribute to customers, and analyze results.",
    todoList: [
      { title: "Draft survey questions", isComplete: false },
      { title: "Send survey to customers", isComplete: true },
      { title: "Collect responses", isComplete: false },
      { title: "Analyze survey results", isComplete: false },
    ],
    isPinned: true,
  },
  {
    title: "Inventory Check",
    description: "Conduct a full inventory check and update records.",
    body: "Count inventory, update database, and report discrepancies.",
    todoList: [
      { title: "Count all items", isComplete: false },
      { title: "Update inventory database", isComplete: true },
      { title: "Report discrepancies", isComplete: false },
      { title: "Reorder low stock items", isComplete: false },
    ],
    isPinned: false,
  },
  {
    title: "Social Media Campaign",
    description:
      "Plan and execute a social media campaign for the new product.",
    body: "Create content, schedule posts, and engage with followers.",
    todoList: [
      { title: "Plan content calendar", isComplete: false },
      { title: "Create social media posts", isComplete: true },
      { title: "Schedule posts", isComplete: false },
      { title: "Respond to comments and messages", isComplete: false },
    ],
    isPinned: true,
  },
  {
    title: "Office Renovation",
    description: "Plan and oversee the office renovation project.",
    body: "Coordinate with contractors, manage budget, and ensure timely completion.",
    todoList: [
      { title: "Hire contractors", isComplete: false },
      { title: "Set budget", isComplete: true },
      { title: "Approve renovation plans", isComplete: false },
      { title: "Monitor progress", isComplete: false },
    ],
    isPinned: false,
  },
  {
    title: "Employee Training",
    description: "Organize and conduct training sessions for new employees.",
    body: "Prepare training materials, schedule sessions, and provide feedback.",
    todoList: [
      { title: "Create training materials", isComplete: false },
      { title: "Schedule training sessions", isComplete: true },
      { title: "Conduct training", isComplete: false },
      { title: "Collect feedback", isComplete: false },
    ],
    isPinned: true,
  },
];

async function seedDB() {
  await connectDB();

  try {
    // Clear existing data
    await User.deleteMany();
    await Task.deleteMany();

    // Create users with hashed passwords
    for (let userData of initialUsers) {
      const salt = await bcrypt.genSalt(10);
      userData.password = await bcrypt.hash(userData.password, salt);
      const user = new User(userData);
      await user.save();
    }

    // Retrieve created users to associate with tasks
    const createdUsers = await User.find();

    // Assign tasks to users
    for (let taskData of tasks) {
      const randomUser =
        createdUsers[Math.floor(Math.random() * createdUsers.length)];
      taskData.user = randomUser._id;
      const task = new Task(taskData);
      await task.save();
    }

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    mongoose.connection.close();
  }
}

seedDB();

import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPgae";
import RegisterPage from "./pages/RegisterPage";
import TasksPage from "./pages/TasksPage";
import AboutPage from "./pages/AboutPage";
import AppHeader from "./components/AppHeader";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <>
      <AppHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/RegisterPage" element={<RegisterPage />} />
        <Route path="/TasksPage" element={<TasksPage />} />
        <Route path="/AboutPage" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;

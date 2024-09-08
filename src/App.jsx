import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./components/Landing";
import Register from "./containers/Register";
import Login from "./containers/Login";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import Dashboard from "./containers/Dashboard";
import AddHabit from "./components/AddHabit";
import { lightTheme, darkTheme } from "./themes";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";

const App = () => {
  const [switchMode, setSwitchMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!localStorage.getItem("token")
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const toggleTheme = () => {
    const newMode = !switchMode;
    setSwitchMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  const handleLoginState = () => {
    setIsAuthenticated(true);
  };

  return (
    <ThemeProvider theme={switchMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          position: "relative",
        }}
      >
        {isAuthenticated && (
          <Navbar toggleTheme={toggleTheme} switchMode={switchMode} />
        )}
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <Landing />
            }
          />
          <Route path="/login" element={<Login onLogin={handleLoginState} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-habit"
            element={
              <PrivateRoute>
                <AddHabit />
              </PrivateRoute>
            }
          />
        </Routes>
      </Box>
    </ThemeProvider>
  );
};

export default App;

import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Register from "./containers/Register";
import Login from "./containers/Login";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./containers/Dashboard";
import AddHabit from "./components/AddHabit";
import { lightTheme, darkTheme } from "./themes";
import {
  ThemeProvider,
  CssBaseline,
  IconButton,
  Box,
  Tooltip,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const App = () => {
  const [switchMode, setSwitchMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const toggleTheme = () => {
    const newMode = !switchMode;
    setSwitchMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setSwitchMode(storedTheme === "dark");
    }
  }, []);

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
        <Box
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            display: "flex",
            alignItems: "center",
            zIndex: 1201,
          }}
        >
          <Tooltip
            title={switchMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            <IconButton onClick={toggleTheme}>
              {switchMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Tooltip>
        </Box>
        <Routes>
          <Route
            path="/"
            element={
              <Landing toggleTheme={toggleTheme} switchMode={switchMode} />
            }
          />
          <Route path="/login" element={<Login />} />
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
          <Route />
        </Routes>
      </Box>
    </ThemeProvider>
  );
};

export default App;

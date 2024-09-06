import { Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Register from "./containers/Register";
import Login from "./containers/Login";
import { ThemeProvider } from "@emotion/react";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;

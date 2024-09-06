import { Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Register from "./containers/Register";
import Login from "./containers/Login";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default App;

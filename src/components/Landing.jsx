import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      <h1>Welcome to Accountable</h1>
      <p>Track your habits and keep yourself accountable with friends.</p>
      <Link to="/login">Log In</Link>
      <Link to="/register">Register</Link>
    </div>
  );
};

export default Landing;

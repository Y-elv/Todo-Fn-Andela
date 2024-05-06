import React from "react";
import "../../App.css";
import { Link } from "react-router-dom";
const Login = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Your login logic here
  };

  return (
    <div className="container">
      <div className="title">
        <h2>LOGIN</h2>
      </div>
      <div className="login-form">
        <form id="loginForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <div id="message" style={{ marginTop: "5px" }}></div>
          <button type="submit">Login</button>
        </form>
        <p className="quick-link">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

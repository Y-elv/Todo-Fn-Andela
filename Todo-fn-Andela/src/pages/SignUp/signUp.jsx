import React from "react";
import "../../App.css";
import { Link } from "react-router-dom";
const Signup = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Your signup logic here
  };

  return (
    <div className="container">
      <div className="title">
        <h2>SIGN UP</h2>
      </div>
      <div className="login-form">
        <form id="signupForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">New-Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Confirm-Password</label>
            <input type="password" id="coPassword" name="coPassword" required />
          </div>
          <div id="message" style={{ marginTop: "5px" }}></div>
          <button type="submit">SignUp</button>
        </form>
        <p className="quick-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

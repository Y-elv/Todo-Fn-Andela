import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import { Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState({ text: "", color: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Your signup logic here
    if (!email || !password || !confirmPassword) {
      setMessage({
        text: "Please fill in all the required fields.",
        color: "red",
      });
      return;
    }

    if (password !== confirmPassword) {
      setMessage({ text: "Passwords do not match.", color: "red" });
      return;
    }

    try {
      // Post form data using fetch
      const response = await fetch(
        "http://localhost:3000/api/v1/todoApp/user/registerUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to signup");
      }

      console.log("Form submitted successfully");
      setMessage({ text: "Signup Successful", color: "green" });

      setTimeout(() => {
        navigate("/login");
      }, 3000);

      // Clear form fields
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error posting form data:", error);
      setMessage({
        text: "Error submitting form. Please try again later.",
        color: "red",
      });
    }
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
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">New-Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm-Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div id="message" style={{ marginTop: "5px", color: message.color }}>
            {message.text}
          </div>
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

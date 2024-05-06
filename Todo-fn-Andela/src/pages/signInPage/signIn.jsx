import React, { useState } from "react";
import "../../App.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ text: "", color: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Your login logic here
    if (!email && !password) {
      setMessage({
        text: "Please fill in all the required fields.",
        color: "red",
      });
      return;
    } else {
      if (!password) {
        setMessage({ text: "Please enter password.", color: "red" });
        return;
      }

      if (!email) {
        setMessage({ text: "Please enter your email address.", color: "red" });
        return;
      }
    }

    try {
      // Post form data using fetch
      const response = await fetch(
        "http://localhost:3000/api/v1/todoApp/user/loginUser",
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

      if (response.status === 401) {
        // If unauthorized, set invalid email or password message
        setMessage({ text: "Invalid email or password", color: "red" });
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to login");
      }
      const data = await response.json();
      const token = data.message.token;
      console.log("token:", token);

      // Store the token in local storage
      localStorage.setItem("token", token);

      console.log("Form submitted successfully");
      setMessage({ text: "Login Successfully", color: "green" });

      setTimeout(() => {
        navigate("/todo");
      }, 3000);

      // Clear form fields
      setEmail("");
      setPassword("");
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
        <h2>LOGIN</h2>
      </div>
      <div className="login-form">
        <form id="loginForm" onSubmit={handleSubmit}>
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
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div id="message" style={{ marginTop: "5px", color: message.color }}>
            {message.text}
          </div>
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

import React from 'react'
import "../../App.css"
import { Link } from "react-router-dom";
function LandingPage() {
  return (
    <div>
      <div className="title">
        <h2>Todo Tasks</h2>
      </div>
      <div className="welcome">Welcome to our Todo App </div>
      <div className="links">
        <ul>
          <li>
            <Link to="/login">Sign In</Link>
          </li>
          <li>
            <Link to="/register">Sign Up</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default LandingPage

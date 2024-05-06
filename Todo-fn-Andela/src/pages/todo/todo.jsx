import React from "react";
import { Link } from "react-router-dom";
import "../../App.css";
const Todo = () => {
  return (
    <div>
      <div className="tittle">
        <h2>Todo Tasks</h2>
        <Link to="/login">
          <h5 className="logout">Logout</h5>
        </Link>
      </div>
      <div className="bar">
        <h4>Tasks</h4>
        <h4>Actions</h4>
      </div>
      <div className="links-pages">
        <Link to="/createTask"class="create-task">create Task</Link>
      </div>
      <div className="content"></div>
    </div>
  );
};

export default Todo;

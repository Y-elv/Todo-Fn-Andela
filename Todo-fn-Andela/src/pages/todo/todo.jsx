import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import { useNavigate } from "react-router-dom";

const Todo = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token not found in local storage");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/todoApp/task/getAll",
        {
          method: "GET",
          headers: {
            authorization: `${token}`,
          },
        }
      );

      if (!response.ok) {
        console.log("Failed to fetch tasks");
        return;
      }

      const data = await response.json();
      console.log("all tasks", data);
      setTasks(data.message);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const deleteTask = async (taskId) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/todoApp/task/delete/${taskId}`,
        {
          method: "DELETE",
          headers: {
            authorization: `${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      // Refresh the task list after successful deletion
      fetchTasks();
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const redirectToUpdatePage = (taskId) => {
    // Redirect to update.html with taskId as a query parameter
    navigate(`/updateTask/${taskId}`);
  };

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
        <Link to="/createTask" className="create-task">
          Create Task
        </Link>
      </div>
      <div className="content">
        {tasks.map((task) => (
          <div className="task" key={task._id}>
            <div className="left">
              <input
                type="checkbox"
                id={task._id}
                defaultChecked={task.completed}
              />
              <label htmlFor={task._id}>{task.title}</label>
              <p>|</p>
              <p>{task.description}</p>
            </div>
            <div className="right">
              <i
                className="fa-solid fa-pen-to-square"
                onClick={() => redirectToUpdatePage(task._id)}
              ></i>
              <i
                className="fa-solid fa-trash"
                onClick={() => deleteTask(task._id)}
              ></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;

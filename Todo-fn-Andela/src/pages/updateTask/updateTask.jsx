import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../App.css";

const UpdateTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [taskId, setTaskId] = useState(null);

  useEffect(() => {
    const taskIdFromUrl = getTaskIdFromUrl();
    if (taskIdFromUrl) {
      setTaskId(taskIdFromUrl);
      fetchTask(taskIdFromUrl);
    }
  }, []);

  const getTaskIdFromUrl = () => {
    const taskId = window.location.pathname.split("/").pop();
    return taskId;
  };

  const fetchTask = (taskId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token not found in local storage");
      return;
    }

    fetch(`http://localhost:3000/api/v1/todoApp/task/getTask/${taskId}`, {
      method: "GET",
      headers: {
        authorization: `${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched task:", data);
        setTitle(data.message.title);
        setDescription(data.message.description);
        setCompleted(data.message.completed);
      })
      .catch((error) => console.error("Error fetching task:", error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskId) {
      console.error("Task ID is null");
      return;
    }
    updateTask(taskId);
  };

  const updateTask = (taskId) => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:3000/api/v1/todoApp/task/update/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify({
        title,
        description,
        completed,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update task");
        }
        // Handle successful update, maybe redirect to another page
        window.location.href = "/todo"; // Redirect to todo page
      })
      .catch((error) => {
        console.error("Error updating task:", error);
      });
  };

  return (
    <div>
      <div className="title">
        <Link to="/todo">Todo Tasks</Link>
        <div className="bar">
          <h4>Update Tasks</h4>
        </div>
      </div>

      <div className="form">
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <br />

          <label htmlFor="description">Description:</label>
          <br />
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            cols="50"
          ></textarea>
          <br />

          <label htmlFor="completed">Completed:</label>
          <input
            type="checkbox"
            id="completed"
            name="completed"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
          <br />
          <div id="message" style={{ marginTop: "5px" }}></div>
          <button type="submit" id="btn-submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTask;

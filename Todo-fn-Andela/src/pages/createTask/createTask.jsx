import React, { useState } from "react";
import { Link } from "react-router-dom";

const CreateTask = () => {
  const [message, setMessage] = useState({ text: "", color: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const description = e.target.description.value;
    const completed = e.target.completed.checked;

    if (!title && !description) {
      setMessage({
        text: "Please fill in all the required fields.",
        color: "red",
      });
      return;
    } else {
      if (!title) {
        setMessage({ text: "Please enter title.", color: "red" });
        return;
      }

      if (!description) {
        setMessage({ text: "Please enter your description.", color: "red" });
        return;
      }
    }

    const token = localStorage.getItem("token");
    console.log("token:", token);

    if (!token) {
      console.error("Token not found in local storage");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/todoApp/task/createTask",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `${token}`,
          },
          body: JSON.stringify({
            title,
            description,
            completed,
          }),
        }
      );

      if (response.status === 401) {
        setMessage({ text: "Invalid email or password", color: "red" });
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to create task");
      }

      console.log("Form submitted successfully");
      setMessage({ text: "Form submitted successfully", color: "green" });

      window.location.href = "/todo";

      e.target.reset();
    } catch (error) {
      console.error("Error posting form data:", error);
      setMessage({
        text: "Error submitting form. Please try again later.",
        color: "red",
      });
    }
  };

  return (
    <div>
      <div className="title">
        <Link to="/todo">Todo Tasks</Link>
        <div className="bar">
          <h4>Create Tasks</h4>
        </div>
      </div>
      <div className="form">
        <form id="taskForm" onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" required />
          <br />
          <label htmlFor="description">Description:</label>
          <br />
          <textarea
            id="description"
            name="description"
            rows="4"
            cols="50"
          ></textarea>
          <br />
          <label htmlFor="completed">Completed:</label>
          <input type="checkbox" id="completed" name="completed" />
          <br />
          <div id="message" style={{ marginTop: "5px", color: message.color }}>
            {message.text}
          </div>
          <button type="submit" id="btn-submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;

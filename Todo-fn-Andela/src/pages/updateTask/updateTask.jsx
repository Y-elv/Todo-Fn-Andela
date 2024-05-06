import React from "react";
import "../../App.css";
const UpdateTask = () => {
  return (
    <div>
      <div className="title">
        <Link to="/todo">Todo Tasks</Link>
        <div className="bar">
          <h4>Update Tasks</h4>
        </div>
      </div>

      <div className="form">
        <form id="taskForm">
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

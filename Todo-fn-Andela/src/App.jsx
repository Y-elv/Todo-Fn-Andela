import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/landingPage/landingPage";
import Login from "./pages/signInPage/signIn";
import Signup from "./pages/SignUp/signUp";
import Todo from "./pages/todo/todo";
import CreateTask from "./pages/createTask/createTask";
import UpdateTask from "./pages/updateTask/updateTask";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/createTask" element={<CreateTask />} />
        <Route path="/updateTask" element={<UpdateTask />} />
      </Routes>
    </>
  );
}

export default App;

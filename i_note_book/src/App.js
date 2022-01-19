import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import NoteState from "./context/notes/noteState";
import About from "./components/About";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";

function App() {
  return (
    <>
      <NoteState>
        <Navbar></Navbar>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
          </Routes>
        </div>
      </NoteState>
    </>
  );
}

export default App;

import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      {/* Route for the main page */}
      <Route path="/" element={<HomePage />} />
      {/* Route for the login page */}
      <Route path="/login" element={<Login />} />
      {/* Route for the register page */}
      <Route path="/register" element={<Register />} />
      
    </Routes>
  );
}
 
 

export default App;

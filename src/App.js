import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home"; 
import Quizpage from "./components/Quizpage"; 
import Result from "./components/Result"; 
import Dashboard from "./components/Dashboard";
// import Leaderboard from "./components/Leaderboard";
import "./index.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/quizpage" element={<Quizpage/>}/>
        <Route path="/result" element={<Result/>}/>
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/leaderboard" element={<Leaderboard/>}/> */}
      </Routes>
    </Router>
  );
};

export default App;

import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="hcontainer">
      <h1 className="htitle">Welcome to the Quiz</h1>
      
      <div className="hinstructions">
        <h3>Instructions:</h3>
        <ul>
          <li>Read each question carefully before selecting an answer.</li>
          <li>Each question has multiple choices, but only one is correct.</li>
          <li>You cannot go back to a previous question once answered.</li>
          <li>Your final score will be displayed at the end.</li>
          <li>Try to answer all questions to get the best score!</li>
        </ul>
      </div>

      <button onClick={() => navigate("/quizpage")} className="hbutton start-button">
        Start Quiz
      </button>
    </div>
  );
};

export default Home;

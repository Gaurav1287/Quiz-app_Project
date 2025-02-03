import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Result = () => {
  const navigate = useNavigate();
  const state = window.history.state?.usr || { score: 0, total: 0 };
  const percentage = (state.score / state.total) * 100;

  const [progress, setProgress] = useState(0);

  // Animate the progress circle
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev < percentage ? prev + 1 : percentage));
    }, 20);
    return () => clearInterval(timer);
  }, [percentage]);

  const getMessage = () => {
    if (percentage === 100) return "🎉 Perfect Score! You're a Genius!";
    if (percentage >= 80) return "🔥 Great Job! Almost there!";
    if (percentage >= 50) return "😊 Good Effort! Keep Practicing!";
    return "😢 Keep Trying! You'll do better next time!";
  };

  return (
    <div className="result-container">
      <h1 className="result-title">Quiz Completed!</h1>

      {/* Circular Progress Bar */}
      <div className="progress-circle">
        <svg viewBox="0 0 100 100">
          <circle className="progress-bg" cx="50" cy="50" r="45"></circle>
          <circle
            className="progress-fill"
            cx="50"
            cy="50"
            r="45"
            style={{
              strokeDasharray: "282.6",
              strokeDashoffset: `${282.6 - (progress / 100) * 282.6}`,
            }}
          ></circle>
        </svg>
        <div className="progress-text">{`${Math.round(progress)}%`}</div>
      </div>

      {/* Score & Message */}
      <p className="result-score">Your Score: {state.score} / {state.total}</p>
      <p className="result-message">{getMessage()}</p>

      {/* Buttons */}
      <div className="result-buttons">
        <button onClick={() => navigate("/quizpage")} className="button play-again">
          🔄 Play Again
        </button>
        <button onClick={() => navigate("/dashboard")} className="button leaderboard">
          🏆 View Dashboard
        </button>
      </div>
    </div>
  );
};

export default Result;

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Fetching data from API...");

    axios
      .get("http://localhost:3001/api/data")
      .then((response) => {
        console.log("API Response Data:", response.data);

        if (Array.isArray(response.data.questions)) {
          const formattedQuestions = response.data.questions.map((q) => ({
            question: q.description,
            options: q.options.map((opt) => ({
              text: opt.description,
              isCorrect: opt.is_correct,
            })),
          }));

          setQuestions(formattedQuestions);
        } else {
          throw new Error("Invalid API response format");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching quiz data:", error);
        setError(`Failed to load quiz data: ${error.message}`);
        setLoading(false);
      });
  }, []);

  const handleNextQuestion = useCallback(() => {
    setSelectedOption(null);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setTimeLeft(30);
    } else {
      navigate("/result", { state: { score, total: questions.length } });
    }
  }, [currentQuestion, questions.length, navigate, score]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleNextQuestion();
      return;
    }
    const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, handleNextQuestion]);

  const handleAnswer = (option, index) => {
    setSelectedOption(index);
    if (option.isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
    setTimeout(() => {
      handleNextQuestion();
    }, 1000);
  };

  if (loading) return <div className="Qloading">Loading quiz...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!questions.length) return <div className="Qloading">No questions available.</div>;

  return (
    <div className="Qcontainer">
      <h2 className="Qquestion">{`Q${currentQuestion + 1}: ${
        questions[currentQuestion]?.question || "No question available"
      }`}</h2>

      {/* Progress Bar for Timer */}
      <div className="Qprogress-container">
        <div className="Qprogress-bar" style={{ width: `${(timeLeft / 30) * 100}%` }}></div>
      </div>

      <div className="Qtimer">⏳ {timeLeft} sec</div>

      <div className="Qoptions">
        {questions[currentQuestion]?.options?.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option, index)}
            className={`Qoption-button ${
              selectedOption === index
                ? option.isCorrect
                  ? "correct"
                  : "incorrect"
                : ""
            }`}
            disabled={selectedOption !== null} // Disable buttons after selection
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Quiz;

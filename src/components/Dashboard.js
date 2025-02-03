import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "Guest", email: "", testCount: 0, totalScore: 0 });
  const [leaderboard, setLeaderboard] = useState([]);
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || { name: "Guest", email: "" };
    const testCount = JSON.parse(localStorage.getItem("testCount")) || 0;
    const totalScore = JSON.parse(localStorage.getItem("totalScore")) || 0;
    
    setUser({ ...storedUser, testCount, totalScore });

    // Update leaderboard
    const storedLeaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    const existingUserIndex = storedLeaderboard.findIndex((u) => u.email === storedUser.email);

    if (existingUserIndex !== -1) {
      storedLeaderboard[existingUserIndex].testCount = testCount;
      storedLeaderboard[existingUserIndex].totalScore = totalScore;
    } else {
      storedLeaderboard.push({ ...storedUser, testCount, totalScore });
    }

    // Sort leaderboard by highest testCount first
    storedLeaderboard.sort((a, b) => b.testCount - a.testCount);
    localStorage.setItem("leaderboard", JSON.stringify(storedLeaderboard));
    setLeaderboard(storedLeaderboard);

    // Set Achievements
    const newAchievements = [];
    if (testCount >= 5) newAchievements.push("🏅 Quiz Enthusiast");
    if (testCount >= 10) newAchievements.push("🥈 Knowledge Seeker");
    if (testCount >= 20) newAchievements.push("🥇 Quiz Master");

    setAchievements(newAchievements);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      {/* User Profile Section */}
      <div className="user-profile">
        <img src="https://via.placeholder.com/100" alt="Profile" className="profile-img" />
        <h2 className="user-name">{user.name}</h2>
        <p className="user-email">📩 {user.email || "Not Provided"}</p>
        <p className="user-tests">📝 Tests Taken: {user.testCount}</p>
      </div>

      {/* Achievements Section */}
      <div className="achievements">
        <h3>🏆 Achievements</h3>
        {achievements.length > 0 ? (
          <ul>
            {achievements.map((achieve, index) => (
              <li key={index} className="achievement-item">{achieve}</li>
            ))}
          </ul>
        ) : (
          <p className="no-achievements">No achievements yet. Keep playing! 🎯</p>
        )}
      </div>

      {/* Leaderboard Section */}
      <div className="leaderboard">
        <h3>📊 Leaderboard</h3>
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>🏆 Rank</th>
              <th>👤 Name</th>
              <th>📝 Tests Attempted</th>
              <th>📊 Average Score (%)</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.slice(0, 5).map((player, index) => {
              const avgScore = player.testCount > 0 ? (player.totalScore / player.testCount).toFixed(2) : "0";
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{player.name}</td>
                  <td>{player.testCount}</td>
                  <td>{avgScore}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Buttons */}
      <div className="dashboard-buttons">
        <button onClick={() => navigate("/quizpage")} className="play-again">🚀 Play More</button>
        <button onClick={handleLogout} className="logout">🔴 Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;

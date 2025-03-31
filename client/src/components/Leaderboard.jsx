import { useState, useEffect } from 'react';

export default function Leaderboard() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/leaderboard')
      .then(res => res.json())
      .then(setScores);
  }, []);

  return (
    <div className="leaderboard">
      <h3>Top Scores</h3>
      <ol>
        {scores.map((player, index) => (
          <li key={player.id}>
            <span className="rank">{index + 1}.</span>
            <span className="name">{player.name}</span>
            <span className="score">{player.score}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
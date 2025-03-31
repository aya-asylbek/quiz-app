import React, { useEffect, useState } from 'react';

function GameResult({ score, restartGame, playerName }) {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    // Fetch the leaderboard from the backend (my server,js file )
    fetch('http://localhost:3000/api/players')
      .then((response) => response.json())
      .then((data) => setLeaderboard(data))
      .catch((error) => console.error('Error fetching leaderboard:', error));

    // Save the score to the database Postgres - table players
    const saveScore = async () => {
      const response = await fetch('http://localhost:3000/api/players', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: playerName, score }),
      });
      const data = await response.json();
      console.log(data.message);
    };
    saveScore();
  }, [score, playerName]);

  return (
    <div>
      <h2>Game Over</h2>
      <p>Your Score: {score}</p>
      {score > 3 ? <p>🎉 You Win! 🎉</p> : <p>😢 Try Again! 😢</p>}
      <button onClick={restartGame}>Play Again</button>

      <h3>Leaderboard</h3>
      <ul>
        {leaderboard.map((player) => (
          <li key={player.id}>{player.name}: {player.score}</li>
        ))}
      </ul>
    </div>
  );
}

export default GameResult;






















// previous code without database Postgres
// function GameResult({ score, restartGame }) {
//     return (
//       <div>
//         <h2>Game Over</h2>
//         <p>Your Score: {score}</p>
//         {score > 3 ? <p>🎉 You Win! 🎉</p> : <p>😢 Try Again! 😢</p>}
//         <button onClick={restartGame}>Play Again</button>
//       </div>
//     );
//   }
  
//   export default GameResult;
  
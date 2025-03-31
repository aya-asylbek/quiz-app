import React, { useState } from 'react';
import GameSetup from './components/GameSetup';
import GamePlay from './components/GamePlay';   
import GameResult from './components/GameResult';  
import Leaderboard from './components/Leaderboard';
import './App.css';

function App() {
  const [gameStage, setGameStage] = useState("setup");
  const [gameSettings, setGameSettings] = useState(null);
  const [gameData, setGameData] = useState(null);
  const [score, setScore] = useState(0);
  const [playerId, setPlayerId] = useState(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const startGame = async (settings) => {
    try {
      const { name, amount, category, difficulty, type } = settings;
      
      // Validating name
      if (!name?.trim()) {
        alert("Please enter a valid player name.");
        return;
      }

      // Create player
      const playerResponse = await fetch('http://localhost:3000/api/players', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim() })
      });

      if (!playerResponse.ok) {
        const error = await playerResponse.json();
        throw new Error(error.error || "Failed to create player");
      }

      const playerData = await playerResponse.json();
      setPlayerId(playerData.id);

      // Fetch questions
      const questionsResponse = await fetch(
        `http://localhost:3000/api/questions?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`
      );
      const questionsData = await questionsResponse.json();
      
      setGameSettings(settings);
      setGameData(questionsData.results);
      setGameStage("play");
    } catch (error) {
      console.error('Game start failed:', error.message);
      alert(error.message);
    }
  };

  const endGame = async (finalScore) => {
    try {
      await fetch(`http://localhost:3000/api/players/${playerId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score: finalScore })
      });
      setScore(finalScore);
      setGameStage("result");
    } catch (error) {
      console.error('Score save failed:', error);
      alert('Failed to save score. Please try again.');
    }
  };

  const restartGame = () => {
    setGameStage("setup");
    setGameSettings(null);
    setGameData(null);
    setScore(0);
    setPlayerId(null);
  };

  const toggleLeaderboard = () => setShowLeaderboard(!showLeaderboard);

  return (
    <div>
      {gameStage === "setup" && <GameSetup startGame={startGame} />}
      {gameStage === "play" && <GamePlay gameData={gameData} endGame={endGame} />}
      {gameStage === "result" && (
        <>
          <GameResult 
            score={score} 
            restartGame={restartGame} 
            playerId={playerId}
          />
          <button onClick={toggleLeaderboard}>
            {showLeaderboard ? 'Hide Leaderboard' : 'Show Leaderboard'}
          </button>
          {showLeaderboard && <Leaderboard />}
        </>
      )}
    </div>
  );
}

export default App;
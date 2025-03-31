import React, { useState } from 'react';
import GameSetup from './components/GameSetup';
import GamePlay from './components/GamePlay';   
import GameResult from './components/GameResult';  
import './App.css';


function App() {
  const [gameStage, setGameStage] = useState("setup");
  const [gameSettings, setGameSettings] = useState(null);
  const [gameData, setGameData] = useState(null);
  const [score, setScore] = useState(0);
  const [playerId, setPlayerId] = useState(null);

  // New: Create player when game starts 
  const startGame = async (settings) => {
    try {
      // Create player
      const playerResponse = await fetch('http://localhost:3000/api/players', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: settings.playerName })
      });
      const playerData = await playerResponse.json();
      setPlayerId(playerData.id);

      // Fetch questions from backend
      const questionsResponse = await fetch(
        `http://localhost:3000/api/questions?amount=${settings.amount}&category=${settings.category}&difficulty=${settings.difficulty}&type=${settings.type}`
      );
      const questionsData = await questionsResponse.json();
      
      setGameSettings(settings);
      setGameData(questionsData.results);
      setGameStage("play");
    } catch (error) {
      console.error('Game start failed:', error);
    }
  };

  // Save score when game ends
  const endGame = async (finalScore) => {
    try {
      await fetch(`http://localhost:3000/api/players/${playerId}/score`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score: finalScore })
      });
      setScore(finalScore);
      setGameStage("result");
    } catch (error) {
      console.error('Score save failed:', error);
    }
  };

  // Restart game
  const restartGame = () => {
    setGameStage("setup");
    setGameSettings(null);
    setGameData(null);
    setScore(0);
    setPlayerId(null);
  };

  // Add to return statement
  return (
    <div>
      {gameStage === "setup" && <GameSetup startGame={startGame} />}
      {gameStage === "play" && <GamePlay gameData={gameData} endGame={endGame} />}
      {gameStage === "result" && (
        <GameResult 
          score={score} 
          restartGame={restartGame} 
          playerId={playerId}
        />
      )}
    </div>
  );
}

export default App;

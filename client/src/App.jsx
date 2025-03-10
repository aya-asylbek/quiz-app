import { useState } from "react";
import GameSetup from "./components/GameSetup";

import GamePlay from "./components/GamePlay";
import GameResult from "./components/GameResult";

function App() {
  const [gameStage, setGameStage] = useState("setup"); // "setup", "play", "result"
  const [gameSettings, setGameSettings] = useState(null);
  const [gameData, setGameData] = useState(null);
  const [score, setScore] = useState(0);

  // Start the game with selected settings
  const startGame = async (settings) => {
    setGameSettings(settings);
    const response = await fetch(
      `http://localhost:3001/api/questions?amount=${settings.amount}&category=${settings.category}&difficulty=${settings.difficulty}&type=${settings.type}`
    );
    const data = await response.json();
    setGameData(data.results);
    setGameStage("play");
  };

  // End the game and go to the result screen
  const endGame = (finalScore) => {
    setScore(finalScore);
    setGameStage("result");
  };

  // Restart game
  const restartGame = () => {
    setGameStage("setup");
    setGameSettings(null);
    setGameData(null);
    setScore(0);
  };

  return (
    <div>
      {gameStage === "setup" && <GameSetup startGame={startGame} />}
      {gameStage === "play" && <GamePlay gameData={gameData} endGame={endGame} />}
      {gameStage === "result" && <GameResult score={score} restartGame={restartGame} />}
    </div>
  );
}

export default App;

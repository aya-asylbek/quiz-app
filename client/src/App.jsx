import { useState } from 'react';
import GameSetup from './components/GameSetup';
import Game from './components/Game';

function App() {
  const [gameSettings, setGameSettings] = useState(null);

  return (
    <div className="App">
      {!gameSettings ? (
        <GameSetup startGame={setGameSettings} />
      ) : (
        <Game settings={gameSettings} />
      )}
    </div>
  );
}

export default App;

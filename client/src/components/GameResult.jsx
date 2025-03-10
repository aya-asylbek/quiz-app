function GameResult({ score, restartGame }) {
    return (
      <div>
        <h2>Game Over</h2>
        <p>Your Score: {score}</p>
        {score > 3 ? <p>🎉 You Win! 🎉</p> : <p>😢 Try Again! 😢</p>}
        <button onClick={restartGame}>Play Again</button>
      </div>
    );
  }
  
  export default GameResult;
  
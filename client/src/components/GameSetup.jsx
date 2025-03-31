import React, { useState, useEffect } from 'react';

function GameSetup({ startGame }) {
  const [playerName, setPlayerName] = useState('');
  const [amount, setAmount] = useState(10);
  const [category, setCategory] = useState('9');
  const [difficulty, setDifficulty] = useState('easy');
  const [type, setType] = useState('multiple');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://opentdb.com/api_category.php')
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.trivia_categories);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
        setLoading(false);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = playerName.trim();

    if (!trimmedName) {
      alert("Please enter your name.");
      return;
    }

    if (amount < 1 || amount > 50) {
      alert("Please enter a number between 1 and 50 for questions.");
      return;
    }

    startGame({
      name: trimmedName,
      amount,
      category,
      difficulty,
      type
    });
  };

  return (
    <form onSubmit={handleSubmit} className="game-setup">
      <h2>Trivia Game Setup</h2>
      
      <div className="form-group">
        <label htmlFor="playerName">Your Name:</label>
        <input
          id="playerName"
          type="text"
          placeholder="Enter your name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          required
          minLength="2"
          maxLength="30"
        />
      </div>

      <div className="form-group">
        <label htmlFor="amount">Number of Questions:</label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(Math.max(1, Math.min(50, e.target.value)))}
          min="1"
          max="50"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Category:</label>
        <select 
          id="category"
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
          disabled={loading}
        >
          {loading ? (
            <option>Loading categories...</option>
          ) : (
            categories.map((categoryItem) => (
              <option key={categoryItem.id} value={categoryItem.id}>
                {categoryItem.name}
              </option>
            ))
          )}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="difficulty">Difficulty:</label>
        <select 
          id="difficulty"
          value={difficulty} 
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="type">Question Type:</label>
        <select 
          id="type"
          value={type} 
          onChange={(e) => setType(e.target.value)}
        >
          <option value="multiple">Multiple Choice</option>
          <option value="boolean">True/False</option>
        </select>
      </div>

      <button type="submit" className="start-button">
        Start Game
      </button>
    </form>
  );
}

export default GameSetup;
import React, { useState, useEffect } from 'react';

function GameSetup({ startGame }) {
  const [playerName, setPlayerName] = useState('');
  const [amount, setAmount] = useState(10); // Default number of questions
  const [category, setCategory] = useState('9'); // Default category (General Knowledge)
  const [difficulty, setDifficulty] = useState('easy');
  const [type, setType] = useState('multiple');
  const [categories, setCategories] = useState([]); // To store categories

  // Fetch categories from the OpenTDB API
  useEffect(() => {
    fetch('https://opentdb.com/api_category.php')
      .then((response) => response.json())
      .then((data) => setCategories(data.trivia_categories)) // Store categories in state
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  const handleStartGame = () => {
    startGame({
      playerName,
      amount,
      category,
      difficulty,
      type
    });
  };

  return (
    <div>
      <h2>Trivia Game</h2>
      <input
        type="text"
        placeholder="Enter your name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <div>
        <label>Amount of Questions</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div>
        <label>Category</label>
        <select onChange={(e) => setCategory(e.target.value)} value={category}>
          {categories.length > 0 ? (
            categories.map((categoryItem) => (
              <option key={categoryItem.id} value={categoryItem.id}>
                {categoryItem.name}
              </option>
            ))
          ) : (
            <option>Loading categories...</option>
          )}
        </select>
      </div>
      <div>
        <label>Difficulty</label>
        <select onChange={(e) => setDifficulty(e.target.value)} value={difficulty}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <div>
        <label>Type</label>
        <select onChange={(e) => setType(e.target.value)} value={type}>
          <option value="multiple">Multiple Choice</option>
          <option value="boolean">True/False</option>
        </select>
      </div>
      <button onClick={handleStartGame}>Start Game</button>
    </div>
  );
}

export default GameSetup;

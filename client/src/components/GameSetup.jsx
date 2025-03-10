import { useState, useEffect } from "react";

function GameSetup({ startGame }) {
  const [amount, setAmount] = useState(5);
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [type, setType] = useState("multiple");
  const [categories, setCategories] = useState([]); // Store categories

  // Fetch trivia categories from OpenTDB API
  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then((res) => res.json())
      .then((data) => setCategories(data.trivia_categories))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    startGame({ amount, category, difficulty, type });
  };

  return (
    <div>
      <h2>Trivia Game</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Number of Questions:
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </label>

        {/* Category Dropdown */}
        <label>
          Category:
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Any Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Difficulty:
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>

        <label>
          Type:
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True/False</option>
          </select>
        </label>

        <button type="submit">Start Game</button>
      </form>
    </div>
  );
}

export default GameSetup;

import { useRef } from 'react';
import he from 'he';

export default function GameSetup({ startGame }) {
  const formRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const settings = {
      amount: formData.get('amount'),
      category: formData.get('category'),
      difficulty: formData.get('difficulty'),
      type: formData.get('type')
    };
    startGame(settings);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <label>
        Number of Questions:
        <input name="amount" type="number" min="1" max="50" defaultValue="10" />
      </label>
      
      <label>
        Category:
        <select name="category">
          <option value="">Any</option>
          <option value="9">General Knowledge</option>
          <option value="18">Computers</option>
          {/* Add more categories */}
        </select>
      </label>

      <button type="submit">Start Quiz</button>
    </form>
  );
}
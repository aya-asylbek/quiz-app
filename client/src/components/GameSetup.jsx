// client/src/GameSetup.jsx
import { useRef } from 'react';

export default function GameSetup({ startGame }) {
  const formRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    startGame(Object.fromEntries(formData));
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <label>
        Questions:
        <input name="amount" type="number" min="1" defaultValue="5" required />
      </label>
      <button type="submit">Start Quiz</button>
    </form>
  );
}
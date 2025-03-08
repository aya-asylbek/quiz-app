// src/components/Game.jsx
import { useState, useEffect } from 'react';

function Game({ settings }) {  // settings prop passed from parent
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    // Add query parameters from settings
    const queryParams = new URLSearchParams(settings);
    
    fetch(`http://localhost:5000/api/questions?${queryParams}`)
      .then(res => res.json())
      .then(data => {
        setQuestions(data.results);
        setLoading(false);
      })
      .catch(error => {
        console.error('Fetch error:', error);
        setLoading(false);
      });
  }, [settings]);  // Re-run when settings change

  return (
    <div className="game-container">
      {loading ? (
        <div className="loading">Loading questions...</div>
      ) : (
        questions.map((question, index) => (
          <div key={index} className="question-card">
            <h3 dangerouslySetInnerHTML={{ __html: question.question }}></h3>
            {/* Add answer buttons here later */}
          </div>
        ))
      )}
    </div>
  );
}

export default Game;
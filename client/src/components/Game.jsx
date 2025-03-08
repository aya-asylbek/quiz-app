import { useState, useEffect } from 'react';

export default function Game({ settings }) {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/questions')
      .then(res => res.json())
      .then(data => setQuestions(data.results));
  }, [settings]);

  return (
    <div>
      {questions.map((q, i) => (
        <div key={i}>
          <h3>{q.question}</h3>
        </div>
      ))}
    </div>
  );
}
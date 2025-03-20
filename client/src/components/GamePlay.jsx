import { useState } from "react";

function GamePlay({ gameData, endGame }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  if (!gameData) return <p>Loading...</p>;

  const handleAnswer = (selected) => {
    if (selected === gameData[currentIndex].correct_answer) {
      setScore(score + 1);
    }

    if (currentIndex + 1 < gameData.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      endGame(score);
    }
  };

  //it would be good to add feedback to the player regarding their score.
  //A count following each question for the correct guess versus the wrong one.
  const question = gameData[currentIndex];
  const answers = [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5);

  return (
    <div>
      <h2>Question {currentIndex + 1}</h2>
      <p>{question.question}</p>
      {answers.map((answer, index) => (
        <button key={index} onClick={() => handleAnswer(answer)}>
          {answer}
        </button>
      ))}
    </div>
  );
}

export default GamePlay;

import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (timeRemaining <= 1) {
        setTimeRemaining(10);
        onAnswered(false);
      } else {
        setTimeRemaining(timeRemaining - 1);
      }
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [timeRemaining, onAnswered]); 

  function handleAnswerClick(answerIndex) {
    setTimeRemaining(10);
    const isCorrect = answerIndex === question.correctIndex;
    onAnswered(isCorrect);
  }

  return (
    <div className="question">
      <h2>{question.prompt}</h2>
      <h3>{timeRemaining} seconds remaining</h3>
      <div className="answers">
        {question.answers.map((answer, index) => (
          <button key={index} onClick={() => handleAnswerClick(index)}>
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;
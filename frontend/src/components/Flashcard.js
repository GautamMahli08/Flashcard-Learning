import React, { useState } from "react";
import axios from "axios";
import "./Flashcard.css"; // Import the CSS file for styling

const Flashcard = ({ flashcard, onUpdate, token }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const handleResponse = async (isCorrect) => {
    try {
      await axios.put(
      `https://flashcard-learning-1.onrender.com/${flashcard._id}`,
        { isCorrect },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onUpdate(); // Refresh the flashcard list
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flashcard">
      <h3>{flashcard.question}</h3>
      {showAnswer && <p>{flashcard.answer}</p>}
      <button onClick={() => setShowAnswer(!showAnswer)}>
        {showAnswer ? "Hide Answer" : "Show Answer"}
      </button>
      <div className="response-buttons">
        <button className="correct-button" onClick={() => handleResponse(true)}>
          Got it right
        </button>
        <button className="incorrect-button" onClick={() => handleResponse(false)}>
          Got it wrong
        </button>
      </div>
    </div>
  );
};

export default Flashcard;

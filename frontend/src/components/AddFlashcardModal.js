import React, { useState } from "react";
import axios from "axios";

const AddFlashcardModal = ({ onClose, onAddFlashcard, token }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://flashcard-learning-7zzf.onrender.com/api/flashcards",
        { question, answer },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onAddFlashcard(res.data); // Notify parent component about the new flashcard
      onClose(); // Close the modal
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add New Flashcard</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Question</label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Answer</label>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />
          </div>
          <div className="modal-buttons">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Add Flashcard</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFlashcardModal;

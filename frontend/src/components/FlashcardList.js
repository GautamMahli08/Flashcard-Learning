import React, { useEffect, useState, useCallback } from "react"; // Add useCallback
import axios from "axios";
import Flashcard from "./Flashcard";
import BlurText from "./BlurText"; // Import the BlurText component
import backgroundImageUrl from "./man.jpg"; // Import the background image
import "./FlashcardList.css"; // Import the CSS file for styling
import "./AddFlashcardModal.css";

const FlashcardList = ({ token }) => {
  const [flashcards, setFlashcards] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false); // State to toggle the add form
  const [newQuestion, setNewQuestion] = useState(""); // State for the new question
  const [newAnswer, setNewAnswer] = useState(""); // State for the new answer

  // Wrap fetchFlashcards in useCallback
  const fetchFlashcards = useCallback(async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/flashcards`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFlashcards(res.data);
    } catch (err) {
      console.error(err);
    }
  }, [token]); // Add token as a dependency

  // Fetch flashcards on component mount
  useEffect(() => {
    fetchFlashcards();
  }, [fetchFlashcards]); // Add fetchFlashcards to the dependency array

  // Group flashcards by box
  const groupFlashcardsByBox = () => {
    const grouped = {};
    flashcards.forEach((flashcard) => {
      const box = flashcard.box;
      if (!grouped[box]) {
        grouped[box] = [];
      }
      grouped[box].push(flashcard);
    });
    return grouped;
  };

  // Handle adding a new flashcard
  const handleAddFlashcard = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://flashcard-learning-7zzf.onrender.com/api/flashcards",
        { question: newQuestion, answer: newAnswer },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setFlashcards([...flashcards, res.data]); // Add the new flashcard to the list
      setNewQuestion(""); // Clear the question input
      setNewAnswer(""); // Clear the answer input
      setShowAddForm(false); // Hide the add form
    } catch (err) {
      console.error(err);
    }
  };

  // Grouped flashcards
  const groupedFlashcards = groupFlashcardsByBox();

  return (
    <div
      className="flashcard-list"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`, // Set the background image
      }}
    >
      {/* Add a blur overlay */}
      <div className="blur-overlay" />
      {/* Add the BlurText component for the heading */}
      <BlurText
        text="Flashcard Learning App"
        delay={150}
        animateBy="words"
        direction="top"
        className="text-2xl mb-8"
      />
      {Object.keys(groupedFlashcards).map((box) => (
        <div key={box} className="flashcard-box">
          <h2>Box {box}</h2>
          {groupedFlashcards[box].map((flashcard) => (
            <Flashcard
              key={flashcard._id}
              flashcard={flashcard}
              onUpdate={fetchFlashcards}
              token={token}
            />
          ))}
        </div>
      ))}
      {/* Add Flashcard Button and Form */}
      <div className="add-flashcard-container">
        <button
          className="add-flashcard-button"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? "Cancel" : "Add Flashcard"}
        </button>
        {showAddForm && (
          <form onSubmit={handleAddFlashcard} className="add-flashcard-form">
            <input
              type="text"
              placeholder="Question"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Answer"
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              required
            />
            <button type="submit">Add</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default FlashcardList;

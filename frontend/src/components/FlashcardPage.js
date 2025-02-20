import React, { useEffect, useState } from "react";
import axios from "axios";

const FlashcardPage = () => {
  const [stacks, setStacks] = useState([]);
  const token = localStorage.getItem("token");

  // Fetch stacks and boxes for the logged-in user
  const fetchStacks = async () => {
    try {
      const res = await axios.get("https://flashcard-learning-1.onrender.com/api/stacks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStacks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStacks();
  }, []);

  return (
    <div>
      <h1>Flashcard Stacks</h1>
      {stacks.length > 0 ? (
        stacks.map((stack) => (
          <div key={stack._id}>
            <h2>{stack.name}</h2>
            <div>
              {stack.boxes.map((box) => (
                <div key={box._id}>
                  <h3>Box {box.number}</h3>
                  <ul>
                    {box.flashcards.map((flashcard) => (
                      <li key={flashcard._id}>
                        <strong>Q:</strong> {flashcard.question} <br />
                        <strong>A:</strong> {flashcard.answer}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>No stacks found.</p>
      )}
    </div>
  );
};

export default FlashcardPage;

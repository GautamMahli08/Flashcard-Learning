const mongoose = require("mongoose");

const flashcardSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  box: { type: Number, default: 1 },
  nextReviewDate: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Associate with user
});

module.exports = mongoose.model("Flashcard", flashcardSchema);
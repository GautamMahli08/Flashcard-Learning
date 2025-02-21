const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password during registration:", hashedPassword); // Log the hashed password
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login user
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    console.log("Provided password:", password); // Log the provided password
    console.log("Hashed password in DB:", user.password); // Log the hashed password in the database

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch); // Log the result of the comparison

    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

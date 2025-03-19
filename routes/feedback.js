const express = require("express");
const router = express.Router();
const reportModel = require("../models/feedbackModel");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_KEY; // Ensure this is set in your .env file

router.post("/", async (req, res) => {
  try {
    // Extract token from headers
    const token = req.headers.authorization?.split(" ")[1]; // Get token after "Bearer"
    
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id; // Assuming token contains user ID

    const { data } = req.body; // Feedback data

    // Save feedback with user ID
    const report = await reportModel.create({
      from: userId, // Store user ID
      data,
    });

    res.status(200).json({ msg: "Feedback successful" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;

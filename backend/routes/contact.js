const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');
const User = require('../models/user');
const { authenticateToken } = require('./userAuth');

router.post('/contact-us', authenticateToken, async (req, res) => {
  try {
    const { name, subject, message } = req.body;

    if (!name || !subject || !message) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const user = await User.findById(req.user.id);
    if (!user || !user.email) {
      return res.status(400).json({ message: "User email not found. Please log in again." });
    }

    const email = user.email;
    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();

    return res.status(201).json({ message: "Message submitted successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Error submitting message", error: error.message });
  }
});

module.exports = router;

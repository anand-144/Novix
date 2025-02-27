const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');
const User = require('../models/User'); // Import User model to fetch user's email
const { authenticateToken } = require('./userAuth');

router.post('/contact-us', authenticateToken, async (req, res) => {
  try {
    const { name, subject, message } = req.body;
    
    // Validate required fields from the form
    if (!name || !subject || !message) {
      return res.status(400).json({ message: "Name, subject, and message are required" });
    }
    
    // Retrieve the user from the database using the ID from the token
    const user = await User.findById(req.user.id);
    if (!user || !user.email) {
      return res.status(400).json({ message: "User email not found. Please log in properly." });
    }
    
    // Use the email fetched from the database
    const email = user.email;
    
    // Create a new Contact document with the form data and the user's email
    const newContact = new Contact({ name, email, subject, message });
    const savedContact = await newContact.save();
    
    return res.status(201).json({
      message: "Contact message submitted successfully",
      data: savedContact
    });
  } catch (error) {
    console.error("Error submitting contact message:", error);
    return res.status(500).json({
      message: "Error submitting contact message",
      error: error.message
    });
  }
});

module.exports = router;

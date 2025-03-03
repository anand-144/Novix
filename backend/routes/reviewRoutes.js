// routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const Review = require('../models/review');
const { authenticateToken } = require('./userAuth');

// @desc    Get all reviews for a specific book
// @route   GET /api/reviews/:bookId
// @access  Public
router.get('/:bookId', async (req, res) => {
    try {
      const reviews = await Review.find({ book: req.params.bookId })
        .populate({ path: 'user', select: 'username' })  // Use 'username' instead of 'name'
        .sort({ createdAt: -1 });
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

// @desc    Create a new review for a book
// @route   POST /api/reviews/:bookId
// @access  Private
router.post('/:bookId', authenticateToken, async (req, res) => {
  const { rating, comment } = req.body;
  try {
    const review = new Review({
      book: req.params.bookId,
      user: req.user.id, // or req.user._id depending on how your token is structured
      rating,
      comment,
    });
    const createdReview = await review.save();
    // Populate the user field for the response
    const populatedReview = await Review.findById(createdReview._id).populate({ path: 'user', select: 'username' }) ;
    res.status(201).json(populatedReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Update an existing review
// @route   PUT /api/reviews/:id
// @access  Private
router.put('/:id', authenticateToken, async (req, res) => {
  const { rating, comment } = req.body;
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    // Only allow the user who created the review to update it
    if (review.user.toString() !== req.user.id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    review.rating = rating || review.rating;
    review.comment = comment || review.comment;
    const updatedReview = await review.save();
    const populatedReview = await Review.findById(updatedReview._id).populate({ path: 'user', select: 'username' }) ;
    res.json(populatedReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    // Only allow the user who created the review to delete it
    if (review.user.toString() !== req.user.id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    await review.remove();
    res.json({ message: 'Review removed' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { postABook, getAllBooks, getSingleBook, UpdateBook, deletedBook } = require('../books/books.controller');
const verifyAdminToken = require('../middleware/verfiyAdminToken');
const upload = require('../utils/imageUpload');

// Create book with image upload
router.post(
  "/create-book",
  verifyAdminToken,
  upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'backImage', maxCount: 1 }
  ]),
  postABook
);

// Get all books
router.get("/", getAllBooks);

// Get single book
router.get("/:id", getSingleBook);

// Update book
router.put("/edit/:id", verifyAdminToken, UpdateBook);

// Delete book
router.delete("/:id", verifyAdminToken, deletedBook);

module.exports = router;

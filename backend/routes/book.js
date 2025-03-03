const express = require("express");
const router = express.Router();
const { authenticateToken } = require("./userAuth");
const Book = require("../models/book");
const upload = require("../middleware/upload");

// Create a new book with image upload (uploads to Cloudinary)
router.post("/newbook", authenticateToken, upload.array('images', 3), async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Only admins can add books" });
    }

    const imageUrls = req.files.map(file => file.path);

    const newBook = new Book({
      images: imageUrls,
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      language: req.body.language,
      genre: req.body.genre,
      rating: req.body.rating,
      reviews: req.body.reviews,
      isbn: req.body.isbn,
      publishedDate: req.body.publishedDate,
      publisher: req.body.publisher,
    });

    await newBook.save();
    return res.status(200).json({ message: "Book added successfully", book: newBook });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error adding book", error: error.message });
  }
});

// Get all books
router.get("/allbooks", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    return res.status(200).json({ books });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error getting books", error: error.message });
  }
});

// Update book by ID (optional admin check added)
router.put("/updatebook/:id", authenticateToken, async (req, res) => {
  try {
    // Optional: Only allow admins to update a book
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Only admins can update books" });
    }

    const { id } = req.params;
    const { title, author, description, price, stock, language, genre, rating, reviews, isbn, publishedDate, publisher } = req.body;

    const book = await Book.findByIdAndUpdate(id, { title, author, description, price, stock, language, genre, rating, reviews, isbn, publishedDate, publisher }, { new: true });

    return res.status(200).json({ message: "Book updated successfully", book });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating book", error: error.message });
  }
});

//delete book
router.delete("/deletebook/:id", authenticateToken, async (req, res) => {
  try {
    // Only allow admins to delete a book
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Only admins can delete books" });
    }

    const { id } = req.params;
    await Book.findByIdAndDelete(id);
    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting book", error: error.message });
  }
});

//get recent books
router.get("/recentbooks", async (req, res) => {
  try {
    const recentBooks = await Book.find().sort({ createdAt: -1 }).limit(5);
    return res.status(200).json({ books: recentBooks });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error getting recent books", error: error.message });
  }
});

//get book by id
router.get("/book/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Fetching book with ID:", id);
    const book = await Book.findById(id);
    if (!book) {
      console.log("Book not found");
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json({ book });
  } catch (error) {
    console.error("Error fetching book:", error);
    return res.status(500).json({ message: "Error getting book by ID", error: error.message });
  }
});


module.exports = router;

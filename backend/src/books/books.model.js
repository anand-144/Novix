const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  trending: { type: Boolean, required: true },
  coverImage: { type: String, required: true },
  backImage: { type: String, required: true },
  oldPrice: { type: Number, required: true },
  newPrice: { type: Number, required: true },
  author: { type: String, required: true },  // Ensure the author field is marked as required
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;

const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    images: {
      type: [],
      required: true, // if you want at least one image
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    language: {
      type: String,
      required: true,
      trim: true,
    },
    genre: {
      type: String,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    reviews: {
      type: [String],
      default: [],
    },
    isbn: {
      type: String,
    },
    publishedDate: {
      type: Date,
    },
    publisher: {
      type: String,
    }, 
  },
  { timestamps: true }
);

module.exports = mongoose.models.Book || mongoose.model("Book", bookSchema);

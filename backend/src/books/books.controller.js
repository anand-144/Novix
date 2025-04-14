const Book = require("./books.model");
const cloudinary = require('../utils/cloudinaryConfig');

// Create a new book with image upload
const postABook = async (req, res) => {
  try {
    const { title, description, category, trending, oldPrice, newPrice, author } = req.body;

    // Validate required fields
    if (!title || !description || !category || !author) {
      return res.status(400).send({ message: "Title, description, category, and author are required!" });
    }

    if (!req.files || !req.files.coverImage || !req.files.backImage) {
      return res.status(400).send({ message: "Cover and Back images are required!" });
    }

    // Upload cover image
    const coverImage = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ resource_type: 'image' }, (err, result) => {
        if (err) return reject(err);
        resolve(result.secure_url);
      }).end(req.files.coverImage[0].buffer);
    });

    // Upload back image
    const backImage = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ resource_type: 'image' }, (err, result) => {
        if (err) return reject(err);
        resolve(result.secure_url);
      }).end(req.files.backImage[0].buffer);
    });

    // Create new book
    const newBook = await Book.create({
      title,
      description,
      category,
      trending,
      oldPrice: oldPrice || '',
      newPrice: newPrice || '',
      coverImage,
      backImage,
      author: author || 'Unknown',  // Set default if no author is provided
    });

    res.status(200).send({ message: "Book posted successfully", book: newBook });

  } catch (error) {
    console.error("Error creating book", error);
    res.status(500).send({ message: "Failed to create book" });
  }
};

// Get all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).send(books);
  } catch (error) {
    console.error("Error fetching books", error);
    res.status(500).send({ message: "Failed to get books" });
  }
};

// Get single book
const getSingleBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) return res.status(404).send({ message: "Book not found!" });
    res.status(200).send(book);
  } catch (error) {
    console.error("Error fetching book", error);
    res.status(500).send({ message: "Failed to get book" });
  }
};

// Update book
const UpdateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, trending, oldPrice, newPrice, author } = req.body;
    const updateData = { title, description, category, trending, oldPrice, newPrice, author };

    if (req.files?.coverImage?.[0]) {
      const uploadedCoverImage = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ resource_type: 'image' }, (err, result) => {
          if (err) return reject(err);
          resolve(result.secure_url);
        }).end(req.files.coverImage[0].buffer);
      });
      updateData.coverImage = uploadedCoverImage;
    }

    if (req.files?.backImage?.[0]) {
      const uploadedBackImage = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ resource_type: 'image' }, (err, result) => {
          if (err) return reject(err);
          resolve(result.secure_url);
        }).end(req.files.backImage[0].buffer);
      });
      updateData.backImage = uploadedBackImage;
    }

    const updatedBook = await Book.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedBook) {
      return res.status(404).send({ message: "Book not found!" });
    }

    res.status(200).send({
      message: "Book updated successfully",
      book: updatedBook,
    });

  } catch (error) {
    console.error("Error updating book", error);
    res.status(500).send({ message: "Failed to update book" });
  }
};

// Delete book
const deletedBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) return res.status(404).send({ message: "Book not found!" });
    res.status(200).send({ message: "Book deleted successfully", book: deletedBook });
  } catch (error) {
    console.error("Error deleting book", error);
    res.status(500).send({ message: "Failed to delete book" });
  }
};

module.exports = {
  postABook,
  getAllBooks,
  getSingleBook,
  UpdateBook,
  deletedBook,
};

const router = require('express').Router();
const User = require('../models/User');
const { authenticateToken } = require('./userAuth');

// Add book to cart (book ID provided in headers)
router.put("/add-to-cart", authenticateToken, async (req, res) => {
  try {
    // Get bookId from request headers (all header keys are lower-case)
    const bookId = req.headers.bookid;
    if (!bookId) {
      return res.status(400).json({ message: "Book ID is required in headers" });
    }

    // Use the authenticated user's ID from the token
    const userId = req.user.id;

    // Find the user by their ID
    const userData = await User.findById(userId);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the book is already in the cart
    if (userData.cart.includes(bookId)) {
      return res.status(400).json({ message: "Book already in cart" });
    }

    // Push the book ID to the user's cart
    await User.findByIdAndUpdate(userId, { $push: { cart: bookId } });
    return res.status(200).json({ message: "Book added to cart successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});



//Remove book from cart

router.put("/remove-from-cart", authenticateToken, async (req, res) => {
  try {
    // Extract bookId from request headers (use the lower-case key)
    const bookId = req.headers.bookid;
    if (!bookId) {
      return res.status(400).json({ message: "Book ID is required in headers" });
    }

    // Use the authenticated user's ID from the token payload
    const userId = req.user.id;

    // Remove the book ID from the user's cart using the $pull operator
    await User.findByIdAndUpdate(userId, { $pull: { cart: bookId } });
    return res.status(200).json({ message: "Book removed from cart successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//get cart for a particular user

router.get("/get-user-cart", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const userData = await User.findById(userId).populate("cart");
    const cart = userData.cart.reverse();

    return res.status(200).json({ cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
})
  


module.exports = router;

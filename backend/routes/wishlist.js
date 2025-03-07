const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");

// Add to wishlist
router.put("/add-wishlist", authenticateToken, async (req, res) => {
  try {
    // Get bookid from headers (headers keys are case-insensitive but ensure you're sending it as 'bookid')
    const { bookid } = req.headers;
    if (!bookid) {
      return res.status(400).json({ message: "Book ID is required" });
    }

    const userId = req.user.id;
    const userData = await User.findById(userId);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    // Convert wishlist IDs to strings for proper comparison
    const wishlistIds = userData.wishlist.map((id) => id.toString());
    if (wishlistIds.includes(bookid)) {
      return res.status(400).json({ message: "Book already in wishlist" });
    }

    // Add book to wishlist
    await User.findByIdAndUpdate(userId, { $push: { wishlist: bookid } });
    return res.status(200).json({ message: "Book added to wishlist" });
  } catch (error) {
    console.error("Error in add-wishlist:", error);
    return res.status(500).json({ message: error.message });
  }
});

// Remove from wishlist
router.put("/remove-wishlist", authenticateToken, async (req, res) => {
  try {
    const { bookid } = req.headers;
    if (!bookid) {
      return res.status(400).json({ message: "Book ID is required" });
    }

    const userId = req.user.id;
    const userData = await User.findById(userId);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    // Convert wishlist IDs to strings
    const wishlistIds = userData.wishlist.map((id) => id.toString());
    if (!wishlistIds.includes(bookid)) {
      return res.status(400).json({ message: "Book not in wishlist" });
    }

    // Remove book from wishlist
    await User.findByIdAndUpdate(userId, { $pull: { wishlist: bookid } });
    return res.status(200).json({ message: "Book removed from wishlist" });
  } catch (error) {
    console.error("Error in remove-wishlist:", error);
    return res.status(500).json({ message: error.message });
  }
});

// Get wishlist for particular user
router.get("/get-wishlist", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const userData = await User.findById(userId).populate("wishlist");
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({ status: "success", data: userData.wishlist });
  } catch (error) {
    console.error("Error in get-wishlist:", error);
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;

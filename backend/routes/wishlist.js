const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");

// Add to wishlist
router.put("/add-wishlist", authenticateToken, async (req, res) => {
  try {
    // Get bookId from headers (or you can also send it in the body)
    const { bookid } = req.headers; // Note: headers are lower-case; use 'bookid'
    if (!bookid) {
      return res.status(400).json({ message: "Book ID is required" });
    }

    // Use the authenticated user's id from the token payload
    const userId = req.user.id;

    // Find the user by the id from the token
    const userData = await User.findById(userId);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the book is already in the wishlist
    if (userData.wishlist.includes(bookid)) {
      return res.status(400).json({ message: "Book already in wishlist" });
    }

    // Push the book id to the user's wishlist
    await User.findByIdAndUpdate(userId, { $push: { wishlist: bookid } });
    return res.status(200).json({ message: "Book added to wishlist" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
});

//remove from wishlist

router.delete("/remove-wishlist", authenticateToken, async (req, res) => {
    try {
      // Get bookid from headers (ensure key is 'bookid' in lower-case)
      const { bookid } = req.headers;
      if (!bookid) {
        return res.status(400).json({ message: "Book ID is required" });
      }
  
      // Use the authenticated user's id from the token payload
      const userId = req.user.id;
  
      // Find the user by the id from the token
      const userData = await User.findById(userId);
      if (!userData) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Check if the book is in the wishlist; if not, return an error
      if (!userData.wishlist.includes(bookid)) {
        return res.status(400).json({ message: "Book not in wishlist" });
      }
  
      // Remove the book id from the user's wishlist
      await User.findByIdAndUpdate(userId, { $pull: { wishlist: bookid } });
      return res.status(200).json({ message: "Book removed from wishlist" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  });

  //get whislist for particular user

  router.get("/get-wishlist", authenticateToken, async (req, res) => {
    try {
      const userId = req.user.id; // Use the user ID from the token
      const userData = await User.findById(userId).populate("wishlist");
      if (!userData) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.json({ status: "success", data: userData.wishlist });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  });
  
  

module.exports = router;

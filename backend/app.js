require('dotenv').config();
const express = require("express");
const app = express();

// Parse JSON bodies
app.use(express.json());

// Import routes
const userRoutes = require("./routes/user");
const bookRoutes = require("./routes/book");
const wishlistRoutes = require("./routes/wishlist");

// Load MongoDB configuration
require('./config/mongodb');

// Mount routes
app.use("/api/user", userRoutes);
app.use("/api/book", bookRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

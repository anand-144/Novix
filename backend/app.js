require('dotenv').config();
const express = require("express");
const app = express();

const cors = require("cors")

// Parse JSON bodies
app.use(cors());
app.use(express.json());

// Import routes
const userRoutes = require("./routes/user");
const bookRoutes = require("./routes/book");
const wishlistRoutes = require("./routes/wishlist");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/order");
const contactRoutes  = require("./routes/contact");
const reviewRoutes = require('./routes/reviewRoutes');

// Load MongoDB configuration
require('./config/mongodb');

// Mount routes
app.use("/api/user", userRoutes);
app.use("/api/book", bookRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/reviews", reviewRoutes);



app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

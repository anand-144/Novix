const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'https://your-frontend.vercel.app'], // update frontend URL
  credentials: true
}));

// Routes
const bookRoutes = require('./src/books/books.route');
const orderRoutes = require('./src/orders/order.route');
const userRoutes = require('./src/users/user.route');
const adminRoutes = require('./src/stats/admin.stats');

app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Novix server is running!');
});

// DB connect once
let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.DB_URL);
  isConnected = true;
}

// Export handler for Vercel
module.exports = async (req, res) => {
  await connectDB();
  return app(req, res);
};

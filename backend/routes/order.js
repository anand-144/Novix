const router = require('express').Router();
const User = require('../models/User');  // Ensure correct path
const Order = require('../models/orders');
const { authenticateToken } = require('./userAuth');
const Book = require('../models/book');

// Helper function to generate a unique order number
const generateOrderNumber = () => {
  return 'ORD-' + Date.now();
};

// Place order endpoint
router.post("/place-order", authenticateToken, async (req, res) => {
  try {
    // Get the authenticated user's ID from the token payload
    const userId = req.user.id;
    
    // Extract order items from request body (expects an array)
    const { order } = req.body;
    if (!order || !Array.isArray(order)) {
      return res.status(400).json({ message: "Order must be an array of order items" });
    }

    // Process each order item
    for (const orderItem of order) {
      // Validate that each order item has a bookId and quantity
      if (!orderItem.bookId || !orderItem.quantity) {
        return res.status(400).json({ message: "Each order item must have a bookId and quantity" });
      }
      
      // Create a new order document
      const newOrder = new Order({
        user: userId,
        book: orderItem.bookId,
        quantity: orderItem.quantity,
        totalAmount: orderItem.totalAmount,  // Ensure totalAmount is provided or computed
        orderNumber: generateOrderNumber(),    // Auto-generate a unique order number
      });
      
      // Save the new order to the database
      const savedOrder = await newOrder.save();
      
      // Save the order ID in the user's orders array
      await User.findByIdAndUpdate(userId, { $push: { orders: savedOrder._id } });
      
      // Remove the ordered book from the user's cart
      await User.findByIdAndUpdate(userId, { $pull: { cart: orderItem.bookId } });
    }
    
    return res.status(200).json({ message: "Order placed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error placing order", error: error.message });
  }
});

// Get order history of the authenticated user
router.get("/order-history", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    // Populate orders and, within each order, populate the "book" field
    const userData = await User.findById(userId).populate({
      path: "orders",
      populate: { path: "book" }
    });
  
    // Reverse orders so that the latest orders come first
    const ordersData = userData.orders.reverse();
    return res.json({
      status: "success",
      data: ordersData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching order history", error: error.message });
  }
});

// Get all orders (admin only)
router.get("/all-orders", authenticateToken, async (req, res) => {
  try {
    // Check if the authenticated user is an admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Only admins can view all orders" });
    }
  
    const orders = await Order.find()
      .populate({ path: "book" })
      .populate({ path: "user" })
      .sort({ createdAt: -1 });
      
    return res.status(200).json({
      status: "success",
      data: orders,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching all orders", error: error.message });
  }
});

// Update order status (admin only)
router.put("/update-status/:orderId", authenticateToken, async (req, res) => {
  try {
    // Check if the authenticated user is an admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Only admins can update order status" });
    }

    const { orderId } = req.params;
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }
    await Order.findByIdAndUpdate(orderId, { status });
    return res.status(200).json({ message: "Order status updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating order status", error: error.message });
  }
});

module.exports = router;

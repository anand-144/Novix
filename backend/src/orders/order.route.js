const express = require('express');
const { createAOrder, getOrderByEmail, getAllOrders , updateOrderStatus } = require('./order.controller');

const router = express.Router();

// Create new order
router.post('/', createAOrder);

// Get orders by user email
router.get('/email/:email', getOrderByEmail);

// Get all orders (Admin)
router.get('/admin', getAllOrders); // ✅ New route for admin

router.patch('/admin/:id/status', updateOrderStatus); // Use PATCH for partial update
// ✅ Route to update status by order ID




module.exports = router;

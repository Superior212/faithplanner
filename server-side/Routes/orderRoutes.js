const express = require('express');
const router = express.Router();
const { createOrder, updatePaymentStatus, getOrder, getOrdersByEmail, getAllOrders } = require('../Controllers/orderController');

// Route to get all orders
router.get('/orders', getAllOrders);

// Route to create a new order
router.post('/orders', createOrder);

// Route to get orders by email
router.get('/email/:email', getOrdersByEmail);

// Route to update payment status
router.put('/:orderId/payment-status', updatePaymentStatus);

// Route to get a specific order
router.get('/:orderId', getOrder);

module.exports = router;


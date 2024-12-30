const Order = require('../Models/Order');
const mongoose = require('mongoose');

const createOrder = async (req, res) => {
    try {
        const { contactInfo, items, total } = req.body;
        const order = new Order({
            contactInfo,
            items,
            total,
            paymentStatus: 'pending'
        });
        await order.save();
        res.status(201).json({ orderId: order._id, message: 'Order created successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updatePaymentStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(400).json({ message: 'Invalid order ID' });
        }
        const { paymentStatus, paypalOrderId } = req.body;
        const order = await Order.findByIdAndUpdate(
            orderId,
            { paymentStatus, paypalOrderId, updatedAt: Date.now() },
            { new: true }
        );
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json({ message: 'Payment status updated successfully', order });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(400).json({ message: 'Invalid order ID' });
        }
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getOrdersByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const orders = await Order.find({ 'contactInfo.email': email });
        res.json(orders);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createOrder, updatePaymentStatus, getOrder, getOrdersByEmail, getAllOrders };


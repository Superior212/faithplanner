const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/paymentController');

router.post('/create-order', PaymentController.createOrder);
router.post('/capture-payment', PaymentController.capturePayment);
router.get('/history', PaymentController.getPaymentHistory);

module.exports = router;
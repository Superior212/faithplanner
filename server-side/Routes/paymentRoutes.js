const express = require('express');
const router = express.Router();
const { createOrder, capturePayment, getPaymentHistory } = require('../Controllers/paymentController');



router.post('/create-order', createOrder);
router.post('/capture-payment', capturePayment);
router.get('/history', getPaymentHistory);

module.exports = router;
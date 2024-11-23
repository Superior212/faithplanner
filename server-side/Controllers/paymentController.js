const Payment = require('../Models/Payment');
const PayPalService = require('../services/paypalService');

const createOrder = async (req, res) => {
    try {
        const { items, amount } = req.body;

        console.log('Received request body:', JSON.stringify(req.body, null, 2));

        if (!amount || !amount.value || parseFloat(amount.value) <= 0) {
            return res.status(400).json({
                error: 'Valid amount is required'
            });
        }

        console.log('Creating PayPal order with:', { items, amount });
        const order = await PayPalService.createOrder(items, amount);
        console.log('PayPal order response:', JSON.stringify(order, null, 2));

        if (!order.id) {
            throw new Error('Failed to create PayPal order: No order ID received');
        }

        // Save the order in database
        const savedOrder = await Payment.create({
            orderID: order.id,
            amount: parseFloat(amount.value),
            currency: amount.currency_code,
            status: 'CREATED'
        });
        console.log('Order saved in database:', JSON.stringify(savedOrder, null, 2));

        res.json({ orderId: order.id });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({
            error: 'Error creating PayPal order',
            details: error.message
        });
    }
};

const capturePayment = async (req, res) => {
    try {
        const { orderID } = req.body;

        if (!orderID) {
            return res.status(400).json({
                error: 'OrderID is required'
            });
        }

        const captureData = await PayPalService.capturePayment(orderID);

        // Update payment status in database
        await Payment.findOneAndUpdate(
            { orderID },
            {
                status: 'CAPTURED',
                payerEmail: captureData.payer?.email_address,
                updatedAt: Date.now()
            }
        );

        res.json(captureData);
    } catch (error) {
        console.error('Error capturing payment:', error);

        // Update payment status to failed
        if (req.body.orderID) {
            await Payment.findOneAndUpdate(
                { orderID: req.body.orderID },
                {
                    status: 'FAILED',
                    updatedAt: Date.now()
                }
            );
        }

        res.status(500).json({
            error: 'Error capturing PayPal payment',
            details: error.message
        });
    }
};

const getPaymentHistory = async (req, res) => {
    try {
        const payments = await Payment.find()
            .sort({ createdAt: -1 })
            .limit(10);
        res.json(payments);
    } catch (error) {
        console.error('Error fetching payment history:', error);
        res.status(500).json({
            error: 'Error fetching payment history',
            details: error.message
        });
    }
};

module.exports = {
    createOrder,
    capturePayment,
    getPaymentHistory
};


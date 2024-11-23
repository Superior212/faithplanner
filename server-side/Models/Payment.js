const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    orderID: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: 'USD'
    },
    status: {
        type: String,
        required: true,
        enum: ['CREATED', 'CAPTURED', 'FAILED']
    },
    payerEmail: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
    
});

module.exports = mongoose.model('Payment', PaymentSchema);


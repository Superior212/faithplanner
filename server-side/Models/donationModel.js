const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const donationSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
        trim: true
    },
    organization: {
        type: String,
        required: [true, 'Organization name is required'],
        trim: true
    },
    // amount: {
    //     type: Number,
    //     required: [true, 'Donation amount is required'],
    //     min: [1, 'Amount must be at least 1']
    // },
    donationDate: {
        type: Date,
        default: Date.now
    },
    notes: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Donation', donationSchema);
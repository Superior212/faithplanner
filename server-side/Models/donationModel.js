const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const donationSchema = new Schema({
    firstname: {
        type: String,
        required: [true, 'First Name is required'],
        trim: true
    },
    lastname: {
        type: String,
        required: [true, 'Last Name is required'],
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
    phonenumber: {
        type: Number,
        required: [true, 'Phone Number is required'],
        trim: true
    },
    donationDate: {
        type: Date,
        default: Date.now
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Donation', donationSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userDetailsSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
    },
    referredBy: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('UserDetails', userDetailsSchema);
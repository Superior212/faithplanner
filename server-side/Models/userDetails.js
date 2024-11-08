const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userDetailsSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    heardFrom: {
        source: {
            type: String,
            required: true,
            enum: ['church', 'socialMedia', 'other']
        },
        details: {
            type: String,
            required: true,
            trim: true
        }
    },
    churchSelection: {
        type: String,
        enum: ['listed', 'not-listed'],
        required: function () { return this.heardFrom.source === 'church'; }
    },
    addForDonations: {
        type: Boolean,
        default: false
    },
    churchDetails: {
        name: {
            type: String,
            required: function () { return this.heardFrom.source === 'church'; },
            trim: true
        },
        address: {
            country: {
                type: String,
                required: function () { return this.addForDonations; },
                trim: true
            },
            state: {
                type: String,
                required: function () { return this.addForDonations && this.churchDetails.address.country === 'US'; },
                trim: true
            },
            postalCode: {
                type: String,
                required: function () { return this.addForDonations; },
                trim: true
            }
        },
        phoneNumber: {
            type: {
                type: String,
                enum: ['us', 'international'],
                required: function () { return this.addForDonations; }
            },
            number: {
                type: String,
                required: function () { return this.addForDonations; },
                trim: true
            }
        }
    },
    submittedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('UserDetails', userDetailsSchema);


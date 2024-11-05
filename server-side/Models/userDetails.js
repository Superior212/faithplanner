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
    churchDetails: {
        type: String,
        required: function () { return this.heardFrom === 'church'; },
        trim: true
    },
    socialMediaPlatform: {
        type: String,
        required: function () { return this.heardFrom === 'socialMedia'; },
        enum: ['tiktok', 'instagram', 'facebook']
    },
    otherSource: {
        type: String,
        required: function () { return this.heardFrom === 'other'; },
        trim: true
    },
    submittedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('UserDetails', userDetailsSchema);
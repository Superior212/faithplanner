const express = require('express');
const router = express.Router();
const {
    createDonation,
    getAllDonations,
    getDonationsByOrganization,
    getDonationById
} = require('../Controllers/donationController');

// Create new donation
router.post('/donations', createDonation);

// Get all donations
router.get('/donations', getAllDonations);

// Get donations grouped by organization
router.get('/donations/by-organization', getDonationsByOrganization);

// Get specific donation
router.get('/donations/:id', getDonationById);

module.exports = router;
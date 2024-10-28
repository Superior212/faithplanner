const express = require('express');
const router = express.Router();
const {
    createUserDetails,
    getAllUserDetails,
    getUserDetailsById
} = require('../Controllers/userDetailsController');

// Route to create user details
router.post('/details', createUserDetails);

// Route to get all user details
router.get('/details', getAllUserDetails);

// Route to get specific user details
router.get('/details/:id', getUserDetailsById);

module.exports = router;
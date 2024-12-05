const express = require('express');
const { submitContactForm, getContactMessages } = require('../Controllers/contactController');


const router = express.Router();

router.post('/contact', submitContactForm);


router.get('/contact', getContactMessages);

module.exports = router;


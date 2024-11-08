const { createReview, getAllReviews } = require('../Controllers/reviewController');
const express = require('express');
const router = express.Router();

router.post('/reviews', createReview);
router.get('/reviews', getAllReviews);

module.exports = router;
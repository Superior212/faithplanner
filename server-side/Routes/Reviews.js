const { createReview, getAllReviewsForAdmin, approveReview, getAllApprovedReviews } = require('../Controllers/reviewController');
const express = require('express');
const router = express.Router();

router.post('/reviews', createReview);
router.get('/reviews', getAllReviewsForAdmin);
router.get('/reviews/approved', getAllApprovedReviews);
router.patch('/reviews/:reviewId/approve', approveReview);



module.exports = router;
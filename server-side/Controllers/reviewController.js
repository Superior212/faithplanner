const Review = require('../Models/review');
const getAllApprovedReviews = async (req, res) => {
    try {
        console.log('Fetching approved reviews...');

        // Log the total number of reviews
        const totalReviews = await Review.countDocuments();
        console.log(`Total reviews in database: ${totalReviews}`);

        // Log the number of approved reviews
        const approvedReviewsCount = await Review.countDocuments({ approved: true });
        console.log(`Number of approved reviews: ${approvedReviewsCount}`);

        // Fetch approved reviews
        const reviews = await Review.find({ approved: true });
        console.log(`Fetched approved reviews: ${JSON.stringify(reviews)}`);

        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error getting approved reviews:', error);
        res.status(500).json({ error: 'Error getting approved reviews' });
    }
};

const createReview = async (req, res) => {
    const { rating, review } = req.body;

    if (!rating || !review) {
        return res.status(400).json({ error: 'Rating and review are required' });
    }

    try {
        const newReview = await Review.create({
            rating,
            review,
            approved: false // Set to false by default
        });
        res.status(201).json({ message: 'Review submitted for approval', data: newReview });
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({ error: 'Error creating review' });
    }
};

const getAllReviewsForAdmin = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error getting all reviews:', error);
        res.status(500).json({ error: 'Error getting all reviews' });
    }
};

const approveReview = async (req, res) => {
    const { reviewId } = req.params;

    try {
        const review = await Review.findByIdAndUpdate(reviewId, { approved: true }, { new: true });
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }
        res.status(200).json({ message: 'Review approved successfully', data: review });
    } catch (error) {
        console.error('Error approving review:', error);
        res.status(500).json({ error: 'Error approving review' });
    }
};

module.exports = {
    getAllApprovedReviews,
    createReview,
    getAllReviewsForAdmin,
    approveReview
};
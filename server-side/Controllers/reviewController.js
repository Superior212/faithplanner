const Review = require('../Models/review');

const createReview = async (req, res) => {
    const { rating, review } = req.body;

    if (!rating || !review) {
        return res.status(400).json({ error: 'Rating and review are required' });
    }

    try {
        const newReview = await Review.create({ rating, review });
        res.status(201).json({ message: 'Review created successfully', data: newReview });
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({ error: 'Error creating review' });
    }
};

const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error getting reviews:', error);
        res.status(500).json({ error: 'Error getting reviews' });
    }
};

module.exports = {
    getAllReviews,
    createReview
};
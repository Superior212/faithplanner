const UserDetails = require('../Models/userDetails');

/**
 * Create user details
 */
const createUserDetails = async (req, res) => {
    try {
        const {
            name,
            email,
            heardFrom
        } = req.body;

        // Validate required fields
        if (!name || !email || !heardFrom || !heardFrom.source || !heardFrom.details) {
            return res.status(400).json({
                success: false,
                message: "Name, email, and how you heard about us (including source and details) are required"
            });
        }

        // Validate heardFrom.source
        const validSources = ['church', 'socialMedia', 'other'];
        if (!validSources.includes(heardFrom.source)) {
            return res.status(400).json({
                success: false,
                message: "Invalid source for how you heard about us"
            });
        }

        // Create new user details
        const userDetails = new UserDetails({
            name,
            email,
            heardFrom
        });

        await userDetails.save();

        res.status(201).json({
            success: true,
            message: "User details saved successfully",
            data: userDetails
        });

    } catch (error) {
        console.error('Create user details error:', error);
        res.status(500).json({
            success: false,
            message: "Failed to save user details",
            error: error.message
        });
    }
};

/**
 * Get all user details
 */
const getAllUserDetails = async (req, res) => {
    try {
        const userDetails = await UserDetails.find()
            .sort('-createdAt')
            .limit(10); // Limit to 10 most recent entries

        res.status(200).json({
            success: true,
            count: userDetails.length,
            data: userDetails
        });

    } catch (error) {
        console.error('Get user details error:', error);
        res.status(500).json({
            success: false,
            message: "Failed to get user details",
            error: error.message
        });
    }
};

/**
 * Get single user details by ID
 */
const getUserDetailsById = async (req, res) => {
    try {
        const userDetails = await UserDetails.findById(req.params.id);

        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User details not found"
            });
        }

        res.status(200).json({
            success: true,
            data: userDetails
        });

    } catch (error) {
        console.error('Get user details error:', error);
        res.status(500).json({
            success: false,
            message: "Failed to get user details",
            error: error.message
        });
    }
};

module.exports = {
    createUserDetails,
    getAllUserDetails,
    getUserDetailsById
};
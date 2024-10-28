const UserDetails = require('../Models/userDetails');

/**
 * Create user details
 */
const createUserDetails = async (req, res) => {
    try {
        const { name, email, phone, referredBy } = req.body;

        // Validate required fields
        if (!name || !email || !phone) {
            return res.status(400).json({
                success: false,
                message: "Name, email, and phone are required"
            });
        }

        // Create new user details
        const userDetails = new UserDetails({
            name,
            email,
            phone,
            referredBy
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
            message: "Failed to save user details"
        });
    }
};

/**
 * Get all user details
 */
const getAllUserDetails = async (req, res) => {
    try {
        const userDetails = await UserDetails.find()
            .sort('-createdAt');

        res.status(200).json({
            success: true,
            count: userDetails.length,
            data: userDetails
        });

    } catch (error) {
        console.error('Get user details error:', error);
        res.status(500).json({
            success: false,
            message: "Failed to get user details"
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
            message: "Failed to get user details"
        });
    }
};

module.exports = {
    createUserDetails,
    getAllUserDetails,
    getUserDetailsById
};
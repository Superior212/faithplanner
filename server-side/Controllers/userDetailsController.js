const UserDetails = require('../Models/userDetails');

/**
 * Create user details
 */
const createUserDetails = async (req, res) => {
    try {
        const {
            name,
            email,
            heardFrom,
            church,
            socialMedia,
            other,
        } = req.body;

        // Validate required fields
        if (!name || !email || !heardFrom) {
            return res.status(400).json({
                success: false,
                message: "Name, email, how you heard about us, and product ID are required"
            });
        }

        // Create new user details
        const userDetails = new UserDetails({
            name,
            email,
            heardFrom,

        });

        // Add conditional fields based on heardFrom value
        if (heardFrom === 'church') {
            if (!church) {
                return res.status(400).json({
                    success: false,
                    message: "Church details are required when 'Church' is selected"
                });
            }
            userDetails.churchDetails = church;
        } else if (heardFrom === 'socialMedia') {
            if (!socialMedia) {
                return res.status(400).json({
                    success: false,
                    message: "Social media platform is required when 'Social media' is selected"
                });
            }
            userDetails.socialMediaPlatform = socialMedia;
        } else if (heardFrom === 'other') {
            if (!other) {
                return res.status(400).json({
                    success: false,
                    message: "Other source details are required when 'Other' is selected"
                });
            }
            userDetails.otherSource = other;
        }

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
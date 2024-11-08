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
            churchSelection,
            addForDonations,
            churchDetails
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

        // Validate church-specific fields
        if (heardFrom.source === 'church') {
            if (!churchSelection || !['listed', 'not-listed'].includes(churchSelection)) {
                return res.status(400).json({
                    success: false,
                    message: "Valid church selection is required when source is church"
                });
            }
            if (!churchDetails || !churchDetails.name) {
                return res.status(400).json({
                    success: false,
                    message: "Church name is required when source is church"
                });
            }
            if (addForDonations) {
                if (!churchDetails.address || !churchDetails.address.country || !churchDetails.phoneNumber || !churchDetails.phoneNumber.type || !churchDetails.phoneNumber.number) {
                    return res.status(400).json({
                        success: false,
                        message: "Church address (country), phone number (type and number) are required when adding for donations"
                    });
                }
                if (churchDetails.address.country === 'US' && !churchDetails.address.state) {
                    return res.status(400).json({
                        success: false,
                        message: "State is required for US addresses when adding for donations"
                    });
                }
                if (!churchDetails.address.postalCode) {
                    return res.status(400).json({
                        success: false,
                        message: "Postal code is required when adding for donations"
                    });
                }
            }
        }

        // Create new user details
        const userDetails = new UserDetails({
            name,
            email,
            heardFrom,
            churchSelection: heardFrom.source === 'church' ? churchSelection : undefined,
            addForDonations: heardFrom.source === 'church' ? addForDonations : undefined,
            churchDetails: heardFrom.source === 'church' ? churchDetails : undefined
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
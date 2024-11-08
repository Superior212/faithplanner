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

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid email address"
            });
        }

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
                // Validate phone number type
                if (!churchDetails.phoneNumber ||
                    !['us', 'international'].includes(churchDetails.phoneNumber.type)) {
                    return res.status(400).json({
                        success: false,
                        message: "Valid phone number type (us or international) is required"
                    });
                }

                // Validate US phone number format if type is 'us'
                if (churchDetails.phoneNumber.type === 'us') {
                    const usPhoneRegex = /^\d{10}$/;
                    if (!usPhoneRegex.test(churchDetails.phoneNumber.number.replace(/\D/g, ''))) {
                        return res.status(400).json({
                            success: false,
                            message: "Please provide a valid 10-digit US phone number"
                        });
                    }
                }

                if (!churchDetails.address ||
                    !churchDetails.address.country ||
                    !churchDetails.address.city ||
                    !churchDetails.phoneNumber.number) {
                    return res.status(400).json({
                        success: false,
                        message: "Church address (country, city) and phone number are required when adding for donations"
                    });
                }

                // Validate US-specific requirements
                if (churchDetails.address.country === 'US') {
                    if (!churchDetails.address.state) {
                        return res.status(400).json({
                            success: false,
                            message: "State is required for US addresses"
                        });
                    }

                    // Validate US postal code format
                    const usZipRegex = /^\d{5}(-\d{4})?$/;
                    if (!usZipRegex.test(churchDetails.address.postalCode)) {
                        return res.status(400).json({
                            success: false,
                            message: "Please provide a valid US postal code"
                        });
                    }
                } else {
                    // Validate postal code exists for other countries
                    if (!churchDetails.address.postalCode) {
                        return res.status(400).json({
                            success: false,
                            message: "Postal code is required for all addresses"
                        });
                    }
                }
            }
        }

        // Check for duplicate email
        const existingUser = await UserDetails.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "This email is already registered"
            });
        }

        // Create new user details
        const userDetails = new UserDetails({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            heardFrom: {
                source: heardFrom.source,
                details: heardFrom.details.trim()
            },
            churchSelection: heardFrom.source === 'church' ? churchSelection : undefined,
            addForDonations: heardFrom.source === 'church' ? addForDonations : false,
            churchDetails: heardFrom.source === 'church' ? {
                name: churchDetails?.name?.trim(),
                address: addForDonations ? {
                    country: churchDetails?.address?.country?.trim(),
                    state: churchDetails?.address?.state?.trim(),
                    city: churchDetails?.address?.city?.trim(),
                    postalCode: churchDetails?.address?.postalCode?.trim()
                } : undefined,
                phoneNumber: addForDonations ? {
                    type: churchDetails?.phoneNumber?.type,
                    number: churchDetails?.phoneNumber?.number?.trim()
                } : undefined
            } : undefined
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
const Donation = require('../Models/donationModel');

/**
 * Create a new donation record
 */
const createDonation = async (req, res) => {
    try {
        const { name, email, address, organization, amount, notes } = req.body;

        // Validate required fields
        if (!name || !email || !address || !organization ) {
            return res.status(400).json({
                success: false,
                message: "Name, email, address, and organization  are required"
            });
        }

        // Create new donation record
        const donation = new Donation({
            name,
            email,
            address,
            organization,
            notes
        });

        await donation.save();

        // Send response
        res.status(201).json({
            success: true,
            message: "Donation recorded successfully",
            data: donation
        });

    } catch (error) {
        console.error('Create donation error:', error);
        res.status(500).json({
            success: false,
            message: "Failed to record donation"
        });
    }
};

/**
 * Get all donations
 */
const getAllDonations = async (req, res) => {
    try {
        // Add basic filtering
        const filter = {};
        if (req.query.organization) {
            filter.organization = req.query.organization;
        }
        if (req.query.email) {
            filter.email = req.query.email.toLowerCase();
        }

        const donations = await Donation.find(filter)
            .sort('-donationDate');

      

        res.status(200).json({
            success: true,
            count: donations.length,
            data: donations
        });

    } catch (error) {
        console.error('Get donations error:', error);
        res.status(500).json({
            success: false,
            message: "Failed to get donations"
        });
    }
};

/**
 * Get donations by organization
 */
const getDonationsByOrganization = async (req, res) => {
    try {
        const donations = await Donation.aggregate([
            {
                $group: {
                    _id: "$organization",
                    count: { $sum: 1 },
                    donations: { $push: "$$ROOT" }
                }
            },
            { $sort: { totalAmount: -1 } }
        ]);

        res.status(200).json({
            success: true,
            count: donations.length,
            data: donations
        });

    } catch (error) {
        console.error('Get donations by organization error:', error);
        res.status(500).json({
            success: false,
            message: "Failed to get donations by organization"
        });
    }
};

/**
 * Get donation by ID
 */
const getDonationById = async (req, res) => {
    try {
        const donation = await Donation.findById(req.params.id);

        if (!donation) {
            return res.status(404).json({
                success: false,
                message: "Donation record not found"
            });
        }

        res.status(200).json({
            success: true,
            data: donation
        });

    } catch (error) {
        console.error('Get donation error:', error);
        res.status(500).json({
            success: false,
            message: "Failed to get donation"
        });
    }
};

module.exports = {
    createDonation,
    getAllDonations,
    getDonationsByOrganization,
    getDonationById
};
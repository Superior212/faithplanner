const ContactMessage = require('../Models/contactMessage');
const emailService = require('../utils/emailService');


const submitContactForm = async (req, res) => {
    try {
        const { name, email, reason, message } = req.body;

        // Create contact message record
        const contactMessage = new ContactMessage({
            name,
            email,
            reason,
            message
        });

        await contactMessage.save();

        // Send email notification
        await emailService.sendContactFormEmail({
            name,
            email,
            reason,
            message
        });

        res.status(201).json({
            status: 'success',
            message: 'Your message has been received. We will get back to you soon.',
            data: { contactMessage }
        });
    } catch (error) {
        console.error('Contact form submission error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Unable to process your request. Please try again later.'
        });
    }
};

const getContactMessages = async (req, res) => {
    try {
        // Add authentication middleware for admin access
        const messages = await ContactMessage.find().sort({ createdAt: -1 });

        res.status(200).json({
            status: 'success',
            data: { messages }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Unable to retrieve messages'
        });
    }
};

module.exports = {
    submitContactForm,
    getContactMessages
};
const nodemailer = require('nodemailer');

// Create transporter function

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});


// Send contact form email function
const sendContactFormEmail = async (contactData) => {
    const htmlTemplate = `<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f4f4f4; padding: 20px;">
        <tr>
            <td>
                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #ffffff; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                    <tr>
                        <td style="padding: 20px;">
                            <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; margin-top: 0;">New Contact Form Submission</h2>
                            
                            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top: 20px;">
                                <tr>
                                    <td width="30%" style="padding: 10px 0;"><strong style="color: #2c3e50;">Name:</strong></td>
                                    <td width="70%" style="padding: 10px 0;">${contactData.name}</td>
                                </tr>
                                <tr>
                                    <td width="30%" style="padding: 10px 0;"><strong style="color: #2c3e50;">Email:</strong></td>
                                    <td width="70%" style="padding: 10px 0;"><a href="mailto:${contactData.email}" style="color: #3498db; text-decoration: none;">${contactData.email}</a></td>
                                </tr>
                                <tr>
                                    <td width="30%" style="padding: 10px 0;"><strong style="color: #2c3e50;">Reason:</strong></td>
                                    <td width="70%" style="padding: 10px 0;">${contactData.reason}</td>
                                </tr>
                            </table>
                            
                            <h3 style="color: #2c3e50; margin-top: 30px; margin-bottom: 10px;">Message:</h3>
                            <p style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${contactData.message}</p>
                        </td>
                    </tr>
                </table>
                <p style="text-align: center; margin-top: 20px; font-size: 12px; color: #777;">This is an automated email. Please do not reply directly to this message.</p>
            </td>
        </tr>
    </table>
</body>`;
    try {

        const mailOptions = {
            from: `"Faith Planner Contact" <${process.env.USER_EMAIL}>`,
            to: process.env.USER_EMAIL, // Admin email
            subject: `New Contact Form Submission - ${contactData.reason}`,
            html: htmlTemplate
        };
        await transporter.sendMail(mailOptions);
        console.log('Contact form email sent successfully');
        return true;
    } catch (error) {
        console.error('Error sending contact form email:', error);
        return false;
    }
};

module.exports = {
    sendContactFormEmail
};
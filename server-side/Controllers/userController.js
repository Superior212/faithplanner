const User = require('../Models/userModel');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

const secret = process.env.JWT_SECRET || 'your-secret-key';

const register = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        if (!email || !password || !name) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already registered"
            });
        }

        const user = new User({ email, password, name });
        await user.save();

        // Send welcome email
        await sendWelcomeEmail(user.email, user.name);

        const token = jwt.sign(
            { userId: user._id },
            secret,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            success: true,
            message: "Registration successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: "Registration failed"
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        const isPasswordValid = await user.isValidPassword(password);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid password"
            });
        }

        const token = jwt.sign(
            { userId: user._id },
            secret,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: "Login failed"
        });
    }
};

const protect = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token provided"
            });
        }

        const decoded = jwt.verify(token, secret);

        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        req.user = user;
        next();

    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
};



const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');

        res.status(200).json({
            success: true,
            users
        });
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({
            success: false,
            message: "Failed to get users"
        });
    }
};

const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({
            success: false,
            message: "Failed to get user"
        });
    }
};

const sendWelcomeEmail = async (email, name) => {

    const welcome = `
<body style="font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border: 1px solid #dddddd; border-radius: 8px; padding: 20px;">
        <!-- Header -->
        <div style="text-align: center; padding: 20px 0; border-bottom: 1px solid #eeeeee;">
            <h1 style="margin: 0; font-size: 28px; color: #333333;">Welcome to Your App!</h1>
            <p style="margin: 10px 0; font-size: 16px; color: #555555;">We're thrilled to have you join us!</p>
        </div>

        <!-- Body -->
        <div style="padding: 20px; color: #555555; line-height: 1.6;">
            <p>Hi <strong>${name}</strong>,</p>
            <p>Welcome to <strong>FaithPlanner</strong>! We're excited to have you on board and can't wait for you to explore everything we have to offer.</p>

            <p>Welcome aboard!</p>
            <p style="margin: 0;">Cheers,</p>
            <p style="margin: 0;"><strong>The FaithPlanner Team</strong></p>
        </div>

        <!-- Footer -->
        <div style="text-align: center; padding: 10px 0; border-top: 1px solid #eeeeee; font-size: 12px; color: #777777;">
            <p>&copy;2025 FaithPlanner.org. All rights reserved.</p>
            <p><a href="https://FaithPlanner.org" style="color: #007bff; text-decoration: none;">Visit our website</a></p>
        </div>
    </div>
</body>

`

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: `"Faith Planner" <${process.env.USER_EMAIL}>`,
        to: email,
        subject: `Welcome to faith Planner`,
        html: welcome
    };

    await transporter.sendMail(mailOptions);
};


const sendPasswordChangeEmail = async (email, name) => {
    const message = `
<body style="font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border: 1px solid #dddddd; border-radius: 8px; padding: 20px;">
        <!-- Header -->
        <div style="text-align: center; padding: 10px 0; border-bottom: 1px solid #eeeeee;">
            <h1 style="margin: 0; font-size: 24px; color: #333333;">Password Change Notification</h1>
        </div>

        <!-- Body -->
        <div style="padding: 20px; color: #555555; line-height: 1.6;">
            <p>Dear <strong>${name}</strong>,</p>
            <p>This is to confirm that your admin password has been successfully changed.</p>
            <p>If you initiated this change, no further action is needed. However, if you did not authorize this update, please contact the support team <strong>immediately</strong> to secure your account and ensure the continued safety of our platform.</p>
            
            <p><strong>Support Contact Details:</strong></p>
            <ul style="list-style-type: none; padding: 0; margin: 0;">
                <li>Email: <a href="mailto:info@faithplanner.org" style="color: #007bff; text-decoration: none;">info@faithplanner.org</a></li>
            </ul>

            <p>Thank you for your dedication to keeping <strong>faithplanner.org</strong> secure. Please do not hesitate to reach out if you have any concerns or need assistance.</p>
        </div>

        <!-- Footer -->
        <div style="text-align: center; padding: 10px 0; border-top: 1px solid #eeeeee; font-size: 12px; color: #777777;">
            <p>&copy; [Year] [Your Company Name]. All rights reserved.</p>
        </div>
    </div>
</body>
`
    try {

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        });


        const mailOptions = {
            from: `"Faith Planner" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Password Change Notification',
            html: message
        };

        await transporter.sendMail(mailOptions);
        console.log('Password change notification email sent successfully');
    } catch (error) {
        console.error('Error sending password change notification email:', error);
        // Don't throw the error, just log it
    }
};

const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await User.findById(req.user.id);

        if (!(await user.isValidPassword(currentPassword))) {
            return res.status(400).json({
                success: false,
                message: "Current password is incorrect"
            });
        }

        await user.changePassword(newPassword);

        // Send password change notification email
        await sendPasswordChangeEmail(user.email, user.name);

        res.status(200).json({
            success: true,
            message: "Password changed successfully"
        });
    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({
            success: false,
            message: "Failed to change password"
        });
    }
};

module.exports = {
    register,
    login,
    protect,
    getUsers,
    getUserById,
    changePassword
};


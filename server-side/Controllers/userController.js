const User = require('../Models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET || 'your-secret-key';

/**
 * Register a new user
 */
const register = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        // Check if all fields are provided
        if (!email || !password || !name) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already registered"
            });
        }

        // Create new user - password will be hashed automatically by the model middleware
        const user = new User({
            email,
            password, // No need to hash here - it's handled by the model
            name
        });

        await user.save();

        // Create token
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

/**
 * Login user
 */
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if all fields are provided
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        // Check password using the model method
        const isPasswordValid = await user.isValidPassword(password);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid password"
            });
        }

        // Create token
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

/**
 * Middleware to protect routes
 */
const protect = async (req, res, next) => {
    try {
        // Get token from header
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token provided"
            });
        }

        // Verify token
        const decoded = jwt.verify(token, secret);

        // Add user to request
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

/**
 * Get all users
 */
const getUsers = async (req, res) => {
    try {
        // Get users but exclude password field
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

/**
 * Get single user by ID
 */
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

module.exports = {
    register,
    login,
    protect,
    getUsers,
    getUserById
};
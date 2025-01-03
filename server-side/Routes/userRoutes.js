const express = require('express');
const router = express.Router();
const {
    login,
    register,
    getUsers,
    protect,
    getUserById,
    changePassword
} = require('../Controllers/userController');

router.post('/login', login);
router.post('/register', register);
router.get('/users', protect, getUsers);
router.get('/users/:id', protect, getUserById);
router.post('/change-password', protect, changePassword);

module.exports = router;


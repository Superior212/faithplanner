const express = require('express');
const router = express.Router();
const { login, register, getUsers, protect, getUserById } = require('../Controllers/userController');



router.post('/login', login);
router.post('/register', register);
router.get('/users', protect, getUsers);
router.get('/users/:id', protect, getUserById);

module.exports = router;
const express = require('express');
const router = express.Router();
const { login, register, getUsers, protect, getUserById } = require('../Controllers/userController');



router.post('/login', login);
router.post('/register', register);
router.get('/users', getUsers);
router.get('/users/:id', protect, getUserById);

module.exports = router;
// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//router.post('/register', userController.registerUser);
//router.post('/login', userController.loginUser);
//router.put('/users/:email', userController.updateUserToAdmin); // New route for updating user to admin


// Prefix the routes with the new server URL
const SERVER_URL = 'https://ticket-backend-1-09ex.onrender.com';

router.post(`${SERVER_URL}/api/register`, userController.registerUser);
router.post(`${SERVER_URL}/api/login`, userController.loginUser);
router.put(`${SERVER_URL}/api/users/:email`, userController.updateUserToAdmin);

module.exports = router;
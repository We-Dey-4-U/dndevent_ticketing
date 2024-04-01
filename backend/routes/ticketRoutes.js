// routes/ticketRoutes.js
const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

router.post('/tickets', ticketController.purchaseEventTicket);
router.get('/tickets/user/:userId', ticketController.getUserTickets);
//router.get('/tickets/:userId', ticketController.getUserTickets);
//router.get('/tickets/user', ticketController.getCurrentUserTickets); // New route for fetching current user's tickets
// Prefix the routes with the new server URL
const SERVER_URL = 'https://ticket-backend-1-09ex.onrender.com';

router.post(`${SERVER_URL}/api/tickets`, ticketController.purchaseEventTicket);
router.get(`${SERVER_URL}/api/tickets/user/:userId`, ticketController.getUserTickets);


module.exports = router;
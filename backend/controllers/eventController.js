const Event = require('../models/Event');
const User = require('../models/User');

const createEvent = async (req, res) => {
    try {
        // Check if req.user exists and has admin privileges
        if (req.user && req.user.isAdmin) {
            const userEmail = req.user.email; // Extract admin's email
            const { event_name, event_location, event_date, event_flyer, vip_price, regular_price, normal_price } = req.body;

            // Check if event_flyer exists in the request body
            if (!event_flyer) {
                return res.status(400).json({ error: 'Event flyer is required' });
            }

            // Create the event with admin_email included
            const newEvent = await Event.create({ 
                event_name, 
                event_location, 
                event_date, 
                event_flyer, 
                vip_price,
                regular_price,
                normal_price,
                admin_email: userEmail // Include admin's email
            });

            res.status(201).json({ event: newEvent });
        } else {
            // User is not authenticated or is not an admin
            return res.status(403).json({ error: 'Only admins can create events' });
        }
    } catch (error) {
        console.error('Error creating event:', error);
        
        // Check if the error is related to file not found or access denied
        if (error.code === 'ENOENT') {
            return res.status(404).json({ error: 'File not found or access denied' });
        }
        
        res.status(500).json({ error: 'Failed to create event' });
    }
};


const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.json({ events });
    } catch (error) {
        console.error('Error retrieving events:', error);
        res.status(500).json({ error: 'Failed to retrieve events' });
    }
};


async function getEventById(req, res) {
    try {
        const eventId = parseInt(req.params.eventId); // Parse eventId as a number

        const event = await Event.findOne({ event_id: eventId });

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        res.status(200).json({ event });
    } catch (error) {
        console.error('Error retrieving event by ID:', error);
        res.status(500).json({ error: 'Failed to retrieve event' });
    }
}

module.exports = {
    createEvent,
    getAllEvents,
    getEventById,
};
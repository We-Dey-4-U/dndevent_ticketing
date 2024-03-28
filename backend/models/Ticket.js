const mongoose = require('mongoose');


const ticketSchema = new mongoose.Schema({
    event_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    ticket_type: {
        type: String,
        enum: ['vip', 'regular', 'normal'], // Include 'regular' as a valid enum value
        required: true,
    },
    ticket_price: {
        type: Number,
        required: true,
    },

    quantity: {
        type: Number,
        required: true,
        default: 1, // Default quantity is 1
    },
   
    ticket_availability: {
        type: Boolean,
        default: true,
    },
    status: {
        type: String,
        enum: ['unused', 'used'],
        default: 'unused',
    },
    demand_factor: {
        type: Number,
        required: true,
        default: 1, // Default demand factor
    },
    time_factor: {
        type: Number,
        required: true,
        default: 1, // Default time factor
    },
    availability_factor: {
        type: Number,
        required: true,
        default: 1, // Default availability factor
    },
    secureTicket: {
        type: String,
        required: true,
    },
     // Other fields...
     qrCodeImagePath: {
        type: String,
        
    },
}, { timestamps: true });

// Define a virtual field for event_name
ticketSchema.virtual('event_name', {
    ref: 'Event', // Reference to the Event model
    localField: 'event_id', // Field in the current schema
    foreignField: '_id', // Field in the referenced model
    justOne: true, // Specify whether to return a single document or an array
    options: { select: 'event_name' } // Select only the event_name field from the referenced document
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
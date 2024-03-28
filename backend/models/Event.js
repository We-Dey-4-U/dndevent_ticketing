// backend/models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    event_name: {
        type: String,
        required: true,
    },
    event_location: {
        type: String,
        required: true,
    },
    event_date: {
        type: Date,
        required: true,
    },
    event_flyer: {
        type: String,
        required: true,
    },
    vip_price: {
        type: Number,
        required: true,
    },
    regular_price: {
        type: Number,
        required: true,
    },
    normal_price: {
        type: Number,
        required: true,
    },
    admin_email: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
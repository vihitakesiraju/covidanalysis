const mongoose = require("mongoose");
// const Registrations = require('Registrations')

const Events = new mongoose.Schema({
    event_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    event_name: {
        type: String,
        required: true,
    },
    event_description: {
        type: String,
        required: true,
    },
    event_date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    event_time: {
        type: String,
        required: true,
        default: `${Date.now().getHours}:${Date.now().getMinutes}:${Date.now().getSeconds}`
    },
    event_creator_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurants',
        required: true
    },
    event_latitude: {
        type: Number,
        required: true,
    },
    event_longitude: {
        type: Number,
        required: true,
    },
    event_hashtags: {
        type: String,
        required: true,
    },
    event_images: [String],
    event_registrations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Registrations'
    }]
}, { versionKey: false })

module.exports = mongoose.model('Events', Events)

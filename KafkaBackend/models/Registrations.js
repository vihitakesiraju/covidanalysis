const mongoose = require("mongoose");

const Registrations = new mongoose.Schema({
    event_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Events',
        required: true
    },
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customers',
        required: true
    },
    registration_date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    registration_time: {
        type: String,
        required: true,
        default: `${Date.now().getHours}:${Date.now().getMinutes}:${Date.now().getSeconds}`
    },

}, { versionKey: false })

module.exports = mongoose.model('Registrations', Registrations)

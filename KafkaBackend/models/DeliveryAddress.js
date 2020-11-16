const mongoose = require("mongoose");



const DeliveryAddress = new mongoose.Schema({
    delivery_address: {
        type: String,
        required: true,
    },
    address_city: {
        type: String,
        required: true,
    },
    address_state: {
        type: String,
    },
    address_postal_code: {
        type: Number,
        required: true,
    },
    address_latitude: {
        type: Number,
        required: true,
    },
    address_longitude: {
        type: Number,
        required: true,
    },
    primary_phone: {
        type: Number,
        required: true,
    },
}, { versionKey: false })

module.exports = mongoose.model('DeliveryAddress', DeliveryAddress)

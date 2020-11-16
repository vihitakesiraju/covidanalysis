
const mongoose = require("mongoose");

const Restaurants = new mongoose.Schema({
    restaurant_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    restaurant_name: {
        type: String,
        required: true,
    },
    restaurant_location: {
        type: String,
        required: true,
    },
    restaurant_description: {
        type: String,
        required: true,
    },
    restaurant_address: {
        type: String,
        required: true,
    },
    address_city: {
        type: String,
        required: true,
    },
    address_state: {
        type: String,
        required: true,
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
    secondary_phone: {
        type: Number,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    open_time: {
        type: String,
        required: true,
    },
    close_time: {
        type: String,
        required: true,
    },
    stars_avg: {
        type: Number,
        default: 0
    },
    review_count: {
        type: Number,
        default: 0
    },
    is_open: {
        type: Number,
        default: 0
    },
    profile_image_link: {
        type: String,
    },
    dishes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish'
    }]
}, { versionKey: false })

module.exports = mongoose.model('Restaurants', Restaurants)

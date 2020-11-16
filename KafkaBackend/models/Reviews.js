
const mongoose = require("mongoose");

const Reviews = new mongoose.Schema({
    review_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customers',
        required: true
    },
    restaurant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurants",
        required: true
    },
    stars: {
        type: Number,
        required: true,
        default: 0
    },
    review_date: {
        type: Date,
        required: true
    },
    review_text: {
        type: String,
    },
    images: [{
        type: String
    }]

}, { versionKey: false })

module.exports = mongoose.model('Reviews', Reviews)

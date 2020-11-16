const mongoose = require("mongoose");

const Dish = new mongoose.Schema({
    dish_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    dish_name: {
        type: String,
        required: true
    },
    ingredients: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        default: " "
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category_id: {
        type: String,
        enum: ['Desserts', 'Salads', 'Beverages', 'Appetizers', 'Main Course'],
        required: true
    },

}, { versionKey: false })




module.exports = mongoose.model('Dish', Dish)

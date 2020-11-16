const mongoose = require("mongoose");

const CartItem = new mongoose.Schema({

    dish_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish',
        required: true
    },
    count: {
        type: Number,
        required: true,
    },
}, { versionKey: false })
module.exports = mongoose.model('CartItem', CartItem)

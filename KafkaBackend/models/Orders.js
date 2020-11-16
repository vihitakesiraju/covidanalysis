const mongoose = require("mongoose");

const Orders = new mongoose.Schema({
    order_id: {
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
        ref: 'Restaurants',
        required: true
    },
    order_type: {
        type: String,
        enum: ['Pickup', 'Delivery', 'Common'],
        default: 'Common',
        required: true
    },
    order_status: {
        type: String,
        enum: ['Picked Up', 'Pick Up Ready', 'Order Placed', 'On The Way', 'In the making', 'Delivered', 'Cancelled'],
        default: 'Order Placed',
        required: true
    },
    order_date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    order_time: {
        type: String,
        required: true,
    },
    order_total_price: {
        type: Number,
        required: true,
        default: 0,
    },
    delivery_address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DeliveryAddress'
    },
    payment_card_digits: {
        type: Number,
        required: true,
    },
    cart_items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CartItem'
    }]
}, { versionKey: false })




module.exports = mongoose.model('Orders', Orders)

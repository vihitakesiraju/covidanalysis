const mongoose = require("mongoose");

const Message = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    timeStamp: {
        type: Date,
        required: true
    },
    sender: {
        type: Number,
        required: true
    },

}, { versionKey: false })


module.exports = mongoose.model('Message', Message)

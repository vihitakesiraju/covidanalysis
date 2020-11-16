const {
    CONTENT_TYPE,
    APP_JSON,
    RES_SUCCESS,
    RES_BAD_REQUEST,
    RES_NOT_FOUND,
    RES_DUPLICATE_RESOURCE,
    TEXT_PLAIN,
    RES_INTERNAL_SERVER_ERROR
} = require("../config/routeConstants");
const mongoose = require("mongoose");
const routes = require("../config/routeConstants");

const Messaging = require('../models/Messaging')
const Message = require('../models/Message')
function handle_request(msg, callback) {

    console.log("Inside Login Services ->kafka backend");
    console.log(msg);
    switch (msg.api) {
        case "POST_INITIATE_MESSAGE":
            {
                let oId = mongoose.Types.ObjectId()
                let messaging = new Messaging({
                    conversation_id: oId,
                    restaurant_id: msg.body.restaurant_id,
                    customer_id: msg.body.customer_id
                })
                Messaging.findOne({ $and: [{ restaurant_id: msg.body.restaurant_id }, { customer_id: msg.body.customer_id }] }, (err, res) => {
                    console.log(res)
                    if (err) {
                        console.log('Unable to Initiate Message' + err)
                        callback(err, 'Error')
                    }
                    else if (res !== null) {
                        console.log('Conversation Exists ')
                        callback(null, res)

                    }
                    else {
                        console.log("Hitting else")
                        messaging.save((err) => {
                            if (err) {
                                console.log('Unable to Initiate Message' + err)
                                callback(err, 'Error')
                            }
                            else {
                                console.log('Conversation Created ')
                                callback(null, messaging)
                            }
                        })
                    }
                })

                break;
            }
        case "POST_MESSGAGES": {
            let message = new Message({
                message: msg.body.message,
                timeStamp: Date.now(),
                sender: msg.body.sender
            })
            message.save((err) => {
                if (err) {
                    console.log('Error occured while Updating Conversation' + err)
                    callback(err, 'Error')
                }
                else {
                    Messaging.findOneAndUpdate({ $and: [{ restaurant_id: msg.body.restaurant_id }, { customer_id: msg.body.customer_id }] },
                        { $push: { "messages": message._id } }, (err, result) => {
                            if (err) {
                                console.log('Error occured while Updating Conversation' + err)
                                callback(err, 'Error')
                            }
                            else {
                                console.log('Message Created' + result)
                                callback(null, result)
                            }
                        })
                }

            })

            break;

        }
        case "GET_MESSAGES_LIST_RESTAURANT": {
            Messaging.find({ restaurant_id: msg.body.restaurant_id }, (err, result) => {
                if (err) {
                    console.log('Error occured while fetching Conversations' + err)
                    callback(err, 'Error')
                }
                else {
                    console.log('Fetching Conversations' + result)
                    callback(null, result)
                }
            }).populate({ path: 'customer_id', model: 'Customers' }).populate({ path: 'restaurant_id', model: 'Restaurants' })
            break;

        }
        case "GET_MESSAGES_LIST_CUSTOMER": {
            Messaging.find({ customer_id: msg.body.customer_id }, (err, result) => {
                if (err) {
                    console.log('Error occured while fetching Conversations' + err)
                    callback(err, 'Error')
                }
                else {
                    console.log('Fetching Conversations' + result)
                    callback(null, result)
                }
            }).populate('restaurant_id')
            break;


        }
        case "GET_MESSAGES": {
            Messaging.find({ _id: msg.body.conversation_id }, (err, result) => {
                if (err) {
                    console.log('Error occured while fetching Conversations' + err)
                    callback(err, 'Error')
                }
                else {
                    console.log('Fetching Conversations' + result)
                    callback(null, result)
                }
            }).populate('messages').populate('restaurant_id')
            break;


        }
        default: {
            console.log("Hitting Default")
        }


    }

};

exports.handle_request = handle_request;



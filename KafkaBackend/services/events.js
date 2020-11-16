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

const Registrations = require('../models/Registrations')

const Events = require("../models/Events");

async function handle_request(msg, callback) {

    console.log("Inside Order Services ->kafka backend");
    console.log(msg);
    switch (msg.api) {
        case "GET_ALL_EVENTS":
            {
                Events.find({}).sort('-event_date')
                    .exec((err, result) => {
                        if (err) {
                            console.log('Error occured while fetching Events' + err)
                            callback(err, 'Error')
                        }
                        else {
                            // console.log('Events fetched' + result)
                            callback(null, result)
                        }
                    })

                break;
            }
        case "GET_EVENT_BY_RESTAURANT":
            {
                Events.find({ event_creator_id: msg.body.restaurant_id }).sort('-event_date')
                    .exec((err, result) => {
                        if (err) {
                            console.log('Error occured while fetching Events' + err)
                            callback(err, 'Error')
                        }
                        else {
                            console.log('Events fetched' + result)
                            callback(null, result)
                        }
                    })
                break;
            }
        case "GET_REGISTRATIONS_CUSTOMER":
            {
                Registrations.find({ customer_id: msg.body.customer_id }).sort('registration_date').populate('event_id').exec(
                    (err, result) => {
                        if (err) {
                            console.log('Error occured while fetching Registrations' + err)
                            callback(err, 'Error')
                        }
                        else {
                            console.log('Registrations fetched' + result)
                            callback(null, result)
                        }
                    }
                )
                break;
            }
        case "GET_REGISTRATIONS_EVENT":
            {
                Registrations.find({ event_id: msg.body.event_id }).sort('registration_date').populate('customer_id').exec(
                    (err, result) => {
                        if (err) {
                            console.log('Error occured while fetching Registrations' + err)
                            callback(err, 'Error')
                        }
                        else {
                            console.log('Registrations fetched' + result)
                            callback(null, result)
                        }
                    }
                )
                break;
            }
        case "POST_EVENT_REGISTRATION":
            {
                Registrations.find({ $and: [{ event_id: msg.body.event_id }, { customer_id: msg.body.customer_id }] }, (err, res) => {
                    console.log(res)

                    if (err) {
                        console.log('Error occured while fetching Registrations' + err)
                        callback(err, 'Error')
                    }
                    else if (res.length > 0) {
                        console.log('Already registered')
                        callback(err, 'Error')
                    }
                    else {
                        let date = new Date;
                        let regt = new Registrations({
                            event_id: msg.body.event_id,
                            customer_id: msg.body.customer_id,
                            registration_date: date,
                            registration_time: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
                        })
                        regt.save((result) => {
                            console.log('Registrations Created' + result)
                            Events.findOneAndUpdate({ _id: msg.body.event_id }, { $push: { "event_registrations": regt._id } }, (err, res) => {
                                if (err) {
                                    console.log('Error occured while pushing Registration' + err)
                                    callback(err, 'Error')
                                }
                                else {
                                    console.log('Registrations added to events' + res)
                                    callback(null, res)
                                }
                            })

                        })
                    }

                }).catch((err) => {
                    console.log('Error occured while fetching Registrations' + err)
                    callback(err, 'Error')
                })

                break;
            }
        case "POST_EVENT": {
            let id = mongoose.Types.ObjectId()
            let event = new Events({
                event_id: id,
                event_name: msg.body.data.event_name,
                event_description: msg.body.data.event_description,
                event_date: msg.body.data.event_date,
                event_time: msg.body.data.event_time,
                event_creator_id: msg.body.data.event_creator_id,
                event_latitude: msg.body.data.event_latitude,
                event_longitude: msg.body.data.event_longitude,
                event_hashtags: msg.body.data.event_hashtags,
                event_images: msg.body.urls
            })
            event.save((err, res) => {
                if (err) {
                    console.log('Error occured while creating events' + err)
                    callback(err, 'Error')
                }
                else {
                    console.log('Event Created' + res)
                    callback(null, res)
                }
                // console.log('Event created' + result)
                // callback(null, result)
            })
            break;
        }
        default:
            {
                console.log("Hitting default")
            }

    }
    // callback(null, response);
    // console.log("after callback");
};

exports.handle_request = handle_request;



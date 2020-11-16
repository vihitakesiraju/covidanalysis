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

const Reviews = require('../models/Reviews')

const Customers = require("../models/Customers");


function handle_request(msg, callback) {

    console.log("Inside Images Services ->kafka backend");
    console.log(msg);
    switch (msg.api) {
        case "POST_IMAGE_USER_PROFILE":
            {
                Customers.findByIdAndUpdate(msg.body.customer_id, { profile_image_link: msg.body.imageUrl }, (err, result) => {
                    if (err) {
                        console.log('Error occured while updating Profile image link' + err)
                        callback(err, 'Error')
                    }
                    else {
                        console.log('Image link set' + result)
                        callback(null, result)
                    }
                })

                break;
            }
        case "GET_RESTAURANT_IMAGES": {
            Reviews.find({ restaurant_id: msg.body.restaurant_id }).select('images').exec((err, result) => {
                if (err) {
                    console.log('Error occured while fetching images' + err)
                    callback(err, 'Error')
                }
                else {
                    console.log('Image fetched' + result)
                    callback(null, result)
                }
            })
        }
        default: {
            console.log("Hitting Default")
        }


    }

};

exports.handle_request = handle_request;



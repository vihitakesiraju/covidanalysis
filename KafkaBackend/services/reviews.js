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


const Reviews = require("../models/Reviews");

async function handle_request(msg, callback) {

    console.log("Inside Review Services ->kafka backend");
    console.log(msg);
    switch (msg.api) {
        case "GET_REVIEWS_BY_RESTAURANT":
            {
                Reviews.find({ restaurant_id: msg.body.restaurant_id }, (err, result) => {
                    if (err) {
                        console.log('Error occured while fetching Reviews' + err)
                        callback(err, 'Error')
                    }
                    else {
                        console.log('Reviews fetched' + result)
                        callback(null, result)
                    }
                }).populate('customer_id')

                break;
            }
        case "GET_REVIEWS_BY_CUSTOMER":
            {
                Reviews.find({ customer_id: msg.body.customer_id }, (err, result) => {
                    if (err) {
                        console.log('Error occured while fetching Reviews' + err)
                        callback(err, 'Error')
                    }
                    else {
                        console.log('Reviews fetched' + result)
                        callback(null, result)
                    }
                }).populate('restaurant_id')

                break;
            }
        case "POST_REVIEW_CUSTOMER":
            {
                let revid = mongoose.Types.ObjectId();

                let rev = new Reviews({
                    review_id: revid,
                    customer_id: msg.body.data.customer_id,
                    restaurant_id: msg.body.data.restaurant_id,
                    stars: msg.body.data.stars,
                    review_date: Date.now(),
                    review_text: msg.body.data.review_text,
                    images: msg.body.urls
                })

                rev.save().then((result) => {
                    console.log('Review saved' + result)
                    callback(null, result)
                }).catch((err) => {
                    console.log('Error occured while saving Review' + err)
                    callback(err, 'Error')
                })
                break;
            }
        case "GET_REVIEWS_ID_RESTAURANT": {
            Reviews.find({ restaurant_id: msg.body.restaurant_id }, (err, result) => {
                if (err) {
                    console.log('Error occured while fetching Reviews' + err)
                    callback(err, 'Error')
                }
                else {
                    console.log('Reviews fetched' + result)
                    callback(null, result)
                }
            }).populate('customer_id')

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



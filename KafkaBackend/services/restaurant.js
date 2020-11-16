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
const routes = require("../config/routeConstants");
const mongoose = require("mongoose");


const Restaurant = require('../models/Restaurants')
const Menu = require('../models/Menu')
const Dish = require('../models/Dish')
const LoginCredentials = require('../models/LoginCredentials');
const Restaurants = require("../models/Restaurants");

function handle_request(msg, callback) {

    console.log("Inside Restaurant Services ->kafka backend");
    console.log(msg);
    switch (msg.api) {
        case "POST_RESTAURANT_SIGNUP":
            {
                console.log("Inside Restaurant Signup ->kafka backend");

                let login = new LoginCredentials({
                    email_id: msg.body.email,
                    user_password: msg.body.password,
                    user_type: 2
                })
                login.save().then((res) => {
                    console.log("Login creds created" + res);
                    let id = mongoose.Types.ObjectId()
                    console.log('Req Body : ', msg)
                    let mesg = new Restaurant({
                        restaurant_id: id,
                        restaurant_name: msg.body.restaurant_name,
                        restaurant_location: msg.body.restaurant_location,
                        restaurant_description: msg.body.restaurant_description,
                        restaurant_address: msg.body.restaurant_address,
                        address_city: msg.body.address_city,
                        address_state: msg.body.address_state,
                        address_postal_code: msg.body.address_postal_code,
                        address_latitude: msg.body.address_latitude,
                        address_longitude: msg.body.address_longitude,
                        primary_phone: msg.body.primary_phone,
                        secondary_phone: msg.body.secondary_phone,
                        email: msg.body.email,
                        open_time: msg.body.open_time,
                        close_time: msg.body.close_time,
                    })
                    mesg
                        .save()
                        .then(response => {
                            console.log('Restaurant Profile Created ' + response)
                            callback(null, response)
                        })
                        .catch(err => {
                            console.log('Unable to create Restaurant Profile' + err)
                            LoginCredentials.findOneAndDelete({ email_id: msg.body.email }).then(
                                callback(err, 'Error'))
                        })
                }).catch((err) => {

                    console.log('Unable to create Login Creds' + err)
                    callback(err, 'Error')

                })
                break;
            }
        case "POST_MENU_ITEM":
            {
                const cat = ['Desserts', 'Salads', 'Beverages', 'Appetizers', 'Main Course']

                let id = mongoose.Types.ObjectId()

                let dish = new Dish({
                    description: msg.body.description,
                    dish_name: msg.body.dish_name,
                    image_url: msg.body.image_url,
                    ingredients: msg.body.ingredients,
                    dish_id: id,
                    price: msg.body.price,
                    description: msg.body.description,
                    category_id: cat[msg.body.category_id - 1]
                })
                dish.save((err, res) => {
                    if (err) {
                        console.log("Unable to create Dish " + err);
                        callback(err, 'Error')
                    }
                    else {

                        console.log(res)
                        Restaurant.findOneAndUpdate({ _id: msg.body.restaurant_id },
                            { $addToSet: { "dishes": res._id } },
                            (err, result) => {
                                if (err) {
                                    console.log('Error occured while Creating Menu Items' + err)
                                    callback(err, 'Error')
                                }
                                else {
                                    console.log('Created Menu Items' + result)
                                    callback(null, result)

                                }
                            }).catch((err) => {
                                console.log('Error occured while creating Menu Item' + err)
                                callback(err, 'Error');
                            })
                    }

                })


                break;
            }
        case "GET_RESTAURANT_MENU": {
            let temp = Restaurants.findOne({ _id: msg.body.restaurant_id }).populate({
                path: 'dishes',
                model: 'Dish'
            }).exec((err, result) => {
                if (err) {
                    console.log('Error occured while fetching Menu Items' + err)
                    callback(err, 'Error')
                }
                else {
                    console.log('Fetch Menu Items' + result)
                    callback(null, result.dishes)

                }
            })
            break;
        }
        case "UPDATE_MENU_ITEM":
            {
                let dish = {
                    description: msg.body.description,
                    dish_name: msg.body.dish_name,
                    image_url: msg.body.image_url,
                    ingredients: msg.body.ingredients,
                    price: msg.body.price,
                    description: msg.body.description,
                    category_id: msg.body.category_id
                }

                Dish.findOneAndUpdate({ _id: msg.body._id }, { ...dish }, (err, result) => {
                    if (err) {
                        console.log('Error occured while updating Menu Item' + err)
                        callback(err, 'Error')
                    }
                    else {
                        console.log('Updated Menu Items' + result)
                        callback(null, result)
                    }
                })
                break;
            }
        case "GET_RESTAURANT_SEARCH":
            {
                Restaurants.find({
                    "$or": [
                        { restaurant_name: { '$regex': `(?i)${msg.body.search_string}` } },
                        { restaurant_location: { '$regex': `(?i)${msg.body.search_string}` } },
                        { restaurant_address: { '$regex': `(?i)${msg.body.search_string}` } },
                        { restaurant_description: { '$regex': `(?i)${msg.body.search_string}` } }
                    ]
                }, (err, result) => {
                    if (err) {
                        console.log('Error occured while searching restaurants' + err)
                        callback(err, 'Error')
                    }
                    else {
                        console.log('Restaurant Search results' + result)
                        callback(null, result)
                    }
                })
                break;
            }
        case "GET_ALL_RESTAURANTS":
            {
                Restaurants.find({}, (err, result) => {
                    if (err) {
                        console.log('Error occured while fetching restaurants' + err)
                        callback(err, 'Error')
                    }
                    else {
                        console.log('Restaurant get list' + result)
                        callback(null, result)
                    }
                })
                break;
            }
        case "GET_RESTAURANT_PROFILE":
            {
                Restaurants.find({ _id: msg.body._id }, (err, result) => {
                    if (err) {
                        console.log('Error occured while fetching restaurant profile' + err)
                        callback(err, 'Error')
                    }
                    else {
                        console.log('Restaurant get profile' + result)
                        callback(null, result)
                    }
                })
                break;
            }
        case "UPDATE_RESTAURANT_PROFILE":
            {
                let rest = {
                    restaurant_location: msg.body.restaurant_location,
                    restaurant_description: msg.body.restaurant_description,
                    restaurant_address: msg.body.restaurant_address,
                    address_city: msg.body.address_city,
                    address_state: msg.body.address_state,
                    address_postal_code: msg.body.address_postal_code,
                    address_latitude: msg.body.address_latitude,
                    address_longitude: msg.body.address_longitude,
                    primary_phone: msg.body.primary_phone,
                    secondary_phone: msg.body.secondary_phone,
                    open_time: msg.body.open_time,
                    close_time: msg.body.close_time,
                }
                Restaurants.findOneAndUpdate({ _id: msg.body.restaurant_id }, { ...rest }, (err, result) => {
                    if (err) {
                        console.log('Error occured while updating restaurant profile' + err)
                        callback(err, 'Error')
                    }
                    else {
                        console.log('Restaurant update profile' + result)
                        callback(null, result)
                    }
                })
                break;
            }


        default:
            console.log("Switch default")
    }





    // callback(null, msg);
    // console.log("after callback");
};

exports.handle_request = handle_request;



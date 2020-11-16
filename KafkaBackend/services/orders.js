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

const Orders = require('../models/Orders')
const CartItem = require('../models/CartItem')
const DeliveryAddress = require('../models/DeliveryAddress');
const Restaurants = require("../models/Restaurants");

async function handle_request(msg, callback) {

    console.log("Inside Order Services ->kafka backend");
    console.log(msg);
    switch (msg.api) {
        case "POST_ORDER":
            {
                let orderTotal = 0
                let itemsList = [];
                msg.body.cart_items.map(async (cartItem) => {
                    console.log(cartItem)
                    let temp = new CartItem({
                        dish_id: cartItem.dish_id,
                        // dish_name
                        count: cartItem.count
                    })
                    itemsList.push(temp)
                })
                let savedList = [];
                CartItem.insertMany(itemsList).then((result) => {

                    savedList = result
                    console.log("Result" + savedList)
                    let deliveryAddress
                    if (msg.body.order_type === "Delivery") {
                        console.log("testing")
                        deliveryAddress = new DeliveryAddress({
                            delivery_address: msg.body.delivery_address,
                            address_city: msg.body.address_city,
                            // address_state: msg.body.address_state,
                            address_postal_code: msg.body.address_postal_code,
                            address_latitude: msg.body.address_latitude,
                            address_longitude: msg.body.address_longitude,
                            primary_phone: msg.body.primary_phone,
                        })
                        deliveryAddress.save().then((res) => {


                            let oId = mongoose.Types.ObjectId()
                            let date = new Date();
                            let time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
                            let order = new Orders({
                                order_id: oId,
                                customer_id: msg.body.customer_id,
                                restaurant_id: msg.body.restaurant_id,
                                payment_card_digits: msg.body.payment_card_digits,
                                cart_items: itemsList,
                                order_type: msg.body.order_type,
                                order_status: "Order Placed",
                                order_total_price: msg.body.order_total_price,
                                order_time: time,
                                order_date: date,
                                delivery_address: deliveryAddress,
                                cart_items: itemsList
                            })
                            order.save().then((result) => {

                                console.log('Order Created' + result)
                                callback(null, result)
                            })

                        }).catch((err) => {
                            console.log('Error occured while creating Delivery -> Delivery' + err)
                            callback(err, 'Error')
                        });
                    }
                    else {
                        let oId = mongoose.Types.ObjectId()
                        let date = new Date();
                        let time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
                        let order = new Orders({
                            order_id: oId,
                            customer_id: msg.body.customer_id,
                            restaurant_id: msg.body.restaurant_id,
                            payment_card_digits: msg.body.payment_card_digits,
                            cart_items: savedList,
                            order_type: msg.body.order_type,
                            order_status: "Order Placed",
                            order_total_price: msg.body.order_total_price,
                            order_time: time,
                            order_date: date,
                            delivery_address: deliveryAddress,
                            cart_items: itemsList
                        })
                        order.save().then((result) => {

                            console.log('Order Created' + result)
                            callback(null, result)

                        }).catch((err) => {
                            console.log('Error occured while creating Order -> Pickup' + err)
                            callback(err, 'Error')
                        })
                    }

                }).catch((err) => {
                    console.log(err);
                })



                break;
            }
        case "GET_ORDER_BY_CUSTOMER":
            {
                Orders.find({ customer_id: msg.body.customer_id }).sort('-order_date').exec(
                    (err, result) => {
                        if (err) {
                            console.log('Error occured while fetching Orders' + err)
                            callback(err, 'Error')
                        }
                        else {
                            console.log('Orders fetched' + result)
                            callback(null, result)
                        }
                    })
                break;
            }
        case "GET_ORDER_BY_ID":
            {
                Orders.findOne({ _id: msg.body.order_id }).populate({ path: 'cart_items', populate: { path: 'dish_id' } })
                    .populate('delivery_address').populate('restaurant_id').populate({ path: 'cart_items.dishes', model: 'Dish' }).exec((err, result) => {
                        if (err) {
                            console.log('Error occured while fetching Order details' + err)
                            callback(err, 'Error')
                        }
                        else {
                            console.log('Order details fetched' + result)
                            // let dish_map = result.cart_items.map((dishItem) => {
                            //     return dishItem.dish_id
                            // })
                            // console.log(dish_map)
                            // Restaurants.findOne({ restaurant_id: result.restaurant_id }, (err, res) => {
                            //     if (err) {
                            //         console.log('Error occured while fetching rest details' + err)
                            //         callback(err, 'Error')
                            //     }
                            //     else {

                            //         let out = {
                            //             orderDetails: result.toObject(),
                            //             restDetails: res.toObject()
                            //         }
                            //         console.log('Orders fetched' + out)
                            // callback(null, out)
                        }
                        // })
                        callback(null, result)
                        // }
                    })

                //.populate("delivery_address").populate('cart_items').populate("restaurant").populate
                break;
            }
        case "GET_ORDER_BY_RESTAURANT":
            {
                Orders.find({ restaurant_id: msg.body.restaurant_id }).sort('-order_date').exec(
                    (err, result) => {
                        if (err) {
                            console.log('Error occured while fetching Orders' + err)
                            callback(err, 'Error')
                        }
                        else {
                            console.log('Orders fetched' + result)
                            callback(null, result)
                        }
                    })
                break;
            }
        case "UPDATE_ORDER":
            {
                Orders.findOneAndUpdate({ _id: msg.body.order_id }, { order_status: msg.body.order_status_id }, (err, result) => {
                    if (err) {
                        console.log('Error occured while updating order' + err)
                        callback(err, 'Error')
                    }
                    else {
                        console.log('Order updated' + result)
                        callback(null, result)
                    }
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



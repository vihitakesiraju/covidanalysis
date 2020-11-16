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

const Customers = require('../models/Customers')
const LoginCredentials = require('../models/LoginCredentials');

function handle_request(msg, callback) {

    console.log("Inside Customer Services ->kafka backend");
    console.log(msg);
    switch (msg.api) {
        case "POST_CUSTOMER_SIGNUP":
            {
                let login = new LoginCredentials({
                    email_id: msg.body.email_id,
                    user_password: msg.body.user_password,
                    user_type: 1
                })
                login.save((err) => {
                    if (err) {
                        console.log('Error occured while creating login creds' + err)
                        callback(err, 'Error')
                    }
                    else {
                        console.log("Login creds created");
                        let id = mongoose.Types.ObjectId()
                        console.log('Req Body : ', msg)
                        let mesg = new Customers({
                            customer_id: id,
                            customer_name: msg.body.customer_name,
                            email_id: msg.body.email_id,
                            birthday: msg.body.birthday,
                            contact_number: msg.body.contact_number,
                            about: msg.body.about,
                            things_loved: msg.body.things_loved,
                            find_me: msg.body.find_me,
                            blog_ref: msg.body.blog_ref
                        })
                        mesg
                            .save((err) => {
                                if (err) {
                                    console.log('Error occured while creating profile' + err)
                                    callback(err, 'Error')
                                }
                                else {

                                    console.log('Customer Profile Created ')
                                    callback(null, "Crated")
                                }
                            })
                    }


                })
                break;
            }
        case "GET_CUSTOMER_PROFILE":
            {
                Customers.findOne({ _id: msg.body.customer_id },
                    (err, result) => {
                        if (err) {
                            console.log('Error occured while fetching customer profile' + err)
                            callback(err, 'Error')
                        }
                        else {
                            console.log('Fetch Menu Items' + result)
                            callback(null, result)
                        }
                    })
                break;
            }
        case "UPDATE_CUSTOMER_PROFILE": {
            let customer = {
                customer_name: msg.body.customer_name,
                birthday: msg.body.birthday,
                contact_number: msg.body.contact_number,
                about: msg.body.about,
                things_loved: msg.body.things_loved,
                find_me: msg.body.find_me,
                blog_ref: msg.body.blog_ref
            }
            Customers.findOneAndUpdate({ _id: msg.body.customer_id }, { ...customer }, (err, result) => {
                if (err) {
                    console.log('Error occured while updating Customer Profile ' + err)
                    callback(err, 'Error')
                }
                else {
                    console.log('Updated Customer Profile' + result)
                    callback(null, result)
                }
            })
            break;
        }
        default:
            {
                console.log("Default switch")
            }

    }
};

exports.handle_request = handle_request;



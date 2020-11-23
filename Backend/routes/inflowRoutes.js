const express = require("express");
const inflowRouter = express.Router();
const inflowServices = require("../services/inflowServices");
const inflowKafkaServices=require("../servicesKafka/inflowservices")

const { GET_INFLOW_HOSPITAL } = require('../config/routeConstants');

inflowRouter.route(GET_INFLOW_HOSPITAL).get(inflowKafkaServices.getinflowprediction);


module.exports = inflowRouter;
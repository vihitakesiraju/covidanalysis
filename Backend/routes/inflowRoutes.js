const express = require("express");
const inflowRouter = express.Router();
const inflowServices = require("../services/inflowServices");

const { GET_INFLOW_HOSPITAL } = require('../config/routeConstants');

inflowRouter.route(GET_INFLOW_HOSPITAL).get(inflowServices.getinflowprediction);
module.exports = inflowRouter;
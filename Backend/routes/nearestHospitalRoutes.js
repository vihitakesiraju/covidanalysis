const express = require("express");
const nearestRouter = express.Router();
const nearestServices = require("../services/nearestHospital");

const { GET_NEAREST_HOSPITALS } = require('../config/routeConstants');

nearestRouter.route(GET_NEAREST_HOSPITALS).get(nearestServices.getNearestHospitals);

module.exports = nearestRouter;
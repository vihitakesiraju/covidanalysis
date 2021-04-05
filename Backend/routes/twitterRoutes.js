const express = require("express");
const twitterRouter = express.Router();
const twitterServices = require("../services/twitterServices");
// const twitterKafkaServices = require("../servicesKafka/twitterservices")

const { GET_TWEETS_PAGINATED } = require('../config/routeConstants');

twitterRouter.route(GET_TWEETS_PAGINATED).get(twitterServices.getTweetsPaginated);
module.exports = twitterRouter;
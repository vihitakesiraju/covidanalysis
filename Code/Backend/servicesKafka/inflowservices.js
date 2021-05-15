const {
    CONTENT_TYPE,
    APP_JSON,
    RES_SUCCESS,
    RES_BAD_REQUEST,
    RES_NOT_FOUND,
    RES_DUPLICATE_RESOURCE,
    TEXT_PLAIN,
    RES_INTERNAL_SERVER_ERROR,
    GET_INFLOW_HOSPITAL
  } = require("../config/routeConstants");
  

  var kafka = require('../kafka/client');
  
  module.exports.getinflowprediction=(req,res)=>{
    console.log("req.body"+JSON.stringify(req.query))
    data={
      api:"GET_INFLOW_HOSPITAL",
      body: req.query
    }
    kafka.make_request('inflow', data, function(err,results){
      console.log('in result');
      console.log(results);
      if (err) {
        console.log("In error");
        res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
    } else {
        console.log("In else");
        res.status(RES_SUCCESS).send(JSON.stringify(results));
    }
      
  });
  }

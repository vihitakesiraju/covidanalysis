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

const fs = require('fs');
var geodist = require('geodist')


module.exports.getNearestHospitals = async (req, res) => {
    console.log("Inside Inflow GET Nearest Hospital service" + JSON.stringify(req.query));
    let raw = fs.readFileSync("./data/Hospitals.json");
    let jsonData = JSON.parse(raw);
    // console.log(jsonData)
    let outJson = []
    let currPoint = {
        lat: req.query.latitude,
        lon: req.query.longitude
    }
    await jsonData.map((hosp) => {
        // console.log(Math.abs(parseInt(req.query.latitude) - hosp.LATITUDE.toFixed(2)))
        let hospPoint = {
            lat: hosp.LATITUDE,
            lon: hosp.LONGITUDE
        }
        let distance = geodist(currPoint, hospPoint);
        // console.log(distance)
        // Math.abs(parseInt(req.query.latitude) - hosp.LATITUDE.toFixed(2)) < 0.5 || Math.abs(parseInt(req.query.longitude) - hosp.LONGITUDE.toFixed(2)) < 0.5
        if (distance < 15) {
            outJson.push(hosp);
            // console.log(hosp)
        }

    })


    res.status(RES_SUCCESS).end(JSON.stringify(outJson));

}
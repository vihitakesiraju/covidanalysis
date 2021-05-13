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
const fs = require('fs')



module.exports.getinflowprediction = async (req, res) => {
    console.log("Inside Inflow GET Hospital prediction service" + JSON.stringify(req.query));
    let out = {}
    fs.readFile("./data/TimeSeries.json", "utf8", (err, jsonString) => {
        if (err) {
            console.log("Error reading file from disk:", err);
            return;
        }
        try {
            const jsonArr = JSON.parse(jsonString);
            const json = jsonArr[req.query.hospitalID]
            out = {
                dates: json.date,
                deaths: json.deaths,
                cases: json.cases
            }
            console.log(out);
        } catch (err) {
            console.log("Error parsing JSON string:", err);
        }
        finally {
            res.status(RES_SUCCESS).end(JSON.stringify(out));
        }
    });
}
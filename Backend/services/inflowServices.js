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
const csv = require('csvtojson')




module.exports.getinflowprediction = async (req, res) => {
    console.log("Inside Inflow GET Hospital prediction service");
    const csvFilePath = './services/nile.csv'
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            console.log(jsonObj);

        })

    const jsonArray = await csv().fromFile(csvFilePath);
    res.status(RES_SUCCESS).end(JSON.stringify(jsonArray));

}
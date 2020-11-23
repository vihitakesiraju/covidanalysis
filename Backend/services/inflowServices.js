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
    console.log("Inside Inflow GET Hospital prediction service" + JSON.stringify(req.query));
    const csvFilePath = './services/prediction_withdate.csv'
    // csv()
    //     .fromFile(csvFilePath)
    //     .then((jsonObj) => {
    //         console.log(jsonObj);

    //     })

    const jsonArray = await csv().fromFile(csvFilePath);
    // console.log(jsonArray)
    let processArray = []
    jsonArray.map((val) => {
        // console.log(val.HOSPITAL_NAME)
        if (val.HOSPITAL_NAME === req.query.hospitalID) {
            processArray.push({
                DATE: val.date,
                PREDICTION: val.prediction
            })
        }
        // if (processArray[`${val.HOSPITAL_NAME}`] !== undefined) {
        //     processArray[val.HOSPITAL_NAME].push({
        //         DATE: val.date,
        //         PREDICTION: val.prediction
        //     })
        // }
        // else {
        //     processArray[val.HOSPITAL_NAME] = [{
        //         DATE: val.date,
        //         PREDICTION: val.prediction
        //     }]
        // }
    })
    res.status(RES_SUCCESS).end(JSON.stringify(processArray));

}
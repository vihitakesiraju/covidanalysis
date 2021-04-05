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
// const csv = require('csvtojson')

const fs = require('fs')



module.exports.getTweetsPaginated = async (req, res) => {
    console.log("Inside Tweets GET Paginated service" + JSON.stringify(req.query));
    // const csvFilePath = './data/json_file.json'

    let processArray = []
    let returnVar
    fs.readFile("./data/NewTweets.json", "utf8", (err, jsonString) => {
        if (err) {
            console.log("Error reading file from disk:", err);
            return;
        }
        try {
            const jsonArray = JSON.parse(jsonString);
            // console.log(jsonArray);


            let page = req.query.page || 1,
                per_page = req.query.limit || 10,
                offset = (page - 1) * per_page,
                paginatedItems = jsonArray.slice(offset).slice(0, per_page),
                total_pages = Math.ceil(jsonArray.length / per_page);

            returnVar = {
                page: page,
                per_page: per_page,
                pre_page: page - 1 ? page - 1 : null,
                next_page: (total_pages > page) ? page + 1 : null,
                total: jsonArray.length,
                total_pages: total_pages,
                data: paginatedItems
            };



        } catch (err) {
            console.log("Error parsing JSON string:", err);
        }
        finally {

            res.status(RES_SUCCESS).end(JSON.stringify(returnVar));

        }
    });
    console.log(processArray)

}
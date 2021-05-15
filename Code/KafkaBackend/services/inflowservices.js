const csv = require('csvtojson')
async function handle_request(msg, callback)  {

    console.log("Inside inflow Services ->kafka backend");
    console.log(msg);
    switch (msg.api) {
        case "GET_INFLOW_HOSPITAL":
            {
                const csvFilePath = './services/nile.csv'
  
            // csv()
            //     .fromFile(csvFilePath)
            //     .then((jsonObj) => {
            //         console.log(jsonObj);
            //         callback(null,jsonObj)
        
            //     })
    // const jsonArray =  await csv().fromFile(csvFilePath).then((jsonObj) => {
    //     console.log("json")
    //     console.log(jsonObj);
    //     console.log(jsonObj.length)
    //     callback(null,jsonObj)
    // })
    callback(null,"hello")
      
                break;
            }
           
        default:
            {
                console.log("Default switch")
            }

    }
};

exports.handle_request = handle_request;
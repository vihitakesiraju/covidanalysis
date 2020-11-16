var connection = new require('./kafka/Connection');
//topics files
require('dotenv').config({ path: __dirname + '/.env' })
require('./config/mongoConnection');

const restaurant = require('./services/restaurant')
const login = require('./services/login')
const customer = require('./services/customer')
const messages = require('./services/messages')
const orders = require('./services/orders')
const events = require('./services/events')
const reviews = require('./services/reviews')
const images = require('./services/images')


function handleTopicRequest(topic_name, fname) {
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    // console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name + " ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);

        fname.handle_request(data.data, function (err, res) {
            if (err) {
                // console.log('after handle' + res);
                var payloads = [
                    {
                        topic: data.replyTo,
                        messages: JSON.stringify({
                            correlationId: data.correlationId,
                            data: err
                        }),
                        partition: 0
                    }
                ];
                producer.send(payloads, function (err, data) {
                    console.log("Error call back");
                });
                return;
            }
            else {
                // console.log('after handle' + res);
                var payloads = [
                    {
                        topic: data.replyTo,
                        messages: JSON.stringify({
                            correlationId: data.correlationId,
                            data: res
                        }),
                        partition: 0
                    }
                ];
                producer.send(payloads, function (err, data) {
                    // console.log(data);
                });
                return;
            }
        });

    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
// handleTopicRequest("post_book", Books)

handleTopicRequest("restaurant", restaurant)
handleTopicRequest("customer", customer)
handleTopicRequest("login", login)
handleTopicRequest("messages", messages)
handleTopicRequest("orders", orders)
handleTopicRequest("events", events)
handleTopicRequest("reviews", reviews)
handleTopicRequest("images", images)




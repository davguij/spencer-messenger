'use strict';

// module.exports.hello = (event, context, callback) => {
//   const response = {
//     statusCode: 200,
//     body: JSON.stringify({
//       message: 'Go Serverless v1.0! Your function executed successfully!',
//       input: event,
//     }),
//   };

//   callback(null, response);

//   // Use this code if you don't use the http event with the LAMBDA-PROXY integration
//   // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
// };

module.exports.webhook = (event, context, callback) => {
  if (event.method === 'GET') {
    // facebook app verification
    if (event.query['hub.verify_token'] === process.env.WEBHOOK_TOKEN && event.query['hub.challenge']) {
      return callback(null, parseInt(event.query['hub.challenge']));
    } else {
      return callback('Invalid token');
    }
  } else if (event.method === 'POST') {
    console.log(event.body);
    callback(null);
  }
};

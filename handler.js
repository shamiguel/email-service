const AWS = require('aws-sdk');
const ses = new AWS.SES({ region: 'us-west-2' });

module.exports.sendEmail = async (event) => {
    // inside the `exports.handler.sendEmail` function, before the `return` statement
    const queryParams = event.queryStringParameters || {};
    // select from the query parameters
let { email, message, subject } = queryParams;
if (!email) {
    return {
        statusCode: 400,
        body: JSON.stringify({
        message: 'Email is required',
        }),
    };
    }
    message = message || 'This is a message generated automatically from a Lambda function.';
subject = subject || 'Hello from Lambda';
const params = {
    Destination: {
      ToAddresses: ['shamitomita@gmail.com'], // This should be your email address
    },
    Message: {
      Body: {
        Text: {
          Data: 'This is a message generated automatically from a Lambda function.',
        },
      },
      Subject: {
        Data: 'Hello from Lambda',
      },
    },
    Source: 'example@example.com', // This is the email listed in sender. Set it to your email for this practice
  };
  await ses.sendEmail(params).promise();
  // in the object that is `return`ed, replace the `body.message` property with `Email sent to ${params.Destination.ToAddresses}`
  return {
    statusCode: 200,
    body: JSON.stringify(
        {
        message: `Email sent to ${email} with subject ${subject} and message ${message}`,
        input: event,
        },
        null,
        2
    ),
    };
  };
  
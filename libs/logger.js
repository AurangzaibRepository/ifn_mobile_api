const winston = require('winston');
require('winston-cloudwatch');

const logger = winston.createLogger({
  level: 'info', // info, warn, error
  format: winston.format.json(), // structured JSON
  transports: [
    new winston.transports.CloudWatch({
      logGroupName: '/ifn-mobile-api/stripe-webhook', // your log group
      logStreamName: 'webhook-events',       // can include {instance_id} dynamically
      awsRegion: process.env.AWS_REGION || 'us-east-1',
      jsonMessage: true,
      silent: false,
      retryErrorLogger: console.error 
    })
  ]
});

module.exports = logger;

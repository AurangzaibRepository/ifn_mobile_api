const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('../controllers/stripe.controller') ;
const router = express.Router();

module.exports = (app) => {
    router.post('/payment-webhook',
        bodyParser.raw({ type: 'application/json' }),
        stripe.processPayment
    );
    router.post('/complete-payment',
        bodyParser.json(),
        stripe.completePayment);

    app.use('/api/stripe', router);
}
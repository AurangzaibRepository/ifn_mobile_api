const asyncHandler = require('express-async-handler');
const stripe = require('../libs/stripe');
const db = require('../models');
const { logInfo } = require('../services/logger.service');
const HTTP_STATUS = require('../enums/http-status.enum');
const donationContributionService = require('../services/donation_contribution.service');

exports.processPayment = asyncHandler(async (req, res) => {
    const signature = req.headers['stripe-signature'];
    let event;
    let receiptUrl;
    let paymentStatus;

    // Create stripe event after signature verification
    event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
    );
    // For local postman testing
    //event = JSON.parse(req.body.toString());
    
    const eventType = event.type;
    const eventData = event.data.object;

    // Receipt url
    if (eventType == 'charge.succeeded') {
        receiptUrl = eventData.receipt_url;
    }

    // Payment status
    if (eventType.startsWith('payment_intent')) {
        switch (eventData.status) {
            case 'succeeded': paymentStatus = 'Success'; break;
        
            case 'requires_payment_method': paymentStatus = 'Failed'; break;
        
            case 'processing':
            case 'requires_action':
            case 'requires_confirmation': paymentStatus = 'Pending'; break;
        
            case 'canceled': paymentStatus = 'Cancelled'; break;
        }
    }
    
    // Show console only on development/local
    if (process.env.NODE_ENV == 'development') {
      console.log(`----Payment status--------: ${paymentStatus}`);
      console.log('------medatadata-------', eventData.metadata);
      console.log(`------Payment intent id----------: ${eventData.id}`);
      console.log(`------Receipt url--------: ${receiptUrl}`);
    }

    // Cloudwatch logs
    logInfo({
        event: eventType,
        paymentIntentId: eventData.id,
        model: eventData.metadata?.model,
        modelId: eventData.metadata?.modelId,
        paymentStatus: paymentStatus,
        receiptUrl: receiptUrl || null,
        timestamp: new Date().toISOString()
    });   

    // Update database
    await db[`${eventData.metadata.model}`].update({
        payment_status: paymentStatus,
        receipt_url: receiptUrl
    }, {
        where: { id: eventData.metadata.modelId }
    });

    return res.status(HTTP_STATUS.OK)
        .send('Success');
});

exports.completePayment = async (req, res) => {
    const confirmedPaymentIntent = await stripe.paymentIntents.confirm(
        req.body.payment_intent_id, // your PaymentIntent ID
        {
          payment_method: "pm_card_visa" // Stripe test card
        }
      );
      
      console.log("PaymentIntent Status:", confirmedPaymentIntent.status);
      console.log("ID:", confirmedPaymentIntent.id);
}
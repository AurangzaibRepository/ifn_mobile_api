const stripe = require('../libs/stripe');
const donationContributionService = require('../services/donation_contribution.service');

exports.processPayment = async (req, res) => {
    const signature = req.headers['stripe-signature'];
    let event;
    let receiptUrl;
    let paymentStatus;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        // Save in logs
        console.log(`Stripe webhook error: ${err.message}`);
    }

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
    
      console.log(`----Payment status--------: ${eventData.status}`);
      console.log('------medatadata-------', eventData.metadata);
      console.log(`------Payment intent id----------: ${eventData.id}`);
      console.log(`------Receipt url--------: ${receiptUrl}`);
    await donationContributionService.updateRecord(eventData.Metadata.donationContributionId, {
        payment_status: paymentStatus,
        receipt_url: receiptUrl
    });
}

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
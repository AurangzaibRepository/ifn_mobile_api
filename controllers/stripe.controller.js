const stripe = require('../libs/stripe');
const donationContributionService = require('../services/donation_contribution.service');

exports.processPayment = async (req, res) => {
    const signature = req.headers['stripe-signature'];
    let event;

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
    const paymentStatus = eventType == 'payment_intent.succeeded'
        ? 'Success'
        : (eventType == 'payment_intent.payment_failed' ? 'Failed' : 'Pending');
    console.log(`Event type: ${eventType}`);
    console.log(eventData);
    

    await donationContributionService.updateRecord(eventData.Metadata.donationContributionId, {
        payment_status: paymentStatus
    });
}
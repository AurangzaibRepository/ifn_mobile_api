const stripe = require('../libs/stripe');

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

    console.log(`Event type: ${event.type}`);
    console.log(event.data.object);
}
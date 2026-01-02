const stripe = require('../libs/stripe');

exports.createIntent = async (donationContributionId, amount) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: (amount * 100), // in cents
        currency: process.env.STRIPE_CURRENCY,
        metadata: {
            donationContributionId
        },
        automatic_payment_methods: { enabled: true }
    });
    
    return paymentIntent.client_secret;
}
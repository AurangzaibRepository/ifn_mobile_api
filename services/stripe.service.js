const stripe = require('../libs/stripe');

exports.createIntent = async (donationId, amount) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: (amount * 10), // in cents
        currency: process.env.STRIPE_CURRENCY,
        metadata: {
            donationId
        }
    });
    console.log(paymentIntent.client_secret);
    return paymentIntent.client_secret;
}
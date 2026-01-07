const stripe = require('../libs/stripe');

exports.createIntent = async (model, modelId, amount) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: (amount * 100), // in cents
        currency: process.env.STRIPE_CURRENCY,
        metadata: {
            model,
            modelId
        },
        automatic_payment_methods: {
            enabled: true,  allow_redirects: 'never' // ✅ disable redirect-based methods
        }
    });
    
    return {
        payment_intent_id: paymentIntent.id,
        payment_intent: paymentIntent.client_secret
    };
}
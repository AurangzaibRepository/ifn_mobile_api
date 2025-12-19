const db = require('../models');
const stripeService = require('./stripe.service');

exports.makeDonation = async (data) => {
    const stripeClientSecret = await stripeService.createIntent(data.donation_id, data.amount);
}
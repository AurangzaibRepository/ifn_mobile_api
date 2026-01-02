const db = require('../models');
const stripeService = require('./stripe.service');
const memberService = require('./member.service');
const { USER_ROLES } = require('../enums/roles.enum');

exports.makeDonation = async (data) => {
    let user_id = data.user_id;

    // Create user if user_id not provided
    if (! data.user_id) {
        const user = await memberService.createUser({
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            role: USER_ROLES.USER
        });

        user_id = user.id;
    }

    const donationContribution = await db.DonationContribution.create({
        ...data,
        user_id
    });

    // Make stripe intent
    const stripeClientSecret = await stripeService.createIntent(donationContribution.id, data.amount);

    // Update payment intent in database
    await this.updateRecord(donationContribution.id, {
        payment_intent: stripeClientSecret
    });

    return {
        donationContributionId: donationContribution.id,
        clientSecret: stripeClientSecret
    };
}

exports.updateRecord = async (id, data) => {
    await db.DonationContribution.update(data, {
        where: {id }
    });
}
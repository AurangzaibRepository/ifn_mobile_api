const { Op } = require('sequelize');
const db = require('../models');
const { USER_ROLES } = require('../enums/roles.enum')
const { BOOKING_STATUS } = require('../enums/status.enum');
const stripeService = require('../services/stripe.service');
const memberService = require('../services/member.service');

exports.findActiveBooking = async (date) => {
    const data = await db.BanquetBooking.findOne({
        where: {
            booking_date: new Date(date),
            status: {
                [Op.not]: BOOKING_STATUS.CANCELLED
            }
        }
    });

    return data;
}

exports.createRecord = async (data) => {
    // Create guest user if user_id not provided
    if (! data.user_id) {
         // Create or fetch user by email user role
         const user = await memberService.findOrCreate({
            email: data.email,
            role: USER_ROLES.USER
        },
        {
            first_name: data.first_name,
            last_name: data.last_name
        });

        data.user_id = user.id;
    }

    // Create booking
    const booking = await db.BanquetBooking.create(data);

    // Stripe payment in

}
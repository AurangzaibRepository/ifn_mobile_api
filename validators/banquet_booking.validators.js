const { body } = require('express-validator');
const db = require('../models');
const { BOOKING_STATUS } = require('../enums/status.enum');
const { USER_ROLES } = require('../enums/roles.enum');
const memberService = require('../services/member.service');
const banquetBookingService = require('../services/banquet_booking.service');

exports.createValidator = [
   body('title', 'Title is required')
    .notEmpty(),
   body('booking_date', 'booking_date is required')
    .notEmpty().bail()
    .isISO8601({ strict: true })
    .withMessage('booking_date must be in yyyy-mm-dd format').bail()
    .custom(async (value) => {
        const booking = await banquetBookingService.findActiveBooking(value);

        if (booking) {
            throw new Error(`Booking already exists on date ${value}`);
        }

        return true;
    }),
   body('user_id').optional({ checkFalsy: true })
   .isInt().withMessage('user_id must be numeric').bail()
   .custom(async (value) => {
      const user = await memberService.findByAttribute('id', value);

      if (! user) {
        throw new Error('User not found');
      }

      return true;
   }),
   body('amount', 'amount is required')
    .notEmpty().bail()
    .isFloat({ min: 1 }).withMessage('Amount must be positive number greater than or equal to 1'),
   body('first_name')
     .if(body('user_id').not().exists())
     .notEmpty().withMessage('first_name is required'),
   body('last_name')
    .if(body('user_id').not().exists())
    .notEmpty().withMessage('last_name is required'),
   body('email')
    .if(body('user_id').not().exists())
    .notEmpty().withMessage('email is required').bail()
    .isEmail().withMessage('Invalid email').bail()
    .custom(async (value) => {
        const member = await db.User.findOne({
            where: {
                email: value,
                role: USER_ROLES.MEMBER
            }
        });

        if (member) {
            throw new Error(`User with email ${value} already registered. Please login to proceed with booking`);
        }
    })
];
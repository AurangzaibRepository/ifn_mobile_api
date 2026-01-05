const { body } = require('express-validator');
const { BOOKING_STATUS } = require('../enums/status.enum');

exports.createValidator = [
   body('title', 'Title is required')
    .notEmpty(),
   body('booking_date', 'Booking date is required')
    .notEmpty(),
   body('user_id').optional({ checkFalsy: true }),
   body('status', 'Status is required')
    .notEmpty().bail()
    .isIn(Object.values(BOOKING_STATUS))
    .withMessage('Invalid status')
];
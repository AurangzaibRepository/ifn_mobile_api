const db = require('../models');
const { param, body } = require('express-validator');
const donationService = require('../services/donation.service');
const memberService = require('../services/member.service');
const { USER_ROLES } = require('../enums/roles.enum');

exports.listingValidator = [
    param('pageNumber', 'Page number must be numeric')
        .isInt()
];

exports.detailValidator = [
    param('id', 'Id must be numeric')
        .isInt().bail()
        .custom(async (value) => {
            const donation = await donationService.findByAttribute('id', value);

            if (! donation) {
                throw new Error('Donation not found');
            }

            return true;
        })
];

exports.makeDonationValidator = [
    body('donation_id', 'Donation Id is required')
        .notEmpty().bail()
        .isInt().withMessage('Donation Id must be numeric').bail()
        .custom(async (value) => {
            const donation = await donationService.findByAttribute('id', value);

            if (! donation) {
                throw new Error('Donation not found');
            }

            return true;
        }),
    body('amount', 'Amount is required')
        .notEmpty().bail()
        .isFloat({ min: 0 }).withMessage('Amount must be positive number'),
    body('user_id').optional({ checkFalsy: true })
        .isInt().withMessage('User Id must be numeric').bail()
        .custom(async (value) => {
            const user = await memberService.findByAttribute('id', value);

            if (! user) {
                throw new Error('User not found')
            }

            return true;
        }),
    body('first_name')
        .if(body('user_id').not().exists())
        .notEmpty().withMessage('First name is required'),
    body('last_name')
        .if(body('user_id').not().exists())
        .notEmpty().withMessage('Last name is required'),
    body('email', 'Email is required')
        .if(body('user_id').not().exists())
        .notEmpty().bail()
        .isEmail().withMessage('Invalid email').bail()
        .custom(async (value) => {
            const user = await db.User.findOne({
                where: {
                    email: value,
                    role: USER_ROLES.MEMBER
                }
            });

            if (user) {
                throw new Error(`User with email ${value} already registered. Please login to donate`);
            }

            return true;
        }),
]


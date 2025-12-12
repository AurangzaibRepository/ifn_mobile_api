const { param, body } = require('express-validator');
const db = require('../models');
const eventService = require('../services/event.service');
const memberService = require('../services/member.service');

exports.listingValidator = [
    param('pageNumber', 'Page number must be numeric')
        .isInt()
];

exports.detailValidator = [
    param('id', 'Id must be numeric')
        .isInt().bail()
        .custom(async (value) => {
            const event = await eventService.findByAttribute('id', value);

            if (!event) {
                throw new Error('Event not found');
            }

            return true;
        })
]

exports.registerValidator = [
    body('event_id', 'event_id is required')
        .notEmpty().bail()
        .isInt().withMessage('event_id must be numeric').bail()
        .custom(async (value) => {
            const event = await eventService.findByAttribute('id', value);

            if (!event) {
                throw new Error('Event not found');
            }

            return true;
        }),
    body('user_id').optional({ checkFalsy: true })
        .isInt().withMessage('user_id must be numeric').bail()
        .custom(async (value, { req }) => {
            const userEvent = await db.EventRegistration.findOne({
                where: {
                    event_id: req.body.event_id,
                    user_id: value
                }
            });

            // If user already registered with event
            if (userEvent) {
                throw new Error('User is already registered for this event');
            }

            return true;
        }),
    body('first_name')
        .if(body('user_id').not().exists())
        .notEmpty().withMessage('first_name is required'),
    body('last_name')
        .if(body('user_id').not().exists())
        .notEmpty().withMessage('last_name is required'),
    body('email', 'Email is required')
        .notEmpty().bail()
        .isEmail().withMessage('Invalid email').bail()
        .custom(async (value) => {
            const user = await memberService.findByAttribute('email', value);

            if (user) {
                throw new Error(`User with email ${value} exists`);
            }

            return true;
        }),
    body('contact_number')
        .if(body('user_id').not().exists())
        .notEmpty().withMessage('contact_number is required')
]
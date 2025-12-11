const { param } = require('express-validator');
const eventService = require('../services/event.service');

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
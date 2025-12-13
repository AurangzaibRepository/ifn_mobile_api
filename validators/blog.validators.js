const { param } = require('express-validator');
const blogService = require('../services/blog.service');

exports.listingValidator = [
    param('pageNumber', 'Page number must be numeric')
        .isInt()
];

exports.detailValidator = [
    param('id', 'Id must be numeric')   
        .isInt().bail()
        .custom(async (value) => {
            const blog = await blogService.findByAttribute('id', value);

            if (! blog) {
                throw new Error('Blog not found');
            }

            return true;
        })
];
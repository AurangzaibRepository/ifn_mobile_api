const { param } = require('express-validator');

exports.detailsValidator = [
    param('id')
        .isInt('User not found')
];
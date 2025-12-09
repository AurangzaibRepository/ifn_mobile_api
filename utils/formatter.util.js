const { validationResult } = require('express-validator');

exports.formattedValidationResult = validationResult.withDefaults({
    formatter: (error) => error.msg
});
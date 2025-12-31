const { validationResult } = require('express-validator');

exports.formattedValidationResult = validationResult.withDefaults({
    formatter: (error) => error.msg
});

exports.formatDate = (value) => {
    const dateValue = new Date(value);
    const date = String(dateValue.getDate()).padStart(2, '0');
    const month = String(dateValue.getMonth() + 1).padStart(2, '0');
    const year = dateValue.getFullYear();

    return `${date}/${month}/${year}`;
}
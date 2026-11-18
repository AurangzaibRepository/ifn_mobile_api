const { validationResult } = require('express-validator');

exports.formattedValidationResult = validationResult.withDefaults({
    formatter: (error) => error.msg
});

exports.formatDate = (value) => {
    if (value === null || value === undefined || value === '') {
        return null;
    }

    const dateValue = new Date(value);

    if (Number.isNaN(dateValue.getTime())) {
        return null;
    }

    const date = String(dateValue.getDate()).padStart(2, '0');
    const month = String(dateValue.getMonth() + 1).padStart(2, '0');
    const year = dateValue.getFullYear();

    return `${date}/${month}/${year}`;
}
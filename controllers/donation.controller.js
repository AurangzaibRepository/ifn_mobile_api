const HTTP_STATUS = require('../enums/http-status.enum');
const asyncHandler = require('express-async-handler');

exports.listing = asyncHandler(async (req, res) => {
    return res.status(HTTP_STATUS.OK)
        .send('Success');

});
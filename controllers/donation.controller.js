const asyncHandler = require('express-async-handler');
const HTTP_STATUS = require('../enums/http-status.enum');
const donationService = require('../services/donation.service');

exports.listing = asyncHandler(async (req, res) => {
    const data = await donationService.getListing(req.params.pageNumber);

    return res.status(HTTP_STATUS.OK)
        .send(data);
});
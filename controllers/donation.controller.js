const asyncHandler = require('express-async-handler');
const HTTP_STATUS = require('../enums/http-status.enum');
const donationService = require('../services/donation.service');
const responseUtil = require('../utils/response.util');

exports.listing = asyncHandler(async (req, res) => {
    const data = await donationService.getListing(req.params.pageNumber);

    return res.status(HTTP_STATUS.OK)
        .json(responseUtil.getResponse(true, null, data));
});

exports.details = asyncHandler(async (req, res) => {
    const data = await donationService.getDetails(req.params.id);

    return res.status(HTTP_STATUS.OK)
        .json(responseUtil.getResponse(true, null, data));
});
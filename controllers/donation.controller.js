const asyncHandler = require('express-async-handler');
const HTTP_STATUS = require('../enums/http-status.enum');
const donationService = require('../services/donation.service');
const donationContribution = require('../services/donation_contribution.service');
const responseUtil = require('../utils/response.util');
const { formattedValidationResult } = require('../utils/formatter.util');

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

exports.donate = asyncHandler(async (req, res) => {
    // Check errors
    const errors = formattedValidationResult(req);

    if (! errors.isEmpty()) {
        return res.status(HTTP_STATUS.BAD_REQUEST)
            .json(responseUtil.getResponse(false, errors.array()));
    }

    await donationContribution.makeDonation(req.body);

    return res.status(HTTP_STATUS.OK)
        .json(responseUtil.getResponse(true, 'Donation made successfully'));
});
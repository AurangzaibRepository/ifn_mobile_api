const asyncHandler = require('express-async-handler');
const HTTP_STATUS = require('../enums/http-status.enum');
const responseUtil = require('../utils/response.util');
const { formattedValidationResult } = require('../utils/formatter.util');
const banquetBookingService = require('../services/banquet_booking.service');

exports.listing = asyncHandler(async (req, res) => {
    // Check errors
    const errors = formattedValidationResult(req);

    if (! errors.isEmpty()) {
        return res.status(HTTP_STATUS.BAD_REQUEST)
            .json(responseUtil.getResponse(false, errors.array()));
    }

    const data = await banquetBookingService.getListing(req.params.userId);

    return res.status(HTTP_STATUS.OK)
        .json(responseUtil.getResponse(true, null, data));
});

exports.create = asyncHandler(async (req, res) => {
    // Check errors
    const errors = formattedValidationResult(req);

    if (! errors.isEmpty()) {
        return res.status(HTTP_STATUS.BAD_REQUEST)
            .json(responseUtil.getResponse(false, errors.array()));
    }

    const data = await banquetBookingService.createRecord(req.body);

    return res.status(HTTP_STATUS.OK)
        .json(responseUtil.getResponse(true, 'Booking created successfully', data));
});
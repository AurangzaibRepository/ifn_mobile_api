const asyncHandler = require('express-async-handler');
const HTTP_STATUS = require('../enums/http-status.enum');
const eventService = require('../services/event.service');
const responseUtil = require('../utils/response.util');
const { formattedValidationResult } = require('../utils/formatter.util');

exports.listing = asyncHandler(async(req, res) => {
    // Check errors
    const errors = formattedValidationResult(req);

    if (!errors.isEmpty()) {
        return res.status(HTTP_STATUS.BAD_REQUEST)
            .json(responseUtil.getResponse(false, errors.array()));
    }

    const data = await eventService.getListing(req.params.pageNumber, req.query.keyword);

    return res.status(HTTP_STATUS.OK)
        .json(responseUtil.getResponse(true, null, data));
});

exports.details = asyncHandler(async(req, res) => {
    // Check errors
    const errors = formattedValidationResult(req);

    if (!errors.isEmpty()) {
        return res.status(HTTP_STATUS.BAD_REQUEST)
            .json(responseUtil.getResponse(false, errors.array()));
    }

    const data = await eventService.getDetails(req.params.id);

    return res.status(HTTP_STATUS.OK)
        .json(responseUtil.getResponse(true, null, data));
});

exports.register = asyncHandler(async (req, res) => {
    // Check errors
    const errors = formattedValidationResult(req);

    if (!errors.isEmpty()) {
        return res.status(HTTP_STATUS.BAD_REQUEST)
            .json(responseUtil.getResponse(false, errors.array()))
    }

    await eventService.register(req.body);

    return res.status(HTTP_STATUS.OK)
        .json(responseUtil.getResponse(true, 'Registration completed successfully'));
});
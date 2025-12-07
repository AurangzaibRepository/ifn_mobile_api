const asyncHandler = require('express-async-handler');
const HTTP_STATUS = require('../enums/http-status.enum');
const eventService = require('../services/event.service');
const responseUtil = require('../utils/response.util');

exports.listing = asyncHandler(async(req, res) => {
    const data = await eventService.getListing(req.params.pageNumber);

    return res.status(HTTP_STATUS.OK)
        .send(responseUtil.getResponse(true, null, data));
});

exports.details = asyncHandler(async(req, res) => {
    const data = await eventService.getDetails(req.params.id);

    return res.status(HTTP_STATUS.OK)
        .send(responseUtil.getResponse(true, null, data));
});
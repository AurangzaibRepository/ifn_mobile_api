const asyncHandler = require('express-async-handler');
const HTTP_STATUS = require('../enums/http-status.enum');
const responseUtil = require('../utils/response.util');
const { formattedValidationResult } = require('../utils/formatter.util');
const memberService = require('../services/member.service');

exports.listing = asyncHandler(async (req, res) => {
    const data = await memberService.getListing(req.params.pageNumber);

    return res.status(HTTP_STATUS.OK)
        .json(responseUtil.getResponse(true, null, data));
});

exports.details = asyncHandler(async (req, res) => {
    // Validation errors
    const errors = formattedValidationResult(req);

    if (!errors.isEmpty()) {
        return res.status(HTTP_STATUS.BAD_REQUEST)
            .json(responseUtil.getResponse(false, errors.array(), null))
    }

    const data = await memberService.getDetails(req.params.id);

    return res.status(HTTP_STATUS.OK)
        .json(responseUtil.getResponse(true, null, data));
});

exports.save = asyncHandler(async (req, res) => {
     // Check errors
     const errors = formattedValidationResult(req);

     if (!errors.isEmpty()) {
        return res.status(HTTP_STATUS.BAD_REQUEST)
            .json(responseUtil.getResponse(false, errors.array()));
     }

     const data = await memberService.createUser(req.body, req.fileName);
     return res.status(HTTP_STATUS.OK)
        .json(responseUtil.getResponse(true, 'Member saved successfully', data));
});

exports.update = asyncHandler(async (req, res) => {
    // Check validation errors
    const errors = formattedValidationResult(req);

    if (!errors.isEmpty()) {
        return res.status(HTTP_STATUS.BAD_REQUEST)
            .json(responseUtil.getResponse(false, errors.array()));
    }

    await memberService.updateUser(req.params.id, req.body, req.fileName);
    return res.status(HTTP_STATUS.OK)
        .json(responseUtil.getResponse(true, 'Member updated successfully'));
});
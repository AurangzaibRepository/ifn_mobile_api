const HTTP_STATUS = require('../enums/http-status.enum');
const responseUtil = require('../utils/response.util');
const { logError } = require('../services/logger.service');

module.exports = (err, req, res, next) => {
    // Cloudwatch logs
    logError({
        message: err.message,
        stack: err.stack,
        route: req.originalUrl,
        method: req.method,
       body: req.body,
        query: req.query,
    });

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR)    
        .send(responseUtil.getResponse(false, err.message));
}
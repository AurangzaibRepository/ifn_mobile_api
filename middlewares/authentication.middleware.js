const responseUtil = require('../utils/response.util');
const HTTP_STATUS = require('../enums/http-status.enum');

module.exports = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey) {
        return res.status(HTTP_STATUS.UNAUTHORIZED)
            .json(responseUtil.getResponse(false, 'Api key is missing'))
    }

    if (apiKey != process.env.API_KEY) {
        return res.status(HTTP_STATUS.FORBIDDEN)
            .json(responseUtil.getResponse(false, 'Invalid api key'));
    }

    next();
}
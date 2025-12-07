const HTTP_STATUS = require('../enums/http-status.enum');
const responseUtil = require('../utils/response.util');

module.exports = (err, req, res, next) => {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR)    
        .send(responseUtil.getResponse(false, err.message));
}
const HTTP_STATUS = require('../enums/http-status.enum');

module.exports = (err, req, res, next) => {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR)    
        .send(err.message);
}
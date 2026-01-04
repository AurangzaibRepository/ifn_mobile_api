const logger = require('../libs/logger');

exports.log = (data) => {
    logger.info({
        ...data,
        timestamp: new Date().toISOString()
    });   

}
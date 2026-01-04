const logger = require('../libs/logger');

exports.logInfo = (data) => {
    logger.info({
        ...data,
        timestamp: new Date().toISOString()
    });   
}

exports.logError = (data) => {
    logger.error({
        ...data,
        timestamp: new Date().toISOString(),
        event: 'app_error'   // optional: identify type of event
    });
}
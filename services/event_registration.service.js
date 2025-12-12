const db = require('../models');

exports.createRegistration = async (data) => {
    await db.EventRegisration.create(data);
}
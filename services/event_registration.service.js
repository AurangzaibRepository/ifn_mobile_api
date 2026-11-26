const db = require('../models');

exports.createRegistration = async (data) => {
    await db.EventRegistration.create(data);
}
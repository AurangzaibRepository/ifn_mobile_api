const db = require('../models');
const pageUtil = require('../utils/page.util');

exports.getListing = async (pageNumber) => {
    const {limit, offset} = pageUtil.getLimitOffset(pageNumber);

    const data = await db.Event.findAll({
        limit,
        offset
    });

    return data;
}

exports.getDetails = async (id) => {
    const data = await db.Event.findByPk(id);

    return data;
}
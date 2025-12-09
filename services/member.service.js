const db = require('../models');
const pageUtil = require('../utils/page.util');

exports.getListing = async (pageNumber) => {
    const { limit, offset } = pageUtil.getLimitOffset(pageNumber);
    const data = await db.User.scope(['default', 'members']).findAll({
        limit,
        offset
    });

    return data;
}

exports.getDetails = async (id) => {
    const data = await db.User.findByPk(id);

    return data;
}
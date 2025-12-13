const db = require('../models');
const pageUtil = require('../utils/page.util');

exports.findByAttribute = async (attribute, value) => {
    const data = await db.Blog.findOne({
        where: {
            [attribute]: value
        }
    });

    return data;
}

exports.getListing = async (pageNumber) => {
    const {limit, offset } = pageUtil.getLimitOffset(pageNumber);

    const data = await db.Blog.findAll({
        limit,
        offset
    });

    return data;
}

exports.getDetails = async (id) => {
    const data = await db.Blog.findByPk(id);

    return data;
}
const { Op, Sequelize } = require('sequelize');
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

exports.getListing = async (pageNumber, keyword) => {
    const {limit, offset } = pageUtil.getLimitOffset(pageNumber);
    let where = {};

    // Condition with full text search
    if (keyword) {
        where = {
            [Op.or]: [
                {title: {[Op.like]: `%${keyword}%`}},
                Sequelize.literal(`MATCH(text) AGAINST('${keyword}' IN BOOLEAN MODE)`)
            ]
        }
    }

    const data = await db.Blog.findAll({
        where,
        limit,
        offset
    });

    return data;
}

exports.getDetails = async (id) => {
    const data = await db.Blog.findByPk(id);

    return data;
}
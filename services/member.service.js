const db = require('../models');
const pageUtil = require('../utils/page.util');

exports.findByAttribute = async (attribute, value) => {
    const data = await db.User.findOne({
        where: {
            [attribute]: value
        }
    });

    return data;
}

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

exports.createUser = async(data, fileName) => {
    const user = await db.User.create({
        ...data,
        picture: fileName
    });

    return user;
}

exports.updateUser = async (id, data, fileName) => {
    // Update picture only i fprovided
    if (fileName) {
        data.picture = fileName;
    }

    await db.User.update(data, {
        where: {id}
    });
}
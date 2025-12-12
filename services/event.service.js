const db = require('../models');
const { USER_ROLES } = require('../enums/roles.enum');
const pageUtil = require('../utils/page.util');

exports.findByAttribute = async (attribute, value) => {
    const data = await db.Event.findOne({
        where: {
            [attribute]: value
        }
    });

    return data;
}

exports.getListing = async (pageNumber) => {
    const {limit, offset} = pageUtil.getLimitOffset(pageNumber);

    const data = await db.Event.findAll({
        limit,
        offset
    });

    return data;
}

exports.getDetails = async (id) => {
    const data = await db.Event.findByPk(id, {
        include: {
            model: db.EventRegistration
        }
    });

    return data;
}

exports.register = async (data) => {
    // If user id provided then save only userid
    if (data.user_id) {
        await db.EventRegistration.create({
            event_id: data.event_id,
            user_id: data.user_id
        });

        return;
    }

    // Else add in user table as user and register
    const { event_id, ...userData } = data;
    const user = await db.User.create({
        ...userData,
        role: USER_ROLES.USER
    });

    await db.EventRegistration.create({
        event_id: data.event_id,
        user_id: user.id
    });
}
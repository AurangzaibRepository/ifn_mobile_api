const db = require('../models');
const pageUtil = require('../utils/page.util');

exports.findByAttribute = async (attribute, value) => {
    const data = await db.Donation.findOne({
        where: {
            [attribute]: value
        }
    });

    return data;
}

exports.getListing = async (pageNumber) => {
    const {limit, offset} = pageUtil.getLimitOffset(pageNumber);

    const data = await db.Donation.findAll({
        limit,
        offset
    });

    return data;
}

exports.getDetails = async (id) => {
    const data = await db.Donation.findByPk(id, {
        include: {
            model: db.DonationContribution,
            include: {
                model: db.User,
                attributes: ['first_name', 'last_name', 'email']
            }
        }
    });

    /*
    const contributions = data.DonationContributions.map(contribution => {
        const { createdAt, ...rest } = contribution.get({ plain: true });
        return {
            ...rest,
            created_at: createdAt
        };
    });

    data.setDataValue('contributions', contributions);
    delete data.dataValues.DonationContributions;*/
    return data;
}
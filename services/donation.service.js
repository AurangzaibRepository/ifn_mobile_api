const db = require('../models');
const pageUtil = require('../utils/page.util');

exports.getListing = async (pageNumber) => {
    const {limit, offset} = pageUtil(pageNumber);

    const data = await db.Donation.findAll({
        limit,
        offset
    });

    return data;
}
const jwt = require('jsonwebtoken');
const { USER_ROLES } = require('../enums/roles.enum');
const memberService = require('./member.service');

exports.loginUser = async (email) => {
    const user = await memberService.findByAttribute('email', email);

    const payload = {
        email: user.email
    };

    const token = jwt.sign(
        payload,
        process.env.JWT_SECRET
    );

    return {
        id: user.id,
        email: user.email,
        token
    };
}

exports.register = async (data, fileName) => {
    const user = await memberService.createUser({
        ...data,
        role: USER_ROLES.MEMBER,
    }, fileName);

    return await this.loginUser(user.email);
}
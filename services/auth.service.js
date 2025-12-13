const jwt = require('jsonwebtoken');
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
const { body } = require('express-validator');
const bcrypt = require('bcrypt');
const db = require('../models');
const memberService = require('../services/member.service');

exports.loginValidator = [
    body('email', 'email is required')
        .notEmpty().bail()
        .isEmail().withMessage('Invalid email').bail()
        .custom(async (value) => {
            const user = await memberService.findByAttribute('email', value);

            if (! user) {
                throw new Error(`User with email ${value} not found`);
            }

            return true;
        }),
    body('password', 'password is required')
        .notEmpty().bail()
        .if(body('email').notEmpty())
        .custom(async (value, { req }) => {
            const email = req.body.email;

            // Check user with email
            const user = await db.User.findOne({ where: { email } });
            if (!user) {
              throw new Error('Invalid email or password');
            }
      
            // Verify password
            const isMatch = await bcrypt.compare(value, user.password);
            if (!isMatch) {
              throw new Error('Invalid email or password');
            }

            return true;
        })
];
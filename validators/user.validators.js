const { param, body } = require('express-validator');
const {USER_ROLES} = require('../enums/roles.enum');
const memberService = require('../services/member.service');

// Common validators for save/update
const saveValidators = [
    body('first_name', 'first_name is required').notEmpty(),
    body('last_name', 'last_name is required').notEmpty(),
    body('contact_number', 'contact_number is required')
        .notEmpty()
];

exports.detailsValidator = [
    param('id', 'Id must be numeric').isInt().bail()
        .custom(async (value) => {
            const user = await memberService.findByAttribute('id', value);

            if (!user) {
                throw new Error('User not found');
            }

            return true;
        })
];

exports.saveValidator = [
    body('first_name', 'first_name is required').notEmpty(),
    body('last_name', 'last_name is required').notEmpty(),
    body('email', 'email is required').notEmpty().bail()
        .isEmail().withMessage('Invalid email').bail()
        .custom(async (value) => {
            const user = await memberService.findByAttribute('email', value);

            // If email exists, throw error
            if (user) {
                throw new Error(`Member with email ${value} already exists`);
            }

            return true
        }),
        body('contact_number', 'contact_number is required')
            .notEmpty(),
        body('password', 'password is required').notEmpty(),
        body('role', 'role is required')
            .notEmpty().bail()
            .equals(USER_ROLES.MEMBER)
            .withMessage('role must be Member')
];

exports.updateValidator = [
    ...saveValidators,
    param('id', 'Id must be numeric').isInt().bail()
        .custom(async (value) => {
            const user = await memberService.findByAttribute('id', value);

            if (!user) {
                throw new Error('User not found');
            }

            return true
        })
        //applySaveValidatorsIfIdValid
]

// function to check if update route param valid then execute rest valdiations
function applySaveValidatorsIfIdValid() {
    return async (req, res, next) => {
      // Check if there are validation errors from id validators
      const errors = validationResult(req);
      const idErrors = errors.array().filter(e => e.param === 'id');
  
      if (idErrors.length === 0 && req.params.id) {
        // id is present and valid → run save validators
        await Promise.all(saveValidators.map(v => v.run(req)));
      }
  
      next();
    };
  }
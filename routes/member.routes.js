const express = require('express');
const members = require('../controllers/member.controller');
const { detailsValidator } = require('../validators/user.validators');
const router = express.Router();

module.exports = (app) => {
    router.get('/:id', detailsValidator, members.details);

    app.use('/api/members', router);
}
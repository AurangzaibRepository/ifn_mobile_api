const express = require('express');
const members = require('../controllers/member.controller');
const { detailsValidator, saveValidator } = require('../validators/user.validators');
const { upload } = require('../utils/file.util');
const router = express.Router();

module.exports = (app) => {
    router.get('/:id', detailsValidator, members.details);
    router.post('/', upload.single('file'), saveValidator, members.save);

    app.use('/api/members', router);
}
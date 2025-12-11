const express = require('express');
const members = require('../controllers/member.controller');
const { detailsValidator, saveValidator, updateValidator } = require('../validators/user.validators');
const { upload } = require('../utils/file.util');
const router = express.Router();

module.exports = (app) => {
    router.get('/:id', detailsValidator, members.details);
    router.post('/', upload('users').single('file'), saveValidator, members.save);
    router.put('/:id', upload('users').single('file'), updateValidator, members.update);

    app.use('/api/members', router);
}
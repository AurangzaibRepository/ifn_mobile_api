const express = require('express');
const auth = require('../controllers/auth.controller');
const { loginValidator, registerValidator } = require('../validators/auth.validators');
const { upload } = require('../utils/file.util');
const router = express.Router();

module.exports = (app) => {
    router.post('/login', loginValidator, auth.login);
    router.post(
        '/register',
        upload().single('file'),
        registerValidator,
        auth.register
    );

    app.use('/api/auth', router);
}
const express = require('express');
const auth = require('../controllers/auth.controller');
const { loginValidator } = require('../validators/auth.validators');
const router = express.Router();

module.exports = (app) => {
    router.post('/login', loginValidator, auth.login);

    app.use('/api/auth', router);
}
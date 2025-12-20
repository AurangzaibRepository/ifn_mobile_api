const express = require('express');
const chat = require('../controllers/chat.controller');
const router = express.Router();

module.exports = (app) => {
    router.post('/', chat.chat);

    app.use('/api/chat', router);
}
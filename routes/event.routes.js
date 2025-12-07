const express = require('express');
const events = require('../controllers/event.controller');
const router = express.Router();

module.exports = (app) => {
    router.get('/listing/:pageNumber', events.listing);
    router.get('/:id', events.details);

    app.use('/api/events', router);
}
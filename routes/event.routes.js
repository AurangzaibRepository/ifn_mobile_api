const express = require('express');
const { listingValidator, detailValidator, registerValidator } = require('../validators/event.validators')
const events = require('../controllers/event.controller');
const router = express.Router();

module.exports = (app) => {
    router.get('/listing/:pageNumber', listingValidator, events.listing);
    router.get('/:id', detailValidator, events.details);
    router.post('/register', registerValidator, events.register);

    app.use('/api/events', router);
}
const express = require('express');
const donations = require('../controllers/donation.controller');
const router = express.Router();

module.exports = (app) => {
    router.get('/listing/:pageNumber', donations.listing);
    router.get('/:id', donations.details);

    app.use('/api/donations', router);
}
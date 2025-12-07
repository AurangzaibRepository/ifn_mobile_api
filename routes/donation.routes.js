const express = require('express');
const donations = require('../controllers/donation.controller');
const router = express.Router();

module.exports = (app) => {
    router.get('/', donations.listing);

    app.use('/api/donations', router);
}
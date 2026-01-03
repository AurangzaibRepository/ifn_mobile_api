const express = require('express');
const donations = require('../controllers/donation.controller');
const {
    listingValidator,
    detailValidator,
    makeDonationValidator
} = require('../validators/donation.validators');
const router = express.Router();

module.exports = (app) => {
    router.get('/listing/:pageNumber', listingValidator, donations.listing);
    router.post('/make-donation', makeDonationValidator, donations.donate);
    router.get('/:id', detailValidator, donations.details);

    app.use('/api/donations', router);
}
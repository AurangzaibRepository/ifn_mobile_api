const express = require('express');
const banquetBookings = require('../controllers/banquet_booking.controller');
const { createValidator } = require('../validators/banquet_booking.validators');
const { detailsValidator } = require('../validators/user.validators');
const router = express.Router();

module.exports = (app) => {
    router.get('/:userId', detailsValidator('userId'), banquetBookings.listing);
    router.post('/', createValidator, banquetBookings.create);

    app.use('/api/banquet-bookings', router);
}
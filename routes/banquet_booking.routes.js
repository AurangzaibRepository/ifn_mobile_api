const express = require('express');
const banquetBookings = require('../controllers/banquet_booking.controller');
const { createValidator } = require('../validators/banquet_booking.validators');
const router = express.Router();

module.exports = (app) => {
    router.get('/', banquetBookings.listing);
    router.post('/', createValidator, banquetBookings.create);

    app.use('/api/banquet-bookings', router);
}
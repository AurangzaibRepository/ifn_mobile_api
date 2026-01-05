const express = require('express');
const banquetBookings = require('../controllers/banquet_booking.controller');
const router = express.Router();

module.exports = (app) => {
    router.post('/', banquetBookings.create);

    app.use('/api/banquet-bookings', router);
}
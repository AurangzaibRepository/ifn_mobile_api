const express = require('express');
const banquetBookings = require('../controllers/banquet_booking.controller');
const { createValidator } = require('../validators/banquet_booking.validators');
const { detailsValidator } = require('../validators/user.validators');
const router = express.Router();

module.exports = (app) => {
    /**
     * @swagger
     * /api/banquet-bookings/{userId}:
     *   get:
     *      summary: Banquet booking listing
     *      tags:
     *          - Banquet bookings
     *      description: Retrieve all bookings by user
     *      parameters:
     *          - in: path
     *            name: userId
     *            required: true
     *            schema:
     *              type: integer
     *            description: User id
     *      responses:
     *          200:
     *              description: Success
     *          400:
     *              description: Invalid user id
     *          404:
     *              description: User not found
     *          500:
     *              description: Internal server error
     */
    router.get('/:userId', detailsValidator('userId'), banquetBookings.listing);

    /**
     * @swagger
     * /api/banquet-bookings:
     *   post:
     *      summary: Create banquet booking
     *      description: Create banquet booking
     *      tags:
     *          - Banquet bookings
     *      requestBody:
     *          reuquired: true
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      required:
     *                          - title
     *                          - booking_date
     *                          - amount
     *                          - first_name
     *                          - last_name
     *                          - email
     *                      properties:
     *                          title:
     *                              type: string
     *                          booking_date:
     *                              type: string
     *                              format: date
     *                          amount:
     *                              type: number
     *                              format: double
     *                          first_name:
     *                              type: string
     *                          last_name: 
     *                              type: string
     *                          email:
     *                              type: string
     *                          userid:
     *                              type: number
     *      responses:
     *          201:
     *              description: Success
     *          400:
     *              description: Validation error
     *          500:
     *              description: Internal server error
     */
    router.post('/', createValidator, banquetBookings.create);

    app.use('/api/banquet-bookings', router);
}
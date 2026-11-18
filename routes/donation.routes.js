const express = require('express');
const donations = require('../controllers/donation.controller');
const {
    listingValidator,
    detailValidator,
    makeDonationValidator
} = require('../validators/donation.validators');
const router = express.Router();

module.exports = (app) => {
    /**
     * @swagger
     * /api/donations/listing/{pageNumber}:
     *   get:
     *      summary: Donations listing
     *      tags:
     *          - Donations
     *      description: Retrieve all donations page wise
     *      parameters:
     *          - in: path
     *            name: pageNumber
     *            required: true
     *            schema:
     *              type: integer
     *            description: Page number
     *      responses:
     *          200:
     *              description: Success
     *          400:
     *              description: Invalid page number
     *          500:
     *              description: Internal server error
     */
    router.get('/listing/:pageNumber', listingValidator, donations.listing);

    /**
     * @swagger
     * /api/donations/{id}:
     *   get:
     *      summary: Donations details
     *      tags:
     *          - Donations
     *      description: Retrieve a specific donation
     *      parameters:
     *          - in: path
     *            name: id
     *            required: true
     *            schema:
     *              type: integer
     *            description: Donation Id
     *      responses:
     *          200:
     *              description: Success
     *          400:
     *              description: Invalid Donation Id
     *          404:
     *              description: Donation not found
     *          500:
     *              description: Internal server error
     */
    router.get('/:id', detailValidator, donations.details);

    /**
     * @swagger
     * /api/donations/make-donations:
     *   post:
     *      summary: Make donation
     *      description: Make a donation
     *      tags:
     *          - Donations
     *      requestBody:
     *          reuquired: true
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      required:
     *                          - donation_id
     *                          - amount
     *                          - first_name
     *                          - last_name
     *                          - email
     *                      properties:
     *                          donation_id:
     *                              type: number
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
    router.post('/make-donation', makeDonationValidator, donations.donate);

    app.use('/api/donations', router);
}
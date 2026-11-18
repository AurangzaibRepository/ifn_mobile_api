const express = require('express');
const { listingValidator, detailValidator, registerValidator } = require('../validators/event.validators')
const events = require('../controllers/event.controller');
const router = express.Router();

module.exports = (app) => {
    /**
     * @swagger
     * /api/events/listing/{pageNumber}:
     *   get:
     *      summary: Events listing
     *      tags:
     *          - Events
     *      description: Retrieve all events page wise
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
    router.get('/listing/:pageNumber', listingValidator, events.listing);

    /**
     * @swagger
     * /api/events/{id}:
     *   get:
     *      summary: Events details
     *      tags:
     *          - Events
     *      description: Retrieve a specific event
     *      parameters:
     *          - in: path
     *            name: id
     *            required: true
     *            schema:
     *              type: integer
     *            description: Event Id
     *      responses:
     *          200:
     *              description: Success
     *          400:
     *              description: Invalid Event Id
     *          404:
     *              description: Event not found
     *          500:
     *              description: Internal server error
     */
    router.get('/:id', detailValidator, events.details);

    /**
     * @swagger
     * /api/events/register:
     *   post:
     *      summary: Register in event
     *      description: Register in event
     *      tags:
     *          - Events
     *      requestBody:
     *          reuquired: true
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      required:
     *                          - event_id
     *                          - first_name
     *                          - last_name
     *                          - email
     *                          - contact_number
     *                      properties:
     *                          event_id:
     *                              type: number
     *                          first_name:
     *                              type: string
     *                          last_name: 
     *                              type: string
     *                          email:
     *                              type: string
     *                          contact_number:
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
    router.post('/register', registerValidator, events.register);

    app.use('/api/events', router);
}
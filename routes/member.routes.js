const express = require('express');
const members = require('../controllers/member.controller');
const { detailsValidator, saveValidator, updateValidator } = require('../validators/user.validators');
const { upload } = require('../utils/file.util');
const router = express.Router();

module.exports = (app) => {
    /**
     * @swagger
     * /api/members/{id}:
     *   get:
     *      summary: User details
     *      tags:
     *          - Users
     *      description: Retrieve a user by id
     *      parameters:
     *          - in: path
     *            name: id
     *            required: true
     *            schema:
     *              type: integer
     *            description: User Id
     *      responses:
     *          200:
     *              description: Success
     *          400:
     *              description: Invalid User id
     *          404:
     *              description: User not found
     *          500:
     *              description: Internal server error
     */
    router.get('/:id', detailsValidator('id'), members.details);
    router.post('/become/:id', detailsValidator('id'), members.becomeMember);

    /**
     * @swagger
     * /api/members:
     *   post:
     *      summary: Save user
     *      description: Save user
     *      tags:
     *          - Users
     *      requestBody:
     *          reuquired: true
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      required:
     *                          - first_name
     *                          - last_name
     *                          - email
     *                          - password
     *                          - contact_number
     *                          - role
     *                      properties:
     *                          first_name:
     *                              type: string
     *                          last_name: 
     *                              type: string
     *                          email:
     *                              type: string
     *                          password:
     *                              type: string
     *                          contact_number:
     *                              type: string
     *                          role:
     *                              type: string
     *      responses: 
     *          201:
     *              description: Success
     *          400:
     *              description: Validation error
     *          500:
     *              description: Internal server error
     */
    router.post('/', upload('users').single('file'), saveValidator, members.save);
    router.put('/:id', upload('users').single('file'), updateValidator, members.update);

    app.use('/api/members', router);
}
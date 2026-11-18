const express = require('express');
const auth = require('../controllers/auth.controller');
const { loginValidator, registerValidator } = require('../validators/auth.validators');
const { upload } = require('../utils/file.util');
const router = express.Router();

module.exports = (app) => {
    /**
     * @swagger
     * /api/auth/login:
     *   post:
     *      summary: Login
     *      description: Login user
     *      tags:
     *          - Auth
     *      requestBody:
     *          reuquired: true
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      required:
     *                          - email
     *                          - password
     *                      properties:
     *                          email:
     *                              type: string
     *                          password:
     *                              type: string
     *      responses:
     *          201:
     *              description: Success
     *          400:
     *              description: Validation error
     *          500:
     *              description: Internal server error
     */
    router.post('/login', loginValidator, auth.login);

    /**
     * @swagger
     * /api/auth/register:
     *   post:
     *      summary: Register
     *      description: Register user
     *      tags:
     *          - Auth
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
     *      responses:
     *          201:
     *              description: Success
     *          400:
     *              description: Validation error
     *          500:
     *              description: Internal server error
     */
    router.post(
        '/register',
        upload().single('file'),
        registerValidator,
        auth.register
    );

    app.use('/api/auth', router);
}
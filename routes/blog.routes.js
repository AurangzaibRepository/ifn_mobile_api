const express = require('express');
const blogs = require('../controllers/blog.controller');
const { listingValidator, detailValidator } = require('../validators/blog.validators');
const router = express.Router();

module.exports = (app) => {
    /**
     * @swagger
     * /api/blogs/listing{pageNumber}:
     *   get:
     *      summary: Blog listing
     *      tags:
     *          - Blogs
     *      description: Retrieve all blogs page wise
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
    router.get('/listing/:pageNumber', listingValidator, blogs.listing);

    /**
     * @swagger
     * /api/blogs/{id}:
     *   get:
     *      summary: Blog details
     *      tags:
     *          - Blogs
     *      description: Retrieve a blog by id
     *      parameters:
     *          - in: path
     *            name: id
     *            required: true
     *            schema:
     *              type: integer
     *            description: blog Id
     *      responses:
     *          200:
     *              description: Success
     *          400:
     *              description: Invalid Blog Id
     *          404:
     *              description: Blog not found
     *          500:
     *              description: Internal server error
     */
    router.get('/:id', detailValidator, blogs.details);

    app.use('/api/blogs', router);
}
const express = require('express');
const blogs = require('../controllers/blog.controller');
const { listingValidator, detailValidator } = require('../validators/blog.validators');
const router = express.Router();

module.exports = (app) => {
    router.get('/listing/:pageNumber', listingValidator, blogs.listing);
    router.get('/:id', detailValidator, blogs.details);

    app.use('/api/blogs', router);
}
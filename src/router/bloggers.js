const express = require('express');
const routes = express.Router();

const BlogController = require('../app/controllers/blogger/BlogController');


/** blog */
routes.post('/blog/create', BlogController.create);
routes.post('/blog/:slug', BlogController.edit);
routes.get('/blog', BlogController.index);
routes.get('/blog/:slug', BlogController.getPostBySlug);

module.exports = routes;

const express = require('express');
const routes = express.Router();

const BlogController = require('../app/controllers/admin/BlogController');


/** blog */
routes.post('/blog/create', BlogController.create);
routes.get('/blog/edit', BlogController.edit);
routes.get('/blog', BlogController.index);
routes.get('/blog/:slug', BlogController.getPostBySlug);

module.exports = routes;

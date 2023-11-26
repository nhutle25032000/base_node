const express = require('express');
const routes = express.Router();
const BlogController = require('../app/controllers/user/BlogController');

routes.get('/blogs/:slug', BlogController.getPostBySlug)
routes.get('/blogs', BlogController.index)

module.exports = routes;

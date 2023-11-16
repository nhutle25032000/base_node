const express = require('express');
const routes = express.Router();

const DashboardController = require('../app/controllers/admin/DashboardController');
const BlogController = require('../app/controllers/admin/BlogController');

/** dashboard */
routes.get('dashboard', DashboardController.index);

/** blog */
routes.get('/blogs/:slug', BlogController.getPostBySlug);
routes.post('/blogs/:slug', BlogController.updatePostStatus);
routes.get('/blogs', BlogController.index);

module.exports = routes;
